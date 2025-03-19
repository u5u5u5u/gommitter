"use client";

import { use, useEffect, useState } from "react";
import type { Commit } from "@/types/commit";
import { createClient } from "@/utils/supabase/client";

const CommitList = ({
  params,
}: {
  params: Promise<{ repositoryName: string; ownerName: string }>;
}) => {
  const unwrapParams = use(params);
  const { repositoryName, ownerName } = unwrapParams;
  const [commits, setCommits] = useState<Commit[]>([]);

  useEffect(() => {
    const fetchCommits = async () => {
      try {
        const response = await fetch(
          `/api/github/commit?owner=${ownerName}&repo=${repositoryName}`
        );
        const { commits } = await response.json();
        setCommits(commits);
      } catch (error) {
        console.error("Failed to fetch commits", error);
      }
    };

    fetchCommits();
  }, [repositoryName, ownerName]);

  const post = async (message: string) => {
    const supabase = createClient();
    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError) {
      console.error("Failed to get user", userError);
    }
    await supabase.from("commits").insert({
      user_id: userData.user?.id,
      message: message,
    });
  };

  return (
    <div>
      <h1>コミットメーセージ一覧</h1>
      <ul>
        {commits.map((commit) => (
          <li key={commit.id}>
            <p>{commit.message}</p>
            <button onClick={() => post(commit.message)}>投稿</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommitList;
