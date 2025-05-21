import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../features/auth/AuthService";
import RegisterForm from "../components/forms/RegisterForm";

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validateForm = ({ firstName, lastName, email, password }) => {
    if (!firstName || !lastName || !email || !password) {
      setError("All fields are required.");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return false;
    }

    setError("");
    return true;
  };

  const handleRegister = async (formData) => {
    if (!validateForm(formData)) return;

    setLoading(true);
    try {
      const success = await AuthService.register(formData);
      if (success) {
        alert("Registered successfully!");
        navigate("/login");
      } else {
        setError("Registration failed. Please try again.");
      }
    } catch (err) {
      console.error("Registration error:", err);
      setError("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`flex justify-center items-center min-h-screen bg-gray-100 px-4`}>
      <div className="w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>

        {/* Error Message */}
        {error && <div className="mb-4 text-red-600 text-center">{error}</div>}

        {/* Register Form Component */}
        <RegisterForm onRegister={handleRegister} />

        {/* Redirect to Login */}
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
}
