import { createClient } from "./server";

export async function getUser() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  if (!data) {
    throw new Error("User not found");
  }

  const userData = {
    id: data.user?.id,
    user_name: data.user?.user_metadata.user_name,
    display_name: data.user?.user_metadata.full_name,
    avatar_url: data.user?.user_metadata.avatar_url,
  };

  return userData;
}
