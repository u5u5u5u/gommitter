"use client";

import RepositoryCard from "@/components/RepositoryCard";
import type { Repository } from "@/types/repository";
import { useEffect, useState } from "react";

export default function Home() {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const accessToken = window.localStorage.getItem("oauth_provider_token") || "";
  console.log("accessToken", accessToken);

  useEffect(() => {
    const fetchRepositories = async () => {
      try {
        const response = await fetch(
          `/api/github/committed-repository?access_token=${accessToken}`
        );
        const { repositories } = await response.json();
        console.log("repositories", repositories);
        setRepositories(repositories);
      } catch (error) {
        console.error("Failed to fetch repositories", error);
      }
    };
    fetchRepositories();
  }, []);

  console.log(repositories);

  return (
    <div className="flex flex-col items-center h-screen space-y-2 mt-[64px]">
      {repositories &&
        repositories.map((repository) => (
          <RepositoryCard key={repository.id} repository={repository} />
        ))}
    </div>
  );
}
