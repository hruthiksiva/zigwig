import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "./firebase";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    setError("");
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-indigo-600">Login</h2>
        <div className="mb-4">
          <label className="block mb-1">Email</label>
          <input type="email" className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Password</label>
          <input type="password" className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400" value={password} onChange={e => setPassword(e.target.value)} required minLength={6} />
        </div>
        {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
        <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition mb-2" disabled={loading}>{loading ? "Loading..." : "Login"}</button>
        <button type="button" onClick={handleGoogleSignIn} className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition mb-2" disabled={loading}>Sign in with Google</button>
        <div className="flex justify-between text-sm mt-4">
          <Link to="/signup" className="text-indigo-600 hover:underline">Sign Up</Link>
          <Link to="/forgot-password" className="text-indigo-600 hover:underline">Forgot Password?</Link>
        </div>
      </form>
    </div>
  );
} 