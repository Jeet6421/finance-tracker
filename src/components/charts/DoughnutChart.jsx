import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useMemo } from "react";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function DoughnutChart({
  title,
  labels,
  data,
  backgroundColors = [
    "#FF6384",
    "#36A2EB",
    "#FFCE56",
    "#8BC34A",
    "#FF9800",
  ],
}) {
  // Memoize chart data to avoid unnecessary re-renders
  const chartData = useMemo(() => ({
    labels,
    datasets: [
      {
        data,
        backgroundColor: backgroundColors,
        hoverOffset: 4, // Slightly enlarge segment on hover for better UI feedback
      },
    ],
  }), [labels, data, backgroundColors]);

  // Chart configuration options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `${tooltipItem.label}: ₹${tooltipItem.raw.toLocaleString()}`, // Format tooltip for currency
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
        <Doughnut data={chartData} options={chartOptions} aria-label={title || "Doughnut chart"} />
      </div>
    </div>
  );
}
