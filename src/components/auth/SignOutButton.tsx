"use client";

import { createClient } from "@/utils/supabase/client";

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

  return <button onClick={handleSignOut}>サインアウト</button>;
};

export default SignOutButton;
