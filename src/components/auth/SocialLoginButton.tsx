"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Provider } from "@supabase/auth-js";
// import { getUser } from "@/utils/supabase/server";
import { Button } from "@/components/ui/button";
import { FaGithub } from "react-icons/fa";

interface SocialLoginButtonProps {
  provider: string;
}

const SocialLoginButtons = ({ provider }: SocialLoginButtonProps) => {
  const supabase = createClient();
  const providerTyped = provider as Provider;
  const [redirectUrl, setRedirectUrl] = useState("");
  useEffect(() => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/callback`;
    setRedirectUrl(url);
  }, []);

  const handleSocialLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: providerTyped,
      options: {
        // サーバー側でのリダイレクトURLを指定
        // redirectTo: `${window.location.origin}/auth/callback`,
        // ローカル環境でのリダイレクトURLを指定
        redirectTo: redirectUrl,
      },
    });
    if (error) {
      console.error("ログイン失敗", error);
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-sm">
      <Button variant="outline" onClick={handleSocialLogin}>
        <FaGithub />
        {provider}でログイン
      </Button>
    </div>
  );
};

export default SocialLoginButtons;
