import crypto from "node:crypto";
import { NextResponse } from "next/server";
import { ensureUserProfile } from "@/lib/auth";
import { getRequiredEnv } from "@/lib/env";
import { isPaidLevelSlug } from "@/lib/payments";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const supabase = await createClient();

    if (!supabase) {
      console.error("[verify-payment] Supabase auth is not configured.");
      return NextResponse.json({ success: false, error: "Supabase auth is not configured." }, { status: 503 });
    }

    const {
      data: { user }
    } = await supabase.auth.getUser();

    if (!user) {
      console.error("[verify-payment] User not authenticated");
      return NextResponse.json({ success: false, error: "User not authenticated" }, { status: 401 });
    }

    console.log("[verify-payment] logged-in user id:", user.id);
    await ensureUserProfile(user);

    const adminClient = createAdminClient();

    if (!adminClient) {
      console.error("[verify-payment] Missing SUPABASE_SERVICE_ROLE_KEY for admin insert.");
      return NextResponse.json({ success: false, error: "Supabase admin client is not configured." }, { status: 503 });
    }

    const body = (await request.json()) as {
      level_id?: string;
      razorpay_payment_id?: string;
      razorpay_order_id?: string;
      razorpay_signature?: string;
    };

    const levelSlug = body.level_id;
    const razorpayPaymentId = body.razorpay_payment_id;
    const razorpayOrderId = body.razorpay_order_id;
    const razorpaySignature = body.razorpay_signature;

    console.log("[verify-payment] levelSlug:", levelSlug ?? null);
    console.log("[verify-payment] razorpay_payment_id:", razorpayPaymentId ?? null);
    console.log("[verify-payment] razorpay_order_id:", razorpayOrderId ?? null);
    console.log("[verify-payment] razorpay_signature:", razorpaySignature ?? null);

    if (!levelSlug || !isPaidLevelSlug(levelSlug)) {
      return NextResponse.json({ success: false, error: "Invalid level selected." }, { status: 400 });
    }

    if (!razorpayPaymentId || !razorpayOrderId || !razorpaySignature) {
      return NextResponse.json({ success: false, error: "Payment verification payload is incomplete." }, { status: 400 });
    }

    const expectedSignature = crypto
      .createHmac("sha256", getRequiredEnv("RAZORPAY_KEY_SECRET"))
      .update(`${razorpayOrderId}|${razorpayPaymentId}`)
      .digest("hex");

    if (expectedSignature !== razorpaySignature) {
      console.error("[verify-payment] Signature mismatch", {
        expectedSignature,
        receivedSignature: razorpaySignature,
        userId: user.id,
        levelSlug
      });
      return NextResponse.json({ success: false, error: "Payment signature verification failed." }, { status: 400 });
    }

    const { data: existingPayment, error: existingPaymentError } = await adminClient
      .from("purchases")
      .select("level, payment_id, status")
      .eq("payment_id", razorpayPaymentId)
      .maybeSingle();

    if (existingPaymentError) {
      console.error("[verify-payment] Failed to check existing payment", existingPaymentError);
      return NextResponse.json({ success: false, error: existingPaymentError.message }, { status: 400 });
    }

    if (existingPayment) {
      console.log("[verify-payment] Existing payment found", existingPayment);
      return NextResponse.json({ success: true, levelSlug: existingPayment.level });
    }

    const { data: existingPurchaseByLevel, error: existingPurchaseByLevelError } = await adminClient
      .from("purchases")
      .select("level, payment_id, status")
      .eq("user_id", user.id)
      .eq("level", levelSlug)
      .eq("status", "paid")
      .maybeSingle();

    if (existingPurchaseByLevelError) {
      console.error("[verify-payment] Failed to check existing purchase by level", existingPurchaseByLevelError);
      return NextResponse.json({ success: false, error: existingPurchaseByLevelError.message }, { status: 400 });
    }

    if (existingPurchaseByLevel) {
      console.log("[verify-payment] Existing paid purchase found for level", existingPurchaseByLevel);
      return NextResponse.json({ success: true, levelSlug: existingPurchaseByLevel.level });
    }

    const { data: insertResult, error: insertError } = await adminClient
      .from("purchases")
      .insert({
        user_id: user.id,
        level: levelSlug,
        payment_id: razorpayPaymentId,
        status: "paid"
      })
      .select("level, payment_id, status")
      .single();

    console.log("[verify-payment] insert result:", insertResult ?? null);
    console.log("[verify-payment] insert error:", insertError ?? null);

    if (insertError) {
      return NextResponse.json({ success: false, error: insertError.message }, { status: 400 });
    }

    console.log("[verify-payment] purchase stored successfully");
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[verify-payment] Unexpected error", error);
    return NextResponse.json({ success: false, error: error instanceof Error ? error.message : "Payment verification failed." }, { status: 500 });
  }
}