import PostCard from "@/components/PostItem";
import { createClient } from "@/utils/supabase/server";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { PiCalendarDots } from "react-icons/pi";
import { formatDate } from "@/lib/formatData";

const ProfilePage = async () => {
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
    <div className="max-w-2xl mx-auto">
      <div className="relative">
        <Image
          src="/dummy_banner.jpeg"
          alt="Profile banner"
          width={1200}
          height={400}
          className="w-full h-36 object-cover"
        />
        <Avatar className="absolute -bottom-12 left-2 w-20 h-20">
          <AvatarImage
            src={userData.avatar_url}
            alt={userData.display_name}
            className="w-20 h-20 rounded-full border-4 border-white"
          />
          <AvatarFallback>{userData.display_name}</AvatarFallback>
        </Avatar>
      </div>

      <div className="flex justify-end mt-3 mr-3">
        <Button
          variant="ghost"
          className="px-4 py-2 text-sm border border-gray-300 rounded-full font-bold hover:bg-gray-50 transition-colors"
        >
          編集
        </Button>
      </div>

      <div className="px-4 pb-4">
        <div className="mt-1">
          <h2 className="text-2xl font-bold">{userData.display_name}</h2>
          <p className="text-gray-500"> &#64;{userData.user_name}</p>
        </div>

        <p className="mt-4 text-gray-900">
          初学者 | プログラミングを学び始めたばかり | 新しい技術に挑戦中 |
        </p>

        <div className="mt-2 space-y-2">
          <div className="flex items-center space-x-2 text-[14px] text-gray-500">
            <PiCalendarDots className="w-4 h-4" />
            <span>
              {formatDate(userData.created_at, "short")}からGを利用しています
            </span>
          </div>
        </div>

        <div className="mt-4 flex space-x-6 text-[14px]">
          <div>
            <span className="font-bold">1000</span>
            <span className="text-gray-500 ml-1">フォロー中</span>
          </div>
          <div>
            <span className="font-bold">1000</span>
            <span className="text-gray-500 ml-1">フォロワー</span>
          </div>
        </div>
      </div>

      <div>
        <nav className="flex">
          <Button
            variant="ghost"
            className="flex-1 px-4 py-4 text-center rounded-none border-b-2 border-blue-500 font-bold"
          >
            ポスト
          </Button>
          <Button
            variant="ghost"
            className="flex-1 px-4 py-4 text-center rounded-none text-gray-500 hover:bg-gray-50 transition-colors"
          >
            返信
          </Button>
          <Button
            variant="ghost"
            className="flex-1 px-4 py-4 text-center rounded-none text-gray-500 hover:bg-gray-50 transition-colors"
          >
            メディア
          </Button>
          <Button
            variant="ghost"
            className="flex-1 px-4 py-4 text-center rounded-none text-gray-500 hover:bg-gray-50 transition-colors"
          >
            いいね
          </Button>
        </nav>

        <div className="divide-y divide-gray-200"></div>
      </div>
    </div>
  );
};

export default ProfilePage;
