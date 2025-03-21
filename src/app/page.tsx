import PostItem from "@/components/PostItem";
import { createClient } from "@/utils/supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("commits")
    .select("*, user_id(id, display_name, avatar_url)")
    .order("created_at", { ascending: false });
  
  if (error) {
    console.error(error);
    return <div>Failed to fetch data</div>;
  }

  return (
    <div className="flex flex-col items-center h-screen space-y-2 mt-[64px]">
      {data?.map((commit) => (
        <PostItem commit={commit} key={commit.id} />
      ))}
    </div>
  );
}
