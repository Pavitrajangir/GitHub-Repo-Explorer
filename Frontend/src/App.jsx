import { useState } from "react";
import SearchBar from "./components/SearchBar";
import UserCard from "./components/UserCard";
import RepoList from "./components/RepoList";
import LoadingOverlay from "./components/LoadingOverlay";

function App() {
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);

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
        />

        {/* User + Repositories */}
        {user && (
          <div className="max-w-7xl mx-auto px-6 py-10">
            <div className="grid lg:grid-cols-4 gap-8">
              {/* User Profile */}
              <UserCard user={user} />

              {/* Repo List */}
              <div className="lg:col-span-3">
                <RepoList repos={repos} />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;