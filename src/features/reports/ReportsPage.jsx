import { useEffect, useState } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import ReportsService from "./ReportsService";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend
);

export default function ReportsPage() {
  const [monthlyData, setMonthlyData] = useState(null);
  const [categoryData, setCategoryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Function to handle fetching reports data
  const fetchReports = async () => {
    setLoading(true);
    setError(""); // Clear previous errors
    try {
      const [monthRes, catRes] = await Promise.all([
        ReportsService.getMonthlySummary(),
        ReportsService.getCategoryWiseExpense(),
      ]);

      setMonthlyData(monthRes);
      setCategoryData(catRes);
    } catch (err) {
      console.error("Error fetching reports:", err);

      const errorMsg = err.response?.status === 403
        ? "You are not authorized to view these reports. Please log in."
        : err.response?.status === 401
        ? "Session expired. Please log in again."
        : "Failed to fetch reports data. Please try again.";

      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  // Data structure for Bar Chart (Income vs Expenses)
  const barChartData = monthlyData && {
    labels: monthlyData.labels,
    datasets: [
      {
        label: "Income",
        data: monthlyData.income,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
      {
        label: "Expenses",
        data: monthlyData.expenses,
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
    ],
  };

  // Data structure for Doughnut Chart (Category-wise Expenses)
  const doughnutChartData = categoryData && {
    labels: categoryData.labels,
    datasets: [
      {
        data: categoryData.data,
        backgroundColor: [
          "#FF6384", "#36A2EB", "#FFCE56", "#8BC34A",
          "#FF9F40", "#4BC0C0", "#9966FF",
        ],
      },
    ],
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Reports</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {loading ? (
        <p>Loading reports data...</p>
      ) : (
        <>
          {barChartData && (
            <section className="mb-10">
              <h2 className="text-lg font-semibold mb-2">
                Monthly Income vs Expenses
              </h2>
              <Bar data={barChartData} />
            </section>
          )}

          {doughnutChartData && (
            <section>
              <h2 className="text-lg font-semibold mb-2">
                Category-wise Expense
              </h2>
              <Doughnut data={doughnutChartData} />
            </section>
          )}
        </>
      )}
    </div>
  );
}
