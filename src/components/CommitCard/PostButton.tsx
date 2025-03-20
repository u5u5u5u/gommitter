import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";

interface PostButtonProps {
  message: string;
}

const PostButton = ({ message }: PostButtonProps) => {
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
  return <Button onClick={() => post(message)}>投稿</Button>;
};

export default PostButton;
