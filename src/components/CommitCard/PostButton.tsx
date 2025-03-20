import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

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
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Post</Button>
      </DialogTrigger>
      <DialogContent className="pt-10">
        <DialogHeader>
          <DialogTitle>ゴミットメッセージを投稿しますか？</DialogTitle>
          <DialogDescription>
            醜態を晒すことになるかもしれませんが、
            <br />
            本当に投稿しますか？
          </DialogDescription>
        </DialogHeader>
        <Button onClick={() => post(message)}>Post</Button>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PostButton;
