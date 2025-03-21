import SignOutButton from "@/components/auth/SignOutButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

const Header = async () => {
  const supabase = await createClient();
  const { data: authData, error: authError } = await supabase.auth.getUser();
  if (authError) {
    console.error(authError);
    return <div>Failed to load user</div>;
  }

  const { data: userData, error: userError } = await supabase
    .from("users")
    .select("*")
    .eq("id", authData.user.id)
    .single();
  if (userError) {
    console.error(userError);
    return <div>Failed to load user profile</div>;
  }

  return (
    <header className="fixed top-0 left-0 right-0 p-4 z-10">
      <div className="relative flex items-center justify-between w-full max-w-[500px] mx-auto">
        <div className="absolute w-full h-full bg-white blur-lg -z-1"></div>
        <Link href="/profile">
          <Avatar className="w-8 h-8">
            <AvatarImage
              src={userData.avatar_url}
              alt={userData.display_name}
              className="rounded-full"
            />
            <AvatarFallback>{userData.display_name}</AvatarFallback>
          </Avatar>
        </Link>
        <h1 className="text-2xl font-bold text-center">Gommitter</h1>
        <SignOutButton />
      </div>
    </header>
  );
};

export default Header;
