"use client";

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
import { PiSignOutBold } from "react-icons/pi";
import { useRouter } from "next/navigation";

const SignOutButton = () => {
  const supabase = createClient();
  const router = useRouter();
  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("サインアウト失敗", error);
    } else {
      router.push("/");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <PiSignOutBold className="w-6 h-6" />
      </DialogTrigger>
      <DialogContent className="pt-10">
        <DialogHeader>
          <DialogTitle>サインアウトします</DialogTitle>
          <DialogDescription>本当にサインアウトしますか？</DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button onClick={handleSignOut}>サインアウト</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SignOutButton;
