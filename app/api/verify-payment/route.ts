import crypto from "node:crypto";
import { NextResponse } from "next/server";
import { ensureUserProfile } from "@/lib/auth";
import { getRequiredEnv } from "@/lib/env";
import { isPaidLevelSlug } from "@/lib/payments";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const supabase = await createClient();

    if (!supabase) {
      console.error("[verify-payment] Supabase auth is not configured.");
      return NextResponse.json({ error: "Supabase auth is not configured." }, { status: 503 });
    }

    const {
      data: { user }
    } = await supabase.auth.getUser();

    console.log("[verify-payment] logged-in user id:", user?.id ?? null);

    if (!user) {
      return NextResponse.json({ error: "Please login before verifying payment." }, { status: 401 });
    }

    await ensureUserProfile(user);

    const body = (await request.json()) as {
      level_id?: string;
      razorpay_payment_id?: string;
      razorpay_order_id?: string;
      razorpay_signature?: string;
    };

    console.log("[verify-payment] razorpay_payment_id:", body.razorpay_payment_id ?? null);
    console.log("[verify-payment] razorpay_order_id:", body.razorpay_order_id ?? null);
    console.log("[verify-payment] razorpay_signature:", body.razorpay_signature ?? null);

    if (!body.level_id || !isPaidLevelSlug(body.level_id)) {
      return NextResponse.json({ error: "Invalid level selected." }, { status: 400 });
    }

    if (!body.razorpay_payment_id || !body.razorpay_order_id || !body.razorpay_signature) {
      return NextResponse.json({ error: "Payment verification payload is incomplete." }, { status: 400 });
    }

    const expectedSignature = crypto
      .createHmac("sha256", getRequiredEnv("RAZORPAY_KEY_SECRET"))
      .update(`${body.razorpay_order_id}|${body.razorpay_payment_id}`)
      .digest("hex");

    console.log("[verify-payment] expected_signature:", expectedSignature);

    if (expectedSignature !== body.razorpay_signature) {
      console.error("[verify-payment] Signature mismatch", {
        expectedSignature,
        receivedSignature: body.razorpay_signature,
        level: body.level_id,
        userId: user.id
      });
      return NextResponse.json({ error: "Payment signature verification failed." }, { status: 400 });
    }

    const { data: existingPaymentById, error: existingPaymentByIdError } = await supabase
      .from("purchases")
      .select("level, payment_id, status")
      .eq("payment_id", body.razorpay_payment_id)
      .maybeSingle();

    if (existingPaymentByIdError) {
      console.error("[verify-payment] Failed to check existing payment by payment_id", existingPaymentByIdError);
      return NextResponse.json({ error: existingPaymentByIdError.message }, { status: 400 });
    }

    if (existingPaymentById) {
      console.log("[verify-payment] Existing payment found by payment_id", existingPaymentById);
      return NextResponse.json({ success: true, levelSlug: existingPaymentById.level });
    }

    const { data: existingPurchaseByLevel, error: existingPurchaseByLevelError } = await supabase
      .from("purchases")
      .select("level, payment_id, status")
      .eq("user_id", user.id)
      .eq("level", body.level_id)
      .eq("status", "paid")
      .maybeSingle();

    if (existingPurchaseByLevelError) {
      console.error("[verify-payment] Failed to check existing payment by level", existingPurchaseByLevelError);
      return NextResponse.json({ error: existingPurchaseByLevelError.message }, { status: 400 });
    }

    if (existingPurchaseByLevel) {
      console.log("[verify-payment] Existing paid purchase found for level", existingPurchaseByLevel);
      return NextResponse.json({ success: true, levelSlug: existingPurchaseByLevel.level });
    }

    const { data: insertedPurchase, error: insertError } = await supabase
      .from("purchases")
      .insert({
        user_id: user.id,
        level: body.level_id,
        payment_id: body.razorpay_payment_id,
        status: "paid"
      })
      .select("level, payment_id, status")
      .single();

    if (insertError) {
      console.error("[verify-payment] Failed to insert purchase", insertError);
      return NextResponse.json({ error: insertError.message }, { status: 400 });
    }

    console.log("[verify-payment] Purchase inserted successfully", insertedPurchase);
    return NextResponse.json({ success: true, levelSlug: body.level_id });
  } catch (error) {
    console.error("[verify-payment] Unexpected error", error);
    return NextResponse.json({ error: error instanceof Error ? error.message : "Payment verification failed." }, { status: 500 });
  }
}