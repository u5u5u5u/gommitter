import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface PostButtonProps {
  message: string;
}

const PostButton = ({ message }: PostButtonProps) => {
  const router = useRouter();

  const post = async (message: string) => {
    const supabase = createClient();
    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError) {
      console.error("Failed to get user", userError);
    }
    const { error: postError } = await supabase.from("commits").insert({
      user_id: userData.user?.id,
      message: message,
    });
    if (postError) {
      console.error("Failed to post commit", postError);
    } else {
      toast("ゴミットメッセージが投稿されました", { position: "top-center" });
      router.push("/");
    }
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
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button onClick={() => post(message)}>Post</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PostButton;
