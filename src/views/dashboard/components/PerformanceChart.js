import React, { useEffect, useRef, useState } from 'react';
import { Chart, registerables } from 'chart.js';
import { useSelector } from 'react-redux';
import { Col } from 'react-bootstrap';
import Select from 'react-select';
import { DatePicker, } from 'antd';

const { RangePicker } = DatePicker;
 
const LineChart = () => {
  const { themeValues } = useSelector((state) => state.settings);
  const chartContainer = useRef(null);
  const [selectedDateRange, setSelectedDateRange] = useState('23 Jan, 2023 - 22 Feb, 2022');
  const [selectedDisplayMode1, setSelectedDisplayMode1] = useState('Daily');
  const [selectedDisplayMode2, setSelectedDisplayMode2] = useState('2023 12 05 - 2023 12 05');
  const chartRef = useRef(null);

  const optionsState = [
    { value: 'Daily', label: 'Daily' },
    { value: 'Weekly', label: 'Weekly' },
    { value: 'Monthly', label: 'Monthly' },
  ];

  const optionsStateDate = [
    { value: '2023 12 05 - 2023 12 05', label: '2023 12 30 - 2023 12 30' },
    { value: '2023 11 05 - 2023 11 30', label: '2023 11 05 - 2023 11 30' },
    { value: '2023 10 05 - 2023 10 05', label: '2023 10 05 - 2023 10 05' },
  ];

  const generateChartData = (dateRange) => {
    // Replace this with your data generation logic based on the selected date range
    // Example: You can have an object with predefined data for different date ranges
    const dataByDateRange = {
      '23 Jan, 2023 - 22 Feb, 2022': {
        // labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4'],
           labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4',],
        datasets: [
          {
            label: 'Chosen Period',
            borderColor: themeValues.primary,
            backgroundColor: `rgba(90, 148, 200, 0.2)`,
            data: [0, 150, 400, 450],
            fill: true,
            tension: 0.4,
          },
          {
            label: 'Last Period',
            borderColor: themeValues.secondary,
            backgroundColor: `rgba(90, 148, 200, 0.1)`,
            data: [0, 200, 500, 550],
            fill: true,
            tension: 0.4,
          },
        ],
      },
      '25 Jan, 2023 - 22 Feb, 2023': {
        labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4'],
        datasets: [
          {
            label: 'Chosen Period',
            borderColor: themeValues.primary,
            backgroundColor: `rgba(90, 148, 200, 0.1)`,
            data: [0, 100, 300, 350], // Example data for the second date range
            fill: true,
            tension: 0.4,
          },
          {
            label: 'Last Period',
            borderColor: themeValues.secondary,
            backgroundColor: `rgba(90, 148, 200, 0.1)`,
            data: [0, 150, 400, 450], // Example data for the second date range
            fill: true,
            tension: 0.4,
          },
        ],
      },
      // Add more date range options as needed
    };

    return dataByDateRange[dateRange] || null;
  };

  useEffect(() => {
    const config = {
      type: 'line',
      options: {
        plugins: {
          legend: {
            display: true,
            position: 'top',
            align: 'end',
          },
          tooltip: {
            enabled: true,
            mode: 'index',
          },
        },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              display: true,
              lineWidth: 1,
              color: themeValues.separatorLight,
              drawBorder: false,
            },
            ticks: {
              stepSize: 100,
              color: themeValues.alternate,
            },
          },
          x: {
            grid: { display: false, drawBorder: false },
          },
        },
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
   

      <div style={{ height: '350px' }}>
        <canvas ref={chartContainer} />
      </div>
    </div>
  );
};

export default React.memo(LineChart);
