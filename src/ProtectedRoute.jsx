import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";

export default function ProtectedRoute({ children }) {
  const [user, loading] = useAuthState(auth);
  if (loading) return <div className="flex justify-center items-center h-screen"><span className="loader" /></div>;
  return user ? children : <Navigate to="/login" replace />;
} 