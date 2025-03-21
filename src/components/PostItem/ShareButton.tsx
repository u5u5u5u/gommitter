"use client";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import Link from "next/link";
import { FiShare } from "react-icons/fi";

interface ShareButtonProps {
  commit: string;
  user: string;
}

const ShareButton = ({ commit, user }: ShareButtonProps) => {
  const text = `${user}が「${commit}」というゴミットメッセージを投稿しました。`;
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <div className="flex items-center space-x-1 text-xs">
          <FiShare />
        </div>
      </DrawerTrigger>
      <DrawerContent className="h-[150px] z-[10000]">
        <div className="mx-auto w-full max-w-sm mb-4">
          <DrawerHeader className="flex items-center justify-between">
            <DrawerTitle>ゴミットを共有</DrawerTitle>
          </DrawerHeader>
          <div className="ml-4">
            <Link
              href={`https://twitter.com/intent/tweet?text=${text}`}
              target="_blank"
              className="flex items-center space-x-2 w-10 h-10 p-2 rounded-full bg-gray-100"
            >
              <svg
                viewBox="0 0 1200 1227"
                xmlns="http://www.w3.org/2000/svg"
                role="none"
                className="w-6 h-6"
              >
                <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z" />
              </svg>
            </Link>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default ShareButton;
