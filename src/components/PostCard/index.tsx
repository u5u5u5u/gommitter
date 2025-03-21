import { formatDate } from "@/lib/formatData";
import type { DisplayCommit } from "@/types/commit";
import ChartIcon from "./ChartIcon";
import CommentIcon from "./CommentIcon";
import HeartIcon from "./HeartIcon";
import RePostIcon from "./RePostIcon";
import SaveIcon from "./SaveIcon";
import ShareIcon from "./ShareIcon";
import UserIcon from "./UserIcon";

interface PostCardProps {
  commit: DisplayCommit;
}

const PostCard = ({ commit }: PostCardProps) => {
  return (
    <div className="w-[90%] py-4 gap-0 border-b border-gray-200">
      <div>
        <UserIcon user={commit.user_id} />
      </div>
      <div className="ml-10 mb-4 space-y-2">
        <p>{commit.message}</p>
        <p className="text-sm text-gray-600">{formatDate(commit.created_at)}</p>
      </div>
      <div className="flex justify-between ml-10">
        <CommentIcon />
        <RePostIcon />
        <HeartIcon />
        <ChartIcon />
        <SaveIcon />
        <ShareIcon />
      </div>
    </div>
  );
};

export default PostCard;
