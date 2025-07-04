import { Link, useNavigate } from "react-router-dom";
import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Navbar() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const handleLogout = async () => {
    await auth.signOut();
    navigate("/login");
  };
  return (
    <nav className="bg-indigo-600 text-white px-4 py-3 flex flex-col md:flex-row items-center justify-between">
      <div className="flex items-center gap-4">
        <Link to="/" className="font-bold text-xl">Zigwig</Link>
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/contact" className="hover:underline">Contact Us</Link>
        <Link to="/portfolio" className="hover:underline">Portfolio</Link>
      </div>
      <div className="flex items-center gap-4 mt-2 md:mt-0">
        {user && <span className="text-sm">Welcome, {user.email}</span>}
        {user && <button onClick={handleLogout} className="bg-white text-indigo-600 px-3 py-1 rounded hover:bg-indigo-100 transition">Logout</button>}
      </div>
    </nav>
  );
} 