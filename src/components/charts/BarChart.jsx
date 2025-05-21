import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { useMemo } from "react";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function BarChart({ title, labels, datasets }) {
  // Memoize data to prevent unnecessary re-renders
  const chartData = useMemo(
    () => ({
      labels,
      datasets,
    }),
    [labels, datasets]
  );

  // Chart configuration options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          label: (tooltipItem) =>
            `${
              tooltipItem.dataset.label
            }: ₹${tooltipItem.raw.toLocaleString()}`, // Format tooltip for currency
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => `₹${value.toLocaleString()}`, // Format Y-axis labels as currency
        },
      },
    },
  };

  return (
    <div className="mb-6">
      {title && <h2 className="text-lg font-semibold mb-2">{title}</h2>}
      <div className="relative h-64">
        <Bar
          data={chartData}
          options={chartOptions}
          aria-label={title || "Bar chart"}
        />
      </div>
    </div>
  );
}
