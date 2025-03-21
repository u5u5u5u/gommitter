import { NextResponse } from "next/server";
import { getCommittedRepositories } from "@/lib/github";

export async function GET() {
  const accessToken = process.env.GITHUB_ACCESS_TOKEN || "";
  if (!accessToken) {
    return NextResponse.json(
      { error: "GitHub access token not found" },
      { status: 403 }
    );
  }
  const committedRepos = await getCommittedRepositories(accessToken);

  return NextResponse.json({ repositories: committedRepos });
}
