import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import IncomeService from "../features/income/IncomeService";
import ExpenseService from "../features/expense/ExpenseService";
import InvestmentService from "../features/investment/InvestmentService";

export default function Home() {
  const [incomeTotal, setIncomeTotal] = useState(0);
  const [expenseTotal, setExpenseTotal] = useState(0);
  const [investmentTotal, setInvestmentTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch data for income, expense, and investment totals
  const fetchData = async () => {
    setLoading(true);
    setError("");  // Reset previous errors before fetching new data
    try {
      const [income, expense, investment] = await Promise.all([
        IncomeService.getTotal(), // Assume this method returns total income
        ExpenseService.getTotal(), // Assume this method returns total expense
        InvestmentService.getTotal(), // Assume this method returns total investment
      ]);

      setIncomeTotal(income.amount || 0);
      setExpenseTotal(expense.amount || 0);
      setInvestmentTotal(investment.amount || 0);
    } catch (err) {
      setError("Failed to load financial data. Please try again.");
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-6">
      {/* Home Page Header */}
      <header className="text-center mb-10">
        <h1 className="text-3xl font-bold">Welcome to Your Finance Dashboard</h1>
        <p className="text-lg text-gray-600 mt-2">
          Track your income, expenses, investments, and reports in one place.
        </p>
      </header>

      {/* Error Message */}
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {/* Overview Section */}
      {loading ? (
        <p className="text-center">Loading data...</p>
      ) : (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          <div className="bg-green-600 text-white p-6 rounded shadow-md">
            <h2 className="text-2xl font-semibold">Total Income</h2>
            <p className="text-lg">₹{incomeTotal}</p>
          </div>
          <div className="bg-red-600 text-white p-6 rounded shadow-md">
            <h2 className="text-2xl font-semibold">Total Expenses</h2>
            <p className="text-lg">₹{expenseTotal}</p>
          </div>
          <div className="bg-purple-600 text-white p-6 rounded shadow-md">
            <h2 className="text-2xl font-semibold">Total Investments</h2>
            <p className="text-lg">₹{investmentTotal}</p>
          </div>
        </section>
      )}

      {/* Links to Detailed Pages */}
      <div className="flex justify-center space-x-6 mt-10">
        <Link to="/income" className="text-blue-500 hover:underline">
          <button className="bg-green-600 text-white px-6 py-3 rounded-md">
            Manage Income
          </button>
        </Link>
        <Link to="/expenses" className="text-blue-500 hover:underline">
          <button className="bg-red-600 text-white px-6 py-3 rounded-md">
            Manage Expenses
          </button>
        </Link>
        <Link to="/investments" className="text-blue-500 hover:underline">
          <button className="bg-purple-600 text-white px-6 py-3 rounded-md">
            Manage Investments
          </button>
        </Link>
        <Link to="/reports" className="text-blue-500 hover:underline">
          <button className="bg-gray-600 text-white px-6 py-3 rounded-md">
            View Reports
          </button>
        </Link>
        <Link to="/dashboard" className="text-blue-500 hover:underline">
          <button className="bg-gray-600 text-white px-6 py-3 rounded-md">
            Dashboard
          </button>
        </Link>
      </div>

      {/* Footer Section */}
      <footer className="text-center mt-20">
        <p className="text-sm text-gray-600">© 2025 Finance Tracker. All rights reserved.</p>
      </footer>
    </div>
  );
}
