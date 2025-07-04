import Navbar from "./Navbar";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";

export default function Home() {
  const [user] = useAuthState(auth);
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex flex-col items-center justify-center h-[80vh]">
        <h1 className="text-3xl font-bold mb-4">Welcome{user ? `, ${user.email}` : "!"}</h1>
        <p className="text-lg text-gray-700">This is your home page.</p>
      </div>
    </div>
  );
} 