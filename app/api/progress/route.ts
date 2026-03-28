import { NextResponse } from "next/server";
import { ensureUserProfile } from "@/lib/auth";
import { isLevelSlug } from "@/lib/payments";
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
    return NextResponse.json({ error: "Please login to save progress." }, { status: 401 });
  }

  await ensureUserProfile(user);

  const { level, topic } = (await request.json()) as { level?: string; topic?: string };

  console.log("Progress payload:", { level, topic });

  if (!level || !isLevelSlug(level)) {
    return NextResponse.json({ error: "A valid level slug is required." }, { status: 400 });
  }

  if (!topic) {
    return NextResponse.json({ error: "Topic is required." }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("progress")
    .upsert(
      {
        user_id: user.id,
        level,
        topic,
        completed: true
      },
      { onConflict: "user_id,level,topic" }
    )
    .select("level, topic, completed");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ success: true, progress: data ?? [] });
}
