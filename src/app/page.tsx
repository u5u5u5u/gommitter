"use client";

import { useEffect, useState } from "react";
import SignOutButton from "@/components/auth/SignOutButton";

export default function Home() {
  const [commits, setCommits] = useState<{ sha: string; message: string }[]>(
    []
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCommits = async () => {
      setLoading(true);

      try {
        const response = await fetch(
          "/api/github?owner=u5u5u5u&repo=e-zuka-journey"
        );
        const { commits } = await response.json();
        setCommits(commits);
      } catch (error) {
        console.error("Failed to fetch commits", error);
      }
      setLoading(false);
    };

    fetchCommits();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <SignOutButton />
      <h1 className="text-4xl font-bold">Commits</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {commits.map((commit) => (
            <li key={commit.sha}>
              <p>{commit.sha}</p>
              <p>{commit.message}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
