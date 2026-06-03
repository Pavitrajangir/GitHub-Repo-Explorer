import { useState } from "react";
import SearchBar from "./components/SearchBar";
import UserCard from "./components/UserCard";
import RepoList from "./components/RepoList";
import LoadingOverlay from "./components/LoadingOverlay";

function App() {
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
   const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  const loadMoreRepos = async () => {
    try {
      const nextPage = page + 1;

      const response = await fetch(
        `http://localhost:5000/api/github/${user.login}/repos?page=${nextPage}`
      );

      const data = await response.json();

      setRepos((prevRepos) => [
        ...prevRepos,
        ...data.repos,
      ]);

      setPage(nextPage);

      if (data.repos.length < 30) {
        setHasMore(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {/* Loading Overlay */}
      {loading && <LoadingOverlay />}

      <div
        className={`
          min-h-screen
          transition-all
          duration-200
          ${loading ? "blur-sm pointer-events-none" : ""}
        `}
      >
        {/* Search Section */}
        <SearchBar
          setUser={setUser}
          setRepos={setRepos}
          setLoading={setLoading}
          setError={setError}
           setPage={setPage}
  setHasMore={setHasMore}
        />
        {error && (
          <div className="max-w-3xl mx-auto mt-6">
            <div className="bg-red-500/10 border border-red-500 text-red-400 px-6 py-4 rounded-2xl">
              {error}
            </div>
          </div>
        )}

        {/* User + Repositories */}
        {user && (
          <div className="max-w-7xl mx-auto px-6 py-10">
            <div className="grid lg:grid-cols-4 gap-8">
              <div className="self-start">
                <UserCard user={user} />
              </div>

              <div className="lg:col-span-3">
                <RepoList repos={repos} hasMore={hasMore} loadMoreRepos={loadMoreRepos} />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
