import type { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";

export async function getCurrentUser() {
  const supabase = await createClient();
  if (!supabase) {
    return null;
  }

  const {
    data: { user }
  } = await supabase.auth.getUser();

  return user;
}

export async function ensureUserProfile(user: User) {
  const supabase = await createClient();
  if (!supabase) {
    return;
  }

  await supabase.from("users").upsert({
    id: user.id,
    email: user.email ?? "",
    name: (user.user_metadata.full_name as string | undefined) ?? (user.user_metadata.name as string | undefined) ?? null
  });
}
