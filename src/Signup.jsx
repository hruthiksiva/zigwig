import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "./firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <form onSubmit={handleSignup} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-indigo-600">Sign Up</h2>
        <div className="mb-4">
          <label className="block mb-1">Email</label>
          <input type="email" className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Password</label>
          <input type="password" className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400" value={password} onChange={e => setPassword(e.target.value)} required minLength={6} />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Confirm Password</label>
          <input type="password" className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required minLength={6} />
        </div>
        {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
        <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition mb-2" disabled={loading}>{loading ? "Loading..." : "Sign Up"}</button>
        <div className="flex justify-between text-sm mt-4">
          <Link to="/login" className="text-indigo-600 hover:underline">Login</Link>
        </div>
      </form>
    </div>
  );
} 