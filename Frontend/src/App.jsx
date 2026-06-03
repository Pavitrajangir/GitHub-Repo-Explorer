import { useState } from "react";
import SearchBar from "./components/SearchBar";
import UserCard from "./components/UserCard";
import RepoList from "./components/RepoList";

function App() {
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);

  return (
    <div className="min-h-screen">
      {/* Search Section */}
      <SearchBar
        setUser={setUser}
        setRepos={setRepos}
      />

      {/* Show only after search */}
      {user && (
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="grid lg:grid-cols-4 gap-8">
            
            {/* Left Side */}
            <UserCard user={user} />

            {/* Right Side */}
            <div className="lg:col-span-3">
              <RepoList repos={repos} />
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

export default App;