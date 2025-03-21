"use client";

import { use, useEffect, useState } from "react";
import type { Commit } from "@/types/commit";
import CommitCard from "@/components/CommitCard";

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
    <>
      {commits ? (
        <div className="flex flex-col items-center h-screen space-y-2 mt-[64px]">
          {commits.map((commit) => (
            <CommitCard key={commit.id} commit={commit} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-screen space-y-2">
          <p>アクセスできるコミットメッセージがありません</p>
        </div>
      )}
    </>
  );
};

export default CommitList;
