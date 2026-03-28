import crypto from "node:crypto";
import { NextResponse } from "next/server";
import { ensureUserProfile } from "@/lib/auth";
import { getRequiredEnv } from "@/lib/env";
import { isPaidLevelSlug } from "@/lib/payments";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const supabase = await createClient();

  if (!supabase) {
    return NextResponse.json({ error: "Supabase auth is not configured." }, { status: 503 });
  }

  const {
    data: { user }
  } = await supabase.auth.getUser();

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

  if (expectedSignature !== body.razorpay_signature) {
    return NextResponse.json({ error: "Payment signature verification failed." }, { status: 400 });
  }

  const { data: existingPayment } = await supabase
    .from("purchases")
    .select("level, payment_id")
    .eq("payment_id", body.razorpay_payment_id)
    .maybeSingle();

  if (existingPayment) {
    return NextResponse.json({ success: true, levelSlug: existingPayment.level });
  }

  const { error } = await supabase.from("purchases").upsert(
    {
      user_id: user.id,
      level: body.level_id,
      payment_id: body.razorpay_payment_id,
      status: "paid"
    },
    { onConflict: "user_id,level" }
  );

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ success: true, levelSlug: body.level_id });
}