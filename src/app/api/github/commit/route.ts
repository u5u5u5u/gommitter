import { NextResponse } from "next/server";
import { fetchCommits } from "@/lib/github";
import { createClient } from "@/utils/supabase/server";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const repoOwner = url.searchParams.get("owner");
  const repoName = url.searchParams.get("repo");
  const supabase = await createClient();
  let accessToken;

  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!repoOwner || !repoName) {
    return NextResponse.json(
      { error: "Missing owner or repo" },
      { status: 400 }
    );
  }

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

  try {
    const commits = await fetchCommits(
      accessToken,
      repoOwner,
      repoName,
      data.user.user_metadata.user_name
    );
    return NextResponse.json({ commits });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch commits" },
      { status: 500 }
    );
  }
}
