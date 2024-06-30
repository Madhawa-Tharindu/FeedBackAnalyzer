import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const DoughnutChart = ({ sentimentData }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (sentimentData) {
      const ctx = chartRef.current.getContext("2d");

      // Destroy previous chart if it exists
      if (chartRef.current.chart) {
        chartRef.current.chart.destroy();
      }

      const data = {
        labels: ["Positive", "Negative", "Neutral"],
        datasets: [
          {
            data: [
              sentimentData.positiveCount,
              sentimentData.negativeCount,
              sentimentData.neutralCount,
            ],
            backgroundColor: ["#3B8FF3", "#FF0854", "#00D284"],
          },
        ],
      };

      const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "bottom",
          },
        },
      };

      const newChart = new Chart(ctx, {
        type: "doughnut",
        data: data,
        options: options,
      });

      // Save the chart instance to the ref
      chartRef.current.chart = newChart;
    }
  }, [sentimentData]);

  return <canvas ref={chartRef} />;
};

export default DoughnutChart;
