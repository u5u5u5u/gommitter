import Link from "next/link";
import { FaRegComment } from "react-icons/fa";
// import { createClient } from "@/utils/supabase/server";

interface ReplyButtonProps {
  commit_id: number;
}

const ReplyButton = async ({ commit_id }: ReplyButtonProps) => {
  // const supabase = await createClient();
  // const { data, error } = await supabase
  //   .from("comments")
  //   .select("*")
  //   .eq("parent_commit_id", commit_id);

  // if (error) {
  //   console.error("Error fetching comments:", error);
  // }

  return (
    <Link
      href={`/reply/${commit_id}`}
      className="flex items-center space-x-1 text-xs"
    >
      <FaRegComment />
      {/* <span>{data?.length}</span> */}
      <span>{Math.floor(Math.random() * 10)}</span>
    </Link>
  );
};

export default ReplyButton;
