"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";

interface FollowButtonProps {
  isFollowing: boolean;
  from_user_id: string;
  to_user_id: string;
}

const FollowButton = ({
  isFollowing,
  from_user_id,
  to_user_id,
}: FollowButtonProps) => {
  const [following, setFollowing] = useState(isFollowing);

  const handleFollow = async () => {
    const supabase = await createClient();

    if (following) {
      const { error } = await supabase
        .from("follows")
        .delete()
        .eq("from_user_id", from_user_id)
        .eq("to_user_id", to_user_id);
      if (error) {
        console.error("Error deleting follow:", error);
      } else {
        setFollowing(false);
      }
    } else {
      const { error } = await supabase.from("follows").insert([
        {
          from_user_id: from_user_id,
          to_user_id: to_user_id,
        },
      ]);
      if (error) {
        console.error("Error inserting follow:", error);
      } else {
        setFollowing(true);
      }
    }
  };

  return (
    <>
      {following ? (
        <Button
          variant="default"
          onClick={handleFollow}
          className="px-4 py-2 text-sm rounded-full font-bold transition-colors"
        >
          フォロー中
        </Button>
      ) : (
        <Button
          variant="outline"
          onClick={handleFollow}
          className="px-4 py-2 text-sm rounded-full font-bold transition-colors"
        >
          フォローする
        </Button>
      )}
    </>
  );
};

export default FollowButton;
