"use client";

import { useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { createClient } from "@/utils/supabase/client";

interface HeartButtonProps {
  commit_id: number;
  user_id: string;
}

const HeartButton = ({ commit_id, user_id }: HeartButtonProps) => {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(10);

  const handleLike = async () => {
    const supabase = createClient();
    if (!liked) {
      const { data, error } = await supabase
        .from("likes")
        .insert([{ commit_id, user_id }]);

      if (error) {
        console.error("Error inserting like:", error);
      } else {
        console.log("Like inserted:", data);
        setLiked(true);
        setLikesCount(likesCount + 1);
      }
    }
  };

  return (
    <button
      className="flex items-center space-x-1 text-xs"
      onClick={handleLike}
    >
      {liked ? <FaHeart color="red" /> : <FaRegHeart />}
      <span>{likesCount}</span>
    </button>
  );
};

export default HeartButton;
