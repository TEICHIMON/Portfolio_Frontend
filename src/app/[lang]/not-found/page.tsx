import Button from "@/components/Button/Button";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-full bg-gray-100 py-28">
      <div className="max-w-md mx-auto text-center">
        <h1 className="text-6xl md:text-8xl font-bold text-gray-800 mb-8">
          404
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 mb-8">
          Oops! The page you are looking for could
          not be found.
        </p>
        <Button
          className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-lg md:text-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          text="Return Home"
          url="/"
        />
      </div>
    </div>
  );
}
