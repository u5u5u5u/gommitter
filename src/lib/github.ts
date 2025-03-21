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

    // console.log(filteredCommits[0]);

    return filteredCommits.map((commit) => ({
      id: commit.sha,
      message: commit.commit.message,
      date: commit.commit.author?.date,
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

    // console.log(response.data[0]);

    return response.data.map((repo) => ({
      id: repo.id,
      name: repo.name,
      owner: repo.owner.login,
      created_at: repo.created_at,
      updated_at: repo.updated_at,
    }));
  } catch (error) {
    console.error("Failed to fetch repositories: ", error);
    throw new Error("Failed to fetch repositories");
  }
};

const getCommittedRepositories = async (accessToken: string) => {
  const octokit = new Octokit({ auth: accessToken });

  try {
    const { data: user } = await octokit.request("GET /user");
    const response = await octokit.rest.repos.listForUser({
      username: user.login,
    });

    const userRepos = response.data.map((repo) => ({
      id: repo.id,
      owner: repo.owner.login,
      name: repo.name,
      created_at: repo.created_at,
    }));

    const { data: events } = await octokit.request(
      `GET /users/${user.login}/events`,
      {
        per_page: 100,
      }
    );

    const committedRepositories = new Map<
      number,
      {
        id: number;
        owner: string;
        name: string;
        created_at: string;
      }
    >();

    events.forEach(
      (event: { repo: { id: number; name: string }; created_at: string }) => {
        committedRepositories.set(event.repo.id, {
          id: event.repo.id,
          owner: event.repo.name.split("/")[0],
          name: event.repo.name.split("/")[1],
          created_at: event.created_at,
        });
      }
    );

    userRepos.forEach((repo) => {
      committedRepositories.set(repo.id, {
        ...repo,
        created_at: repo.created_at ?? "",
      });
    });

    return Array.from(committedRepositories.values());
  } catch (error) {
    console.error("Error fetching repositories:", error);
    return [];
  }
};

export { fetchCommits, fetchRepositories, getCommittedRepositories };
