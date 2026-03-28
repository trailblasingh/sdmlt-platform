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

  const body = (await request.json()) as {
    level_id?: string;
  };

  if (!body.level_id || !isPaidLevelSlug(body.level_id)) {
    return NextResponse.json({ error: "Invalid level selected." }, { status: 400 });
  }

  const config = paidLevelConfig[body.level_id];
  const razorpay = new Razorpay({
    key_id: getRequiredEnv("RAZORPAY_KEY_ID"),
    key_secret: getRequiredEnv("RAZORPAY_KEY_SECRET")
  });

  const order = await razorpay.orders.create({
    amount: config.amount,
    currency: config.currency,
    receipt: `${body.level_id}-${crypto.randomUUID().slice(0, 8)}`,
    notes: {
      user_id: user.id,
      level: body.level_id
    }
  });

  return NextResponse.json({
    key_id: getRequiredEnv("RAZORPAY_KEY_ID"),
    order_id: order.id,
    amount: order.amount,
    currency: order.currency,
    title: config.title
  });
}