import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "./firebase";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import reactLogo from "./assets/react.svg";

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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-primary-100 via-white to-primary-200 dark:from-primary-900 dark:via-primary-800 dark:to-primary-700 transition-colors duration-500">
      <form onSubmit={handleLogin} className="bg-white/90 dark:bg-primary-900/90 shadow-xl rounded-2xl w-full max-w-md px-8 py-10 sm:px-10 sm:py-12 flex flex-col gap-6 border border-primary-100 dark:border-primary-800">
        <div className="flex flex-col items-center mb-2">
          <img src={reactLogo} alt="Logo" className="h-14 w-14 mb-2 animate-spin-slow" />
          <h2 className="text-3xl font-extrabold text-primary-800 dark:text-primary-100 tracking-tight mb-1 font-sans">Sign in to Zigwig</h2>
          <p className="text-sm text-primary-400 dark:text-primary-300">Welcome back! Please login to your account.</p>
        </div>
        <div className="flex flex-col gap-4">
          <div>
            <label className="block mb-1 text-primary-700 dark:text-primary-200 font-medium">Email</label>
            <input type="email" className="w-full px-4 py-2 border border-primary-200 dark:border-primary-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400 dark:focus:ring-primary-600 bg-primary-50 dark:bg-primary-800 text-primary-900 dark:text-primary-100 placeholder-primary-400 dark:placeholder-primary-500 transition" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div>
            <label className="block mb-1 text-primary-700 dark:text-primary-200 font-medium">Password</label>
            <input type="password" className="w-full px-4 py-2 border border-primary-200 dark:border-primary-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-400 dark:focus:ring-primary-600 bg-primary-50 dark:bg-primary-800 text-primary-900 dark:text-primary-100 placeholder-primary-400 dark:placeholder-primary-500 transition" value={password} onChange={e => setPassword(e.target.value)} required minLength={6} />
          </div>
        </div>
        {error && <div className="text-red-500 text-sm text-center -mt-2">{error}</div>}
        <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-lg shadow transition disabled:opacity-60 disabled:cursor-not-allowed" disabled={loading}>{loading ? "Loading..." : "Login"}</button>
        <div className="flex items-center my-2">
          <div className="flex-grow border-t border-primary-200 dark:border-primary-700"></div>
          <span className="mx-3 text-primary-400 dark:text-primary-500 text-xs">or</span>
          <div className="flex-grow border-t border-primary-200 dark:border-primary-700"></div>
        </div>
        <button type="button" onClick={handleGoogleSignIn} className="w-full flex items-center justify-center gap-2 bg-white border border-primary-200 dark:bg-primary-800 dark:border-primary-700 text-primary-700 dark:text-primary-100 font-semibold py-2.5 rounded-lg shadow hover:bg-primary-50 dark:hover:bg-primary-700 transition disabled:opacity-60 disabled:cursor-not-allowed" disabled={loading}>
          <svg className="h-5 w-5" viewBox="0 0 48 48"><g><path fill="#4285F4" d="M24 9.5c3.54 0 6.7 1.22 9.19 3.23l6.85-6.85C36.68 2.7 30.77 0 24 0 14.82 0 6.71 5.8 2.69 14.09l7.98 6.2C12.13 13.16 17.56 9.5 24 9.5z"/><path fill="#34A853" d="M46.1 24.55c0-1.64-.15-3.22-.42-4.74H24v9.01h12.42c-.54 2.9-2.18 5.36-4.65 7.03l7.19 5.59C43.98 37.13 46.1 31.36 46.1 24.55z"/><path fill="#FBBC05" d="M10.67 28.29a14.5 14.5 0 0 1 0-8.58l-7.98-6.2A23.94 23.94 0 0 0 0 24c0 3.93.94 7.65 2.69 10.91l7.98-6.2z"/><path fill="#EA4335" d="M24 48c6.48 0 11.92-2.14 15.89-5.82l-7.19-5.59c-2.01 1.35-4.59 2.16-8.7 2.16-6.44 0-11.87-3.66-13.33-8.99l-7.98 6.2C6.71 42.2 14.82 48 24 48z"/><path fill="none" d="M0 0h48v48H0z"/></g></svg>
          Sign in with Google
        </button>
        <div className="flex flex-col sm:flex-row justify-between text-sm mt-4 gap-2">
          <Link to="/signup" className="text-indigo-600 hover:underline text-center">Sign Up</Link>
          <Link to="/forgot-password" className="text-indigo-600 hover:underline text-center">Forgot Password?</Link>
        </div>
      </form>
    </div>
  );
} 