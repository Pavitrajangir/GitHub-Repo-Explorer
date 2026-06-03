import { useState, useEffect } from "react";
import { FaGithub, FaSearch, FaTimes } from "react-icons/fa";

const SearchBar = ({ setUser, setRepos, setLoading, setError }) => {
  const [username, setUsername] = useState("");
  const [recentSearches, setRecentSearches] = useState([]);

  // Load recent searches on page load
  useEffect(() => {
    const storedSearches = localStorage.getItem("recentSearches");

    if (storedSearches) {
      setRecentSearches(JSON.parse(storedSearches));
    }
  }, []);

  // Save search to localStorage
  const saveRecentSearch = (searchedUser) => {
    if (!searchedUser.trim()) return;

    const updatedSearches = [
      searchedUser,
      ...recentSearches.filter(
        (item) => item.toLowerCase() !== searchedUser.toLowerCase(),
      ),
    ].slice(0, 5);

    setRecentSearches(updatedSearches);

    localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
  };

  // Remove recent search
  const removeSearch = (userToRemove) => {
    const updatedSearches = recentSearches.filter(
      (user) => user !== userToRemove,
    );

    setRecentSearches(updatedSearches);

    localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
  };

  // Search Handler
  const handleSearch = async () => {
    if (!username.trim()) return;

    try {
      setLoading(true);
      setError("");

      const userResponse = await fetch(
        `http://localhost:5000/api/github/${username}`,
      );

      const userData = await userResponse.json();

      if (!userResponse.ok) {
        throw new Error(userData.message || "GitHub user not found.");
      }

      const repoResponse = await fetch(
        `http://localhost:5000/api/github/${username}/repos`,
      );

      const repoData = await repoResponse.json();

      setUser(userData);
      setRepos(repoData.repos);
    } catch (error) {
      setUser(null);
      setRepos([]);

      // Rate Limit Handling
      if (error.message.toLowerCase().includes("rate")) {
        setError("GitHub API rate limit exceeded. Please try again later.");
      }

      // Network Error
      else if (error.message.includes("Failed to fetch")) {
        setError(
          "Network error. Please check your internet connection or backend server.",
        );
      }

      // 👇 User Not Found
      else {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };
  // Search on Enter
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <section className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="w-full max-w-4xl text-center">
        {/* Header */}
        <div className="flex items-center justify-center gap-5 mb-8">
          {/* GitHub Logo */}
          <div className="p-4 rounded-3xl bg-blue-500/10 border border-black flex items-center justify-center">
            <FaGithub className="text-5xl md:text-6xl text-black" />
          </div>

          {/* Title + Subtitle */}
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl md:text-7xl font-bold text-black leading-none">
              GitHub Explorer
            </h1>
          </div>
        </div>

        <p className="text-gray-400 text-lg md:text-xl mb-10">
          Explore profiles, repositories, languages and open-source projects.
        </p>

        {/* Search Bar */}
        <div className="flex flex-col md:flex-row gap-3 max-w-3xl mx-auto">
          <div className="relative flex-1">
            <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search GitHub Username..."
              className="
                w-full
                h-14
                pl-12
                pr-4
                rounded-2xl
                bg-slate-900
                border
                border-slate-700
                text-white
                placeholder:text-gray-500
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
                focus:border-blue-500
              "
            />
          </div>

          <button
            onClick={handleSearch}
            className="
              h-14
              px-8
              rounded-2xl
              bg-blue-600
              hover:bg-blue-700
              text-white
              font-semibold
              transition-all
              cursor-pointer
            "
          >
            Search
          </button>
        </div>

        {/* Recent Searches */}
        {recentSearches.length > 0 && (
          <div className="mt-8">
            <p className="text-gray-500 text-sm uppercase tracking-widest mb-4">
              Recently Searched
            </p>

            <div className="flex flex-wrap justify-center gap-3">
              {recentSearches.map((user) => (
                <div
                  key={user}
                  className="
                    flex
                    items-center
                    gap-2
                    px-4
                    py-2
                    rounded-full
                    bg-slate-800
                    border
                    border-slate-700
                    hover:border-blue-500
                    transition-all
                  "
                >
                  <button
                    onClick={() => {
                      setUsername(user);

                      // Trigger search again
                      console.log("Searching recent:", user);
                    }}
                    className="text-gray-300 hover:text-white"
                  >
                    {user}
                  </button>

                  <button
                    onClick={() => removeSearch(user)}
                    className="
                      text-gray-500
                      hover:text-red-500
                    "
                  >
                    <FaTimes size={12} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default SearchBar;
