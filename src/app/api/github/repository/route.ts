import { NextResponse } from "next/server";
import { fetchRepositories } from "@/lib/github";
import { createClient } from "@/utils/supabase/server";

export async function GET() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const accessToken = process.env.GITHUB_ACCESS_TOKEN;
  if (!accessToken) {
    return NextResponse.json(
      { error: "GitHub access token not found" },
      { status: 403 }
    );
  }

  try {
    const repositories = await fetchRepositories(
      accessToken,
      data.user.user_metadata.user_name
    );
    return NextResponse.json({ repositories });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch repositories" },
      { status: 500 }
    );
  }
}
