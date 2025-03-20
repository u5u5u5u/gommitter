import type { DisplayCommit } from "@/types/commit";
import { Card, CardContent } from "./ui/card";
import { formatDate } from "@/lib/FormatData";
import UserIcon from "@/components/UserIcon";

interface PostCardProps {
  commit: DisplayCommit;
}

const PostCard = ({ commit }: PostCardProps) => {
  return (
    <Card key={commit.id} className="w-[90%] py-4">
      <CardContent className="space-x-2">
        <UserIcon user={commit.user_id} />
        <div className="ml-10 space-y-2">
          <p>{commit.message}</p>
          <p className="text-sm text-gray-600">{formatDate(commit.created_at)}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PostCard;
