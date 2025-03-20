import type { DisplayCommit } from "@/types/commit";
import { Card, CardContent } from "./ui/card";

interface PostCardProps {
  commit: DisplayCommit;
}

const PostCard = ({ commit }: PostCardProps) => {
  return (
    <Card key={commit.id} className="w-[90%] py-2">
      <CardContent>
        <p>{commit.message}</p>
        <p>{commit.created_at}</p>
        <p>{commit.user_id.display_name}</p>
      </CardContent>
    </Card>
  );
};

export default PostCard;
