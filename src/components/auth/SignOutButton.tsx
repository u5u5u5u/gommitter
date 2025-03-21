"use client";

import { createClient } from "@/utils/supabase/client";
import { PiSignOutBold } from "react-icons/pi";

const SignOutButton = () => {
  const supabase = createClient();
  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("サインアウト失敗", error);
    } else {
      console.log("サインアウト成功");
    }
  };

  return (
    <button onClick={handleSignOut}>
      <PiSignOutBold className="w-10 h-10 text-gray-400" />
    </button>
  );
};

export default SignOutButton;
