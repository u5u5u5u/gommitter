import { Card, CardContent } from "@/components/ui/card";
import { formatDate } from "@/lib/formatData";
import type { Repository } from "@/types/repository";
import Link from "next/link";
import type { Commit } from "@/types/commit";
import { createClient } from "@/utils/supabase/client";

interface CommitCardProps {
  commit: Commit;
}

const CommitCard = ({ commit }: CommitCardProps) => {
  const post = async (message: string) => {
    const supabase = createClient();
    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError) {
      console.error("Failed to get user", userError);
    }
    await supabase.from("commits").insert({
      user_id: userData.user?.id,
      message: message,
    });
  };
  return (
    <Card className="w-[90%] py-4 gap-0">
      <CardContent>
        <p>{commit.message}</p>
        <p className="text-sm text-gray-600">{formatDate(commit.date)}</p>
        <button onClick={() => post(commit.message)}>投稿</button>
      </CardContent>
    </Card>
  );
};

export default CommitCard;
