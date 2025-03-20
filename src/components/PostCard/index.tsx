import type { DisplayCommit } from "@/types/commit";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { formatDate } from "@/lib/FormatData";
import UserIcon from "./UserIcon";
import CommentIcon from "./CommentIcon";
import RePostIcon from "./RePostIcon";
import HeartIcon from "./HeartIcon";
import ChartIcon from "./ChartIcon";
import SaveIcon from "./SaveIcon";
import ShareIcon from "./ShareIcon";

interface PostCardProps {
  commit: DisplayCommit;
}

const PostCard = ({ commit }: PostCardProps) => {
  return (
    <Card key={commit.id} className="w-[90%] py-4 gap-0">
      <CardHeader>
        <UserIcon user={commit.user_id} />
      </CardHeader>
      <CardContent className="ml-10 mb-4 space-y-2">
        <p>{commit.message}</p>
        <p className="text-sm text-gray-600">{formatDate(commit.created_at)}</p>
      </CardContent>
      <CardFooter className="flex justify-between ml-10">
        <CommentIcon />
        <RePostIcon />
        <HeartIcon />
        <ChartIcon />
        <SaveIcon />
        <ShareIcon />
      </CardFooter>
    </Card>
  );
};

export default PostCard;
