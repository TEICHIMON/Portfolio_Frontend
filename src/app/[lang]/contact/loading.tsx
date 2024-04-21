import React from "react";

const Loading: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-solid rounded-full animate-spin border-t-transparent"></div>
      </div>
      <h1 className="mt-6 text-2xl font-semibold text-gray-700 sm:text-4xl">
        Loading...
      </h1>
      <p className="mt-2 text-gray-600 sm:text-xl">
        Please wait a moment.
      </p>
    </div>
  );
};

export default Loading;
