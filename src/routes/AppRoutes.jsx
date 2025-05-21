import { Routes, Route, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth"; // Ensure correct path if moved

import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import NotFound from "../pages/NotFound";
import ExpensePage from "../features/expense/ExpensePage";
import IncomePage from "../features/income/IncomePage";
import InvestmentPage from "../features/investment/InvestmentPage";
import ReportsPage from "../features/reports/ReportsPage";

// Protect routes from unauthenticated users
const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
};

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected routes */}
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
      <Route
        path="/home"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/expenses"
        element={
          <PrivateRoute>
            <ExpensePage />
          </PrivateRoute>
        }
      />
      <Route
        path="/income"
        element={
          <PrivateRoute>
            <IncomePage />
          </PrivateRoute>
        }
      />
      <Route
        path="/investments"
        element={
          <PrivateRoute>
            <InvestmentPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/reports"
        element={
          <PrivateRoute>
            <ReportsPage />
          </PrivateRoute>
        }
      />

      {/* 404 fallback */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
