import { useEffect, useState } from "react";
import IncomeService from "../features/income/IncomeService";
import ExpenseService from "../features/expense/ExpenseService";
import InvestmentService from "../features/investment/InvestmentService";
import ReportsService from "../features/reports/ReportsService";

export default function Dashboard() {
  const [incomeTotal, setIncomeTotal] = useState(0);
  const [expenseTotal, setExpenseTotal] = useState(0);
  const [investmentTotal, setInvestmentTotal] = useState(0);
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch all dashboard data
  const fetchDashboardData = async () => {
    setLoading(true);
    setError(""); // Reset error before trying to fetch
    try {
      const [income, expense, investment, reports] = await Promise.all([
        IncomeService.getTotal(),
        ExpenseService.getTotal(),
        InvestmentService.getTotal(),
        ReportsService.getMonthlySummary(),
      ]);

      setIncomeTotal(income.amount || 0);
      setExpenseTotal(expense.amount || 0);
      setInvestmentTotal(investment.amount || 0);
      setReportData(reports);
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
      setError("Failed to load dashboard data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div className="p-6 space-y-8">
      {/* Dashboard Header */}
      <header className="text-center mb-10">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-lg text-gray-600 mt-2">
          Overview of your financials
        </p>
      </header>

      {/* Error Message */}
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {/* Dashboard Overview Cards */}
      {loading ? (
        <p className="text-center">Loading dashboard data...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-green-600 text-white p-6 rounded shadow-md">
            <h2 className="text-2xl font-semibold">Total Income</h2>
            <p className="text-lg">₹{incomeTotal.toLocaleString()}</p>
          </div>
          <div className="bg-red-600 text-white p-6 rounded shadow-md">
            <h2 className="text-2xl font-semibold">Total Expenses</h2>
            <p className="text-lg">₹{expenseTotal.toLocaleString()}</p>
          </div>
          <div className="bg-purple-600 text-white p-6 rounded shadow-md">
            <h2 className="text-2xl font-semibold">Total Investments</h2>
            <p className="text-lg">₹{investmentTotal.toLocaleString()}</p>
          </div>
        </div>
      )}

      {/* Reports Section */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Quick Summary Reports</h2>
        {reportData ? (
          <>
            <h3 className="text-lg font-medium">Monthly Summary</h3>
            {Array.isArray(reportData.monthly) &&
            reportData.monthly.length > 0 ? (
              <ul>
                {reportData.monthly.map((item, index) => (
                  <li key={index} className="flex justify-between p-2 border-b">
                    <span className="font-semibold">{item.month}</span>
                    <span>Income: ₹{item.income.toLocaleString()}</span>
                    <span>Expenses: ₹{item.expenses.toLocaleString()}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">
                No data available for monthly summary.
              </p>
            )}
          </>
        ) : (
          <p className="text-gray-500">Loading reports...</p>
        )}
      </div>

      {/* Links to Detailed Pages */}
      <div className="flex justify-center space-x-6 mt-10">
        <button className="text-blue-500 hover:underline">Go to Income</button>
        <button className="text-blue-500 hover:underline">
          Go to Expenses
        </button>
        <button className="text-blue-500 hover:underline">
          Go to Investments
        </button>
        <button className="text-blue-500 hover:underline">View Reports</button>
      </div>
    </div>
  );
}
