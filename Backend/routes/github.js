const express = require("express");
const axios = require("axios");

const router = express.Router();

function getGitHubHeaders() {
  const headers = { Accept: "application/vnd.github.v3+json" };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  return headers;
}

router.get("/:username", async (req, res) => {
  const { username } = req.params;
  const cacheKey = `user:${username}`;

  // Step 1: Check cache
  const cachedData = cache.get(cacheKey);
  if (cachedData) {
    console.log(`[CACHE HIT] User: ${username}`);
    return res.json({ ...cachedData, fromCache: true });
  }

  try {
    console.log(`[API CALL] Fetching user: ${username}`);
    const response = await axios.get(
      `https://api.github.com/users/${username}`,
      { headers: getGitHubHeaders() }
    );

    const userData = {
      login: response.data.login,
      name: response.data.name,
      bio: response.data.bio,
      avatar_url: response.data.avatar_url,
      html_url: response.data.html_url,
      followers: response.data.followers,
      following: response.data.following,
      public_repos: response.data.public_repos,
      location: response.data.location,
      blog: response.data.blog,
      company: response.data.company,
      created_at: response.data.created_at,
    };

    cache.set(cacheKey, userData);

    res.json({ ...userData, fromCache: false });
  } catch (error) {
    handleGitHubError(error, res, username);
  }
});

router.get("/:username/repos", async (req, res) => {
  const { username } = req.params;
  const page = parseInt(req.query.page) || 1;
  const per_page = parseInt(req.query.per_page) || 30;

  const cacheKey = `repos:${username}:page${page}`;

  // Step 1: Check cache
  const cachedData = cache.get(cacheKey);
  if (cachedData) {
    console.log(`[CACHE HIT] Repos: ${username} page ${page}`);
    return res.json({ ...cachedData, fromCache: true });
  }

  try {
    console.log(`[API CALL] Fetching repos: ${username} page ${page}`);
    const response = await axios.get(
      `https://api.github.com/users/${username}/repos`,
      {
        headers: getGitHubHeaders(),
        params: { page, per_page, type: "public" },
      }
    );

    const repos = response.data.map((repo) => ({
      id: repo.id,
      name: repo.name,
      full_name: repo.full_name,
      description: repo.description,
      html_url: repo.html_url,
      language: repo.language,
      stargazers_count: repo.stargazers_count,
      forks_count: repo.forks_count,
      open_issues_count: repo.open_issues_count,
      default_branch: repo.default_branch,
      updated_at: repo.updated_at,
      created_at: repo.created_at,
      topics: repo.topics,
      fork: repo.fork,
    }));

    const result = { repos, page, per_page, count: repos.length };

    cache.set(cacheKey, result);

    res.json({ ...result, fromCache: false });
  } catch (error) {
    handleGitHubError(error, res, username);
  }
});

function handleGitHubError(error, res, username) {
  if (error.response) {
    const status = error.response.status;

    if (status === 404) {
      return res.status(404).json({
        error: `User "${username}" not found on GitHub.`,
        code: "NOT_FOUND",
      });
    }

    if (status === 403) {
      return res.status(429).json({
        error:
          "GitHub API rate limit exceeded. Please wait a minute and try again.",
        code: "RATE_LIMITED",
      });
    }
  }

  console.error("GitHub API error:", error.message);
  res.status(500).json({
    error: "Something went wrong. Please try again.",
    code: "SERVER_ERROR",
  });
}

module.exports = router;