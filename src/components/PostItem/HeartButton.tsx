"use client";

import { useState, useEffect } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { createClient } from "@/utils/supabase/client";

interface HeartButtonProps {
  commit_id: number;
  user_id: string;
}

const HeartButton = ({ commit_id, user_id }: HeartButtonProps) => {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  useEffect(() => {
    const fetchLikes = async () => {
      const supabase = createClient();

      const { data: userLike, error: userLikeError } = await supabase
        .from("likes")
        .select("*")
        .eq("commit_id", commit_id)
        .eq("user_id", user_id)
        .limit(1);

      if (userLikeError) {
        console.error("Error fetching user like:", userLikeError);
      } else if (userLike.length > 0) {
        setLiked(true);
      }

      const { data: likes, error: likesError } = await supabase
        .from("likes")
        .select("*")
        .eq("commit_id", commit_id);

      if (likesError) {
        console.error("Error fetching likes count:", likesError);
      } else {
        setLikesCount(likes.length);
      }
    };

    fetchLikes();
  }, [commit_id, user_id]);

  const handleLike = async () => {
    const supabase = createClient();
    if (!liked) {
      const { error } = await supabase
        .from("likes")
        .insert([{ commit_id, user_id }]);

      if (error) {
        console.error("Error inserting like:", error);
      } else {
        setLiked(true);
        setLikesCount(likesCount + 1);
      }
    } else {
      const { error } = await supabase
        .from("likes")
        .delete()
        .eq("commit_id", commit_id)
        .eq("user_id", user_id);

      if (error) {
        console.error("Error deleting like:", error);
      } else {
        setLiked(false);
        setLikesCount(likesCount - 1);
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
