import { NextResponse } from "next/server";
// The client you created from the Server-Side Auth instructions
import { createClient } from "@/utils/supabase/server";
import { getUser } from "@/utils/supabase/auth";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get("next") ?? "/";

  if (code) {
    // try {
    //   const response = await fetch(`${origin}/api/github/token`, {
    //     method: "POST",
    //     body: JSON.stringify({ code }),
    //   });
    //   const data = await response.text();
    //   console.log("data", data);
    // } catch (error) {
    //   console.error("Failed to fetch token", error);
    // }

    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      const userData = await getUser();
      if (userData) {
        const { id, user_name, display_name, avatar_url } = userData;
        const { error } = await supabase.from("users").upsert({
          id: id,
          user_name: user_name,
          display_name: display_name,
          avatar_url: avatar_url,
        });
        if (error) {
          console.error("Failed to upsert user", error);
        }
      } else {
        console.error("Failed to exchange code for session", error);
      }
      const forwardedHost = request.headers.get("x-forwarded-host"); // original origin before load balancer
      const isLocalEnv = process.env.NODE_ENV === "development";
      console.log("isLocalEnv", isLocalEnv);
      if (isLocalEnv) {
        // we can be sure that there is no load balancer in between, so no need to watch for X-Forwarded-Host
        return NextResponse.redirect(`${origin}${next}`);
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`);
      } else {
        return NextResponse.redirect(`${origin}${next}`);
      }
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/login`);
}
