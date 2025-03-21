import { formatDate } from "@/lib/formatData";
import type { DisplayCommit } from "@/types/commit";
import ChartIcon from "./ChartIcon";
import ReplyButton from "./ReplyButton";
import HeartButton from "./HeartButton";
import RePostIcon from "./RePostIcon";
import SaveIcon from "./SaveIcon";
import ShareButton from "./ShareButton";
import UserIcon from "./UserIcon";
import { createClient } from "@/utils/supabase/server";

interface PostItemProps {
  commit: DisplayCommit;
}

const PostItem = async ({ commit }: PostItemProps) => {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    console.error("Error getting user:", error);
  }

  return (
    <div className="w-[90%] py-4 gap-0 border-b border-gray-200">
      <div>
        <UserIcon user={commit.user_id} />
      </div>
      <div className="ml-10 mb-4 space-y-2">
        <p>{commit.message}</p>
        <p className="text-sm text-gray-600">{formatDate(commit.created_at)}</p>
      </div>
      <div className="flex justify-between ml-10 mr-1">
        <ReplyButton commit_id={commit.id} />
        <RePostIcon />
        <HeartButton commit_id={commit.id} user_id={data.user?.id ?? ""} />
        <ChartIcon />
        <SaveIcon />
        <ShareButton
          commit={commit.message}
          user={commit.user_id.display_name}
        />
      </div>
    </div>
  );
};

export default PostItem;
