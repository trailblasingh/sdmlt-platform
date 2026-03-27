import crypto from "node:crypto";
import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { ensureUserProfile } from "@/lib/auth";
import { getRequiredEnv } from "@/lib/env";
import { isPaidLevelSlug, paidLevelConfig } from "@/lib/payments";
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
    return NextResponse.json({ error: "Please login before starting payment." }, { status: 401 });
  }

  await ensureUserProfile(user);

  const { level } = (await request.json()) as { level?: string };

  if (!level || !isPaidLevelSlug(level)) {
    return NextResponse.json({ error: "Invalid level selected." }, { status: 400 });
  }

  const config = paidLevelConfig[level];
  const razorpay = new Razorpay({
    key_id: getRequiredEnv("RAZORPAY_KEY_ID"),
    key_secret: getRequiredEnv("RAZORPAY_KEY_SECRET")
  });

  const order = await razorpay.orders.create({
    amount: config.amount,
    currency: "INR",
    receipt: `${config.code}-${crypto.randomUUID().slice(0, 8)}`,
    notes: {
      user_id: user.id,
      level: config.code,
      slug: level
    }
  });

  return NextResponse.json({
    keyId: getRequiredEnv("RAZORPAY_KEY_ID"),
    orderId: order.id,
    amount: order.amount,
    currency: order.currency,
    description: `${config.title} unlock`,
    prefill: {
      name: (user.user_metadata.full_name as string | undefined) ?? (user.user_metadata.name as string | undefined) ?? user.email ?? "SDMLT Learner",
      email: user.email ?? ""
    }
  });
}