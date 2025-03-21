// /app/api/github/token/route.ts
import { NextResponse } from "next/server";
// import { createClient } from "@/utils/supabase/server";

export async function POST(req: Request) {
  const { code } = await req.json();

  if (!code) {
    return NextResponse.json({ error: "Missing code" }, { status: 400 });
  }

  const params = new URLSearchParams();
  params.append("client_id", process.env.GITHUB_CLIENT_ID!);
  params.append("client_secret", process.env.GITHUB_SECRET!);
  params.append("code", code);

  try {
    // const tokenRes = await fetch(
    //   "https://github.com/login/oauth/access_token",
    //   {
    //     method: "POST",
    //     body: params,
    //   }
    // );

    // const tokenData = await tokenRes.text();
    // const paramsObj = new URLSearchParams(tokenData);
    // const accessToken = paramsObj.get("access_token");

    // if (!accessToken) {
    //   return NextResponse.json(
    //     { error: "Failed to get access token" },
    //     { status: 500 }
    //   );
    // }

    // LocalStorageに保存
    // localStorage.setItem("github_access_token", accessToken);

    // const supabase = createClient();
    // const { error } = await supabase
    //   .from("user_tokens")
    //   .upsert({ access_token: accessToken });

    // if (error) {
    //   return NextResponse.json(
    //     { error: "Failed to save token" },
    //     { status: 500 }
    //   );
    // }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "GitHub OAuth request failed", details: error },
      { status: 500 }
    );
  }
}
