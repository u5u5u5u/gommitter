import { NextResponse } from "next/server";
import { getCommittedRepositories } from "@/lib/github";
import { createClient } from "@/utils/supabase/server";

export async function GET() {
  const supabase = await createClient();

  let accessToken;
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session && session.provider_token) {
    accessToken = session.provider_token;
  }

  if (!accessToken) {
    return NextResponse.json(
      { error: "GitHub access token not found" },
      { status: 403 }
    );
  }

  const committedRepos = await getCommittedRepositories(accessToken);

  return NextResponse.json({ repositories: committedRepos });
}
