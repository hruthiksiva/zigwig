import { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "./firebase";
import { sendPasswordResetEmail } from "firebase/auth";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent!");
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <form onSubmit={handleReset} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-indigo-600">Forgot Password</h2>
        <div className="mb-4">
          <label className="block mb-1">Email</label>
          <input type="email" className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
        {message && <div className="text-green-600 text-sm mb-2">{message}</div>}
        <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition mb-2" disabled={loading}>{loading ? "Sending..." : "Send Reset Email"}</button>
        <div className="flex justify-between text-sm mt-4">
          <Link to="/login" className="text-indigo-600 hover:underline">Login</Link>
        </div>
      </form>
    </div>
  );
} 