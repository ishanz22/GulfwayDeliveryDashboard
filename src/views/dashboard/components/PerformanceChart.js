import React, { useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js';

import { connect, useDispatch } from 'react-redux';

import { getSalesData } from 'actions/admin';

ChartJS.register(...registerables);
const LineChart = (props) => {
  const dispatch = useDispatch();
  const { salesData } = props;

  useEffect(() => {
    dispatch(getSalesData({}));
  }, []);

  const chartOptions = {
    scales: {
      x: {
        type: 'category',
        labels: salesData && salesData.map((entry) => entry.orderMonth),
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  const data = {
    labels: salesData && salesData.map((entry) => entry.orderMonth),
    datasets: [
      {
        label: 'Montly Order Sales (AED)',
        data: salesData && salesData.map((entry) => entry.totalAmount),
        fill: false,
        borderColor: '#5A94C8',
        tension: 0.1,
      },
    ],
  };

  return (
    <div>
      <div>
        <Line data={data} options={chartOptions} />
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  console.log(state.auth);
  return {
    salesData: state.admin.salesData,
    error: state.auth.error,
  };
}
export default connect(mapStateToProps)(LineChart);
