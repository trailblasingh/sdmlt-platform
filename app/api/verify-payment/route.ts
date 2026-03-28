import crypto from "node:crypto";
import { createClient } from "@supabase/supabase-js";
import { ensureUserProfile } from "@/lib/auth";
import { getRequiredEnv } from "@/lib/env";
import { isPaidLevelSlug } from "@/lib/payments";
import { createClient as createServerClient } from "@/lib/supabase/server";
import type { Database } from "@/types/database";

export async function POST(request: Request) {
  try {
    console.log("ENV CHECK:", {
      hasUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      hasServiceKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
    });

    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error("SERVICE ROLE KEY MISSING");
    }

    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      throw new Error("SUPABASE URL MISSING");
    }

    const supabase = await createServerClient();

    if (!supabase) {
      console.error("[verify-payment] Supabase auth is not configured.");
      return Response.json({ success: false, error: "Supabase auth is not configured." }, { status: 503 });
    }

    const supabaseAdmin = createClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError) {
      console.error("USER FETCH ERROR:", userError);
    }

    if (!user) {
      console.error("NO USER FOUND");
      return Response.json({ success: false }, { status: 401 });
    }

    await ensureUserProfile(user);

    const body = (await request.json()) as {
      level?: string;
      level_id?: string;
      razorpay_payment_id?: string;
      razorpay_order_id?: string;
      razorpay_signature?: string;
    };

    const levelSlug = body.level_id ?? body.level;
    const razorpay_payment_id = body.razorpay_payment_id;
    const razorpay_order_id = body.razorpay_order_id;
    const razorpay_signature = body.razorpay_signature;

    console.log("[verify-payment] user.id:", user.id);
    console.log("[verify-payment] levelSlug:", levelSlug ?? null);
    console.log("[verify-payment] razorpay_payment_id:", razorpay_payment_id ?? null);
    console.log("[verify-payment] razorpay_order_id:", razorpay_order_id ?? null);
    console.log("[verify-payment] razorpay_signature:", razorpay_signature ?? null);

    if (!levelSlug || !isPaidLevelSlug(levelSlug)) {
      return Response.json({ success: false, error: "Invalid level selected." }, { status: 400 });
    }

    if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
      return Response.json({ success: false, error: "Payment verification payload is incomplete." }, { status: 400 });
    }

    const expectedSignature = crypto
      .createHmac("sha256", getRequiredEnv("RAZORPAY_KEY_SECRET"))
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      console.error("[verify-payment] Signature mismatch", {
        expectedSignature,
        receivedSignature: razorpay_signature,
        userId: user.id,
        levelSlug,
      });
      return Response.json({ success: false, error: "Payment signature verification failed." }, { status: 400 });
    }

    console.log("FINAL INSERT ATTEMPT:", {
      user_id: user.id,
      level: levelSlug,
      payment_id: razorpay_payment_id,
    });

    const { data, error } = await supabaseAdmin
      .from("purchases")
      .insert([
        {
          user_id: user.id,
          level: levelSlug,
          payment_id: razorpay_payment_id,
          status: "paid",
        },
      ])
      .select();

    if (error) {
      console.error("INSERT ERROR FULL:", JSON.stringify(error, null, 2));
      return Response.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    console.log("INSERT SUCCESS:", data);
    return Response.json({ success: true });
  } catch (error) {
    console.error("[verify-payment] Unexpected error", error);
    return Response.json(
      { success: false, error: error instanceof Error ? error.message : "Payment verification failed." },
      { status: 500 }
    );
  }
}
