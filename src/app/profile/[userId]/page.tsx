import ProfilePosts from "@/components/Profile/Posts";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { dateFormat } from "@/lib/dateFormat";
import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import { PiCalendarDots } from "react-icons/pi";
import FollowButton from "@/components/Profile/FollowButton";

const ProfilePage = async ({
  params,
}: {
  params: Promise<{ userId: string }>;
}) => {
  const { userId } = await params;
  const supabase = await createClient();

  const { data: authData, error: authError } = await supabase.auth.getUser();
  if (authError) {
    console.error(authError);
    return <div>Failed to load user</div>;
  }

  const { data: userData, error: userError } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .single();
  if (userError) {
    console.error(userError);
    return <div>Failed to load user profile</div>;
  }

  const { data: followData, error: followError } = await supabase
    .from("follows")
    .select("*")
    .eq("from_user_id", authData.user?.id)
    .eq("to_user_id", userId)
    .limit(1);
  if (followError) {
    console.error(followError);
    return <div>Failed to load follow data</div>;
  }

  const { data: followingData, error: followingError } = await supabase
    .from("follows")
    .select("*")
    .eq("from_user_id", userId);
  if (followingError) {
    console.error(followingError);
    return <div>Failed to load following data</div>;
  }

  const { data: followedData, error: followedError } = await supabase
    .from("follows")
    .select("*")
    .eq("to_user_id", userId);
  if (followedError) {
    console.error(followedError);
    return <div>Failed to load followed data</div>;
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
        {authData.user?.id === userData.id ? (
          <Button
            variant="ghost"
            className="px-4 py-2 text-sm border border-gray-300 rounded-full font-bold transition-colors"
          >
            編集
          </Button>
        ) : (
          <FollowButton
            isFollowing={followData.length > 0 ? true : false}
            from_user_id={authData.user?.id}
            to_user_id={userId}
          />
        )}
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
              {dateFormat(userData.created_at, "short")}からGを利用しています
            </span>
          </div>
        </div>

        <div className="mt-4 flex space-x-6 text-[14px]">
          <div>
            <span className="font-bold">
              {followingData.length > 0 ? followingData.length : 0}
            </span>
            <span className="text-gray-500 ml-1">フォロー中</span>
          </div>
          <div>
            <span className="font-bold">
              {followedData.length > 0 ? followedData.length : 0}
            </span>
            <span className="text-gray-500 ml-1">フォロワー</span>
          </div>
        </div>
      </div>
      <div>
        <ProfilePosts />

        <div className="divide-y divide-gray-200"></div>
      </div>
    </div>
  );
};

export default ProfilePage;
