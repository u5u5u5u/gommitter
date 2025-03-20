import { Card, CardContent } from "@/components/ui/card";
import { formatDate } from "@/lib/formatData";
import type { Commit } from "@/types/commit";
import PostButton from "@/components/CommitCard/PostButton";

interface CommitCardProps {
  commit: Commit;
}

const CommitCard = ({ commit }: CommitCardProps) => {
  return (
    <Card className="w-[90%] py-4 gap-0">
      <CardContent>
        <p>{commit.message}</p>
        <p className="text-sm text-gray-600">{formatDate(commit.date)}</p>
        <div className="flex justify-end">
          <PostButton message={commit.message} />
        </div>
      </CardContent>
    </Card>
  );
};

export default CommitCard;
