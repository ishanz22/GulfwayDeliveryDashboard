import React, { useEffect, useRef, useState } from 'react';
import { Chart, registerables } from 'chart.js';
import { useSelector } from 'react-redux';
import { Col } from 'react-bootstrap';
import Select from 'react-select';
import { DatePicker } from 'antd';

const { RangePicker } = DatePicker;

const DoughnutChart = () => {
  const { themeValues } = useSelector((state) => state.settings);
  const chartContainer = useRef(null);
  const [selectedDateRange, setSelectedDateRange] = useState('23 Jan, 2023 - 22 Feb, 2022');
  const chartRef = useRef(null);

  const generateChartData = (dateRange) => {
    // Replace this with your Doughnut chart data generation logic based on the selected date range
    // Example: You can have an object with predefined data for different date ranges
    const dataByDateRange = {
      '23 Jan, 2023 - 22 Feb, 2022': {
        // labels: ['Label 1', 'Label 2', 'Label 3'],
        datasets: [
          {
            data: [300, 50, 100],
            backgroundColor: [themeValues.primary, themeValues.secondary, themeValues.tertiary],
          },
        ],
      },
      '25 Jan, 2023 - 22 Feb, 2023': {
        labels: ['Label 1', 'Label 2', 'Label 3'],
        datasets: [
          {
            data: [150, 200, 250],
            backgroundColor: [themeValues.primary, themeValues.secondary, themeValues.tertiary],
          },
        ],
      },
      // Add more date range options as needed
    };

    return dataByDateRange[dateRange] || null;
  };

  useEffect(() => {
    const config = {
      type: 'doughnut',
      options: {
        plugins: {
          legend: {
            display: true,
            position: 'top',
            align: 'end',
          },
        },
        responsive: true,
        maintainAspectRatio: false,
        cutout: '60%', 
      },
      data: generateChartData(selectedDateRange),
    };

    if (chartContainer && chartContainer.current) {
      Chart.register(...registerables);
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
  }, [selectedDateRange, themeValues]);

  return (
    <div>
      <div style={{ height: '160px' }}>
        <canvas ref={chartContainer} />
      </div>
    </div>
  );
};

export default React.memo(DoughnutChart);
