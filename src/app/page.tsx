import SocialLoginButtons from "@/components/auth/SocialLoginButton";
import { createClient } from "@/utils/supabase/server";
import PostCard from "@/components/PostCard";

export default async function Home() {
  const supabase = await createClient();
  const { data: user } = await supabase.auth.getUser();
  if (!user.user) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <SocialLoginButtons provider="github" />
      </div>
    );
  }
  const { data, error } = await supabase
    .from("commits")
    .select("*, user_id(display_name, avatar_url)");
  if (error) {
    console.error(error);
    return <div>Failed to fetch data</div>;
  }

  return (
    <div className="flex flex-col items-center h-screen space-y-2">
      {data?.map((commit) => (
        <PostCard commit={commit} key={commit.id} />
      ))}
    </div>
  );
}
