"use client";

import { use, useEffect, useState } from "react";
import type { Commit } from "@/types/commit";

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

  return (
    <div>
      <h1>コミットメーセージ一覧</h1>
      <ul>
        {commits.map((commit) => (
          <li key={commit.id}>{commit.message}</li>
        ))}
      </ul>
    </div>
  );
};

export default CommitList;
