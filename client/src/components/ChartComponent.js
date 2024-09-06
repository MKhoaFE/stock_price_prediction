import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios';

// Đăng ký các thành phần của Chart.js
Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ChartComponent = ({ coin }) => {
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/data/${coin}`);
        const data = response.data;

        // Lọc bỏ những giá trị Close bằng 0
        const filteredData = data.filter(d => d.Close !== 0);

        // Lấy các nhãn (ngày) và giá Close từ dữ liệu đã lọc
        const labels = filteredData.map(d => d.Date);
        const closePrices = filteredData.map(d => d.Close);

        setChartData({
          labels: labels,
          datasets: [
            {
              label: `${coin} Price`,
              data: closePrices,
              fill: false,
              backgroundColor: 'rgba(75,192,192,0.2)',
              borderColor: 'rgba(75,192,192,1)',
            }
          ]
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, [coin]);

  return (
    <div>
      {loading ? <p>Loading...</p> : <Line data={chartData} />}
    </div>
  );
};

export default ChartComponent;
