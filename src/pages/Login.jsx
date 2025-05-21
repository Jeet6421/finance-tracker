import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import LoginForm from "../components/forms/LoginForm";
import AuthService from "../features/auth/AuthService";

export default function LoginPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (formData) => {
    setLoading(true);
    setError(""); // Clear previous errors

    try {
      const response = await AuthService.login(formData);
      if (response?.success) {
        // Login successful, navigate to home
        navigate("/home");
      } else {
        setError(response?.message || "Login failed. Please check your credentials.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Login failed. Please try again later.");
    } finally {
      setLoading(false); // Ensure loading is turned off even if there is an error
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        
        {/* Error Message */}
        {error && (
          <div className="mb-4 text-red-600 text-center">
            <p>{error}</p>
          </div>
        )}

        {/* Login Form */}
        <LoginForm onLogin={handleLogin} loading={loading} />

        {/* Registration Link */}
        <p className="mt-4 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}
