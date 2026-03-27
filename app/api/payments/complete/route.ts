import { NextResponse } from "next/server";
import { ensureUserProfile } from "@/lib/auth";
import { getPaidLevelSlugFromPaymentLinkId } from "@/lib/payments";
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
    return NextResponse.json({ error: "Please login to complete payment verification." }, { status: 401 });
  }

  await ensureUserProfile(user);

  const body = (await request.json()) as {
    payment_id?: string;
    link_id?: string;
  };

  if (!body.payment_id || !body.link_id) {
    return NextResponse.json({ error: "Invalid payment session" }, { status: 400 });
  }

  const { data: existingPayment } = await supabase
    .from("purchases")
    .select("level, payment_id")
    .eq("payment_id", body.payment_id)
    .maybeSingle();

  if (existingPayment) {
    return NextResponse.json({ success: true, levelSlug: existingPayment.level });
  }

  const levelSlug = getPaidLevelSlugFromPaymentLinkId(body.link_id);

  if (!levelSlug) {
    return NextResponse.json({ error: "Unable to match this payment to a level." }, { status: 400 });
  }

  const { error } = await supabase.from("purchases").upsert(
    {
      user_id: user.id,
      level: levelSlug,
      payment_id: body.payment_id,
      status: "paid"
    },
    { onConflict: "user_id,level" }
  );

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ success: true, levelSlug });
}