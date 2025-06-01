import React from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import useAnalytics from "../hooks/useAnalytics"; // Adjust path if needed

// Register required chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

const AnalyticsDashboard = () => {
  const data = useAnalytics();

  if (!data) return <div>Loading analytics...</div>;

  // Chart config for age distribution
  const ageChartData = {
    labels: data.patientAges.labels,
    datasets: [
      {
        label: "Patients by Age Group",
        data: data.patientAges.values,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderRadius: 5,
      },
    ],
  };

  // Chart config for gender distribution
  const genderChartData = {
    labels: data.genderDistribution.labels,
    datasets: [
      {
        label: "Gender Distribution",
        data: data.genderDistribution.values,
        backgroundColor: [
          "#36A2EB",
          "#FF6384",
          "#FFCE56",
        ],
      },
    ],
  };

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold">Patient Analytics</h1>

      <div className="bg-white shadow rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-2">Age Distribution</h2>
        <Bar data={ageChartData} />
      </div>

      <div className="bg-white shadow rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-2">Gender Distribution</h2>
        <Pie data={genderChartData} />
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
