import { useState } from "react";
import { FaStar } from "react-icons/fa";

const RepoList = ({ repos = [ ] }) => {
  const [sortBy, setSortBy] =
    useState("stars");

    if (!Array.isArray(repos)) {
  return (
    <div className="text-red-500">
      Invalid repository data
    </div>
  );
}

  const sortedRepos = [...repos].sort(
    (a, b) => {
      switch (sortBy) {
        case "stars":
          return (
            b.stargazers_count -
            a.stargazers_count
          );

        case "name":
          return a.name.localeCompare(
            b.name
          );

        case "updated":
          return (
            new Date(b.updated_at) -
            new Date(a.updated_at)
          );

        default:
          return 0;
      }
    }
  );

  return (
    <>
      <div className="flex justify-between mb-5">
        <h2 className="text-2xl font-bold text-white">
          Repositories
        </h2>

        <select
          value={sortBy}
          onChange={(e) =>
            setSortBy(e.target.value)
          }
          className="bg-slate-900 text-white border border-slate-700 rounded-xl px-4 py-2"
        >
          <option value="stars">
            Stars
          </option>

          <option value="name">
            Name
          </option>

          <option value="updated">
            Updated
          </option>
        </select>
      </div>

      <div className="space-y-4">
        {sortedRepos.map((repo) => (
          <div
            key={repo.id}
            className="bg-slate-900 p-5 rounded-2xl border border-slate-700"
          >
            <h3 className="text-blue-400 font-semibold text-xl">
              {repo.name}
            </h3>

            <p className="text-gray-400 mt-2">
              {repo.description}
            </p>

            <div className="flex gap-5 mt-4 text-sm">
              <span className="text-green-400">
                {repo.language}
              </span>

              <span className="flex items-center gap-1 text-yellow-400">
                <FaStar />
                {repo.stargazers_count}
              </span>

              <span className="text-gray-500">
                Updated{" "}
                {new Date(
                  repo.updated_at
                ).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default RepoList;