import { Octokit } from "@octokit/rest";

const fetchCommits = async (
  accessToken: string,
  repoOwner: string,
  repoName: string,
  username: string
) => {
  const octokit = new Octokit({ auth: accessToken });

  try {
    const response = await octokit.rest.repos.listCommits({
      owner: repoOwner,
      repo: repoName,
    });

    const filteredCommits = response.data.filter(
      (commit) => commit.author?.login === username
    );

    return filteredCommits.map((commit) => ({
      sha: commit.sha,
      message: commit.commit.message,
    }));
  } catch (error) {
    console.error("Failed to fetch commits: ", error);
    throw new Error("Failed to fetch commits");
  }
};

const fetchRepositories = async (accessToken: string, username: string) => {
  const octokit = new Octokit({ auth: accessToken });

  try {
    const response = await octokit.rest.repos.listForUser({
      username,
    });
    console.log(response.data[0]);

    return response.data.map((repo) => ({
      id: repo.id,
      name: repo.name,
      owner: repo.owner.login,
    }));
  } catch (error) {
    console.error("Failed to fetch repositories: ", error);
    throw new Error("Failed to fetch repositories");
  }
};

export { fetchCommits, fetchRepositories };
