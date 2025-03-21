import PostCard from "@/components/PostItem";
import { createClient } from "@/utils/supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("commits")
    .select("*, user_id(display_name, avatar_url)");
  if (error) {
    console.error(error);
    return <div>Failed to fetch data</div>;
  }

  return (
    <div className="flex flex-col items-center h-screen space-y-2 mt-[64px]">
      {data?.map((commit) => (
        <PostCard commit={commit} key={commit.id} />
      ))}
    </div>
  );
}
