"use client";

import SignOutButton from "@/components/auth/SignOutButton";
import type { Repository } from "@/types/repository";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [repositories, setRepositories] = useState<Repository[]>([]);

  useEffect(() => {
    const fetchRepositories = async () => {
      try {
        const response = await fetch("/api/github/committed-repository");
        const { repositories } = await response.json();
        setRepositories(repositories);
      } catch (error) {
        console.error("Failed to fetch repositories", error);
      }
    };
    fetchRepositories();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <SignOutButton />
      <h1 className="text-4xl font-bold">Repositories</h1>
      <ul>
        {repositories &&
          repositories.map((repository) => (
            <Link
              key={repository.id}
              href={`/repositories/${repository.name}/${repository.owner}`}
            >
              <li>
                <p>{repository.name}</p>
              </li>
            </Link>
          ))}
      </ul>
    </div>
  );
}
