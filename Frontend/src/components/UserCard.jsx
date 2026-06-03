import React from "react";

const UserCard = ({ user }) => {
  return (
    <div className="bg-slate-900 p-6 rounded-3xl border border-slate-700">
      <img
        src={user.avatar_url}
        alt={user.login}
        className="w-40 h-40 rounded-full mx-auto"
      />

      <h2 className="text-2xl font-bold text-white text-center mt-5">
        {user.name || user.login}
      </h2>

      <p className="text-gray-400 text-center mt-2">
        {user.bio}
      </p>

      <div className="grid grid-cols-3 mt-6 text-center">
        <div>
          <p className="text-blue-500 font-bold">
            {user.followers}
          </p>
          <p className="text-gray-400 text-sm">
            Followers
          </p>
        </div>

        <div>
          <p className="text-blue-500 font-bold">
            {user.following}
          </p>
          <p className="text-gray-400 text-sm">
            Following
          </p>
        </div>

        <div>
          <p className="text-blue-500 font-bold">
            {user.public_repos}
          </p>
          <p className="text-gray-400 text-sm">
            Repos
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserCard;