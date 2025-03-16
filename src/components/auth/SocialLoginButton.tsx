"use client";

import { createClient } from "@/utils/supabase/client";
import { Provider } from "@supabase/auth-js";

interface SocialLoginButtonProps {
  provider: string;
}

const SocialLoginButtons = ({ provider }: SocialLoginButtonProps) => {
  const supabase = createClient();
  const providerTyped = provider as Provider;

  const handleSocialLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: providerTyped,
      options: {
        // サーバー側でのリダイレクトURLを指定
        // redirectTo: `${window.location.origin}/auth/callback`,
        // ローカル環境でのリダイレクトURLを指定
        redirectTo: "http://localhost:3000/auth/callback",
      },
    });
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-sm">
      <button onClick={handleSocialLogin}>{provider}でログイン</button>
    </div>
  );
};

export default SocialLoginButtons;
