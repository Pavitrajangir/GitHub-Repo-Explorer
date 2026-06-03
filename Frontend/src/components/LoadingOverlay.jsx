import { FaGithub } from "react-icons/fa";

const LoadingOverlay = () => {
  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        flex-col
        items-center
        justify-center
        bg-black/30
        backdrop-blur-md
      "
    >
      {/* Animated Logo */}
      <FaGithub
        className="
          text-7xl
          text-white
          animate-bounce
        "
      />

      <div
        className="
          mt-6
          h-12
          w-12
          rounded-full
          border-4
          border-blue-500
          border-t-transparent
          animate-spin
        "
      />

      <p className="mt-5 text-lg text-white font-medium">
        Fetching GitHub data...
      </p>
    </div>
  );
};

export default LoadingOverlay;