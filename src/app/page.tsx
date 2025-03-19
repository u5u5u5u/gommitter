import SignOutButton from "@/components/auth/SignOutButton";
import { createClient } from "@/utils/supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("commits")
    .select("*, user_id(user_name)");
  console.log(data);
  if (error) {
    console.error(error);
    return <div>Failed to fetch data</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <SignOutButton />
      <h1 className="text-2xl font-bold">Home</h1>
      <ul className="mt-4">
        {data?.map((commit) => (
          <li key={commit.id} className="p-2 border-b">
            <p>{commit.message}</p>
            <p>{commit.created_at}</p>
            <p>{commit.user_id.user_name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
