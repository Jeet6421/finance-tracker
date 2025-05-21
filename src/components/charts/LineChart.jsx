import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { useMemo } from "react";

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function LineChart({ title, labels, datasets }) {
  // Memoize chart data to avoid unnecessary re-renders
  const chartData = useMemo(() => ({
    labels,
    datasets,
  }), [labels, datasets]);

  // Chart configuration options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          autoSkip: true,
          maxRotation: 0, // Prevent x-axis tick rotation
        },
      },
      y: {
        beginAtZero: true, // Ensure the y-axis starts from zero
        ticks: {
          callback: (value) => `₹${value.toLocaleString()}`, // Format y-axis values as currency
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `₹${tooltipItem.raw.toLocaleString()}`, // Format tooltip labels
        },
      },
      legend: {
        position: "top", // Position the legend on top
      },
    },
  };

  return (
    <div className="mb-6">
      {title && <h2 className="text-lg font-semibold mb-2">{title}</h2>}
      <div className="relative h-64">
        <Line data={chartData} options={chartOptions} aria-label={title || "Line chart"} />
      </div>
    </div>
  );
}
