import { NextResponse } from "next/server";
import { getCommittedRepositories } from "@/lib/github";
// import { createClient } from "@/utils/supabase/server";

export async function GET(req: Request) {
  // const supabase = await createClient();
  const url = new URL(req.url);
  const accessToken = url.searchParams.get("access_token");
  if (!accessToken) {
    return NextResponse.json({ error: "Access token is required" }, { status: 400 });
  }
  const committedRepos = await getCommittedRepositories(accessToken);

  return NextResponse.json({ repositories: committedRepos });
}
