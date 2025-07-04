import Navbar from "./Navbar";

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex flex-col items-center justify-center h-[80vh]">
        <h1 className="text-3xl font-bold mb-4">Portfolio</h1>
        <p className="text-lg text-gray-700">This is a dummy portfolio page.</p>
      </div>
    </div>
  );
} 