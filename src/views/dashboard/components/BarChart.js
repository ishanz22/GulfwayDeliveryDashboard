import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const BarChart = () => {
  const chartContainer = useRef(null);
  const chartRef = useRef(null);

  const DATA_COUNT = 7;

  useEffect(() => {
    const labels = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul', // Add more months as needed
    ];
    const data = {
      labels,
      datasets: [
        {
          label: 'Dataset 1',
          data: Array.from({ length: DATA_COUNT }, () => Math.floor(Math.random() * 100)),
          borderColor: '#212529',
          backgroundColor: `rgba(90, 148, 200, 0.2)`,
        },
      ],
    };

    const config = {
      type: 'bar',
      data,
      options: {
        indexAxis: 'y',
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          y: {
            beginAtZero: true, // Ensure the y-axis starts at 0
          },
        },
      },
    };

    if (chartContainer && chartContainer.current) {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
      chartRef.current = new Chart(chartContainer.current, config);
    }

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
    };
  }, []);

  return (
    <div>
      <canvas ref={chartContainer} width={400} height={250} />
    </div>
  );
};

export default BarChart;
