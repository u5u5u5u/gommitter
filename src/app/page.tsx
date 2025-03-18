"use client";

import { useEffect, useState } from "react";
import SignOutButton from "@/components/auth/SignOutButton";
import type { Commit } from "@/types/commit";
import type { Repository } from "@/types/repository";

export default function Home() {
  const [commits, setCommits] = useState<Commit[]>([]);
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRepositories = async () => {
      setLoading(true);

      try {
        const response = await fetch("/api/github/repository");
        const { repositories } = await response.json();
        setRepositories(repositories);
      } catch (error) {
        console.error("Failed to fetch repositories", error);
      }
      setLoading(false);
    };
    const fetchCommits = async () => {
      setLoading(true);

      try {
        const response = await fetch(
          "/api/github/commit?owner=u5u5u5u&repo=e-zuka-journey"
        );
        const { commits } = await response.json();
        setCommits(commits);
      } catch (error) {
        console.error("Failed to fetch commits", error);
      }
      setLoading(false);
    };

    fetchCommits();
    fetchRepositories();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <SignOutButton />
      <h1 className="text-4xl font-bold">Repositories</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {repositories &&
            repositories.map((repo) => (
              <li key={repo.id}>
                <p>{repo.name}</p>
              </li>
            ))}
        </ul>
      )}
      <h1 className="text-4xl font-bold">Commits</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {commits &&
            commits.map((commit) => (
              <li key={commit.id}>
                <p>{commit.id}</p>
                <p>{commit.message}</p>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}
