import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios';

// Register chart components from Chart.js
Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const PredictionComponent = ({ coin }) => {
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);

  // Dates for the prediction range (from 5th to 13th September 2024)
  const startDate = '2024-09-05';
  const endDate = '2024-09-13';

  useEffect(() => {
    const fetchPredictedData = async () => {
      try {
        // Fetch the prediction data from the backend for the specific date range
        const response = await axios.get(`http://localhost:5000/data/${coin}`);
        const data = response.data;

        // Filter out entries where the predicted price is 0
        const filteredData = data.filter(d => parseFloat(d['Predicted price']) !== 0);

        // Extract the labels (dates) and the predicted prices from the filtered data
        const labels = filteredData.map(d => d.Date);
        const predictedPrices = filteredData.map(d => parseFloat(d['Predicted price']));

        // Set the chart data with the filtered values
        setChartData({
          labels: labels,
          datasets: [
            {
              label: `${coin.toUpperCase()} Predicted price`,
              data: predictedPrices,
              fill: false,
              backgroundColor: 'rgba(255,99,132,0.2)',
              borderColor: 'rgba(255,99,132,1)',
              pointBackgroundColor: 'rgba(255,99,132,1)',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: 'rgba(255,99,132,1)'
            }
          ]
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching predicted data', error);
      }
    };

    fetchPredictedData();
  }, [coin]);

  return (
    <div>
      <h2>LSTM of {coin.toUpperCase()} </h2>
      {loading ? (
        <p>Loading predicted prices...</p>
      ) : (
        <Line data={chartData} />
      )}
    </div>
  );
};

export default PredictionComponent;
