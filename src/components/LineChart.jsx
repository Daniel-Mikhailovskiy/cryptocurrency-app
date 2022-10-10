import React from 'react';
import { Typography, Col, Row,  } from 'antd';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = ({coinHistory, currentPrice, coinName}) => {
  const coinPrice = [];
  const coinTimestamp = [];

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinPrice.push(coinHistory?.data?.history[i].price);
  }

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinTimestamp.push(new Date((coinHistory?.data?.history[i].timestamp)).toLocaleDateString());
  }
  console.log(coinTimestamp, coinPrice)

  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: 'Price In USD',
        data: coinPrice,
        fill: false,
        backgroundColor: '#0071bd',
        borderColor: '#0071bd',
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <>
      <Row className='chart-header'>
        <Typography.Title level={3} className='coin-details-heading' >{coinName} Price Chart</Typography.Title>
        <Col className='history-col'> 
          <Typography.Title className='history-title' level={5}>Change: {coinHistory?.data?.change}% </Typography.Title>
          <Typography.Title style={{marginTop: 0, fontWeight: 900}} level={5}> Current {coinName} Price: ${currentPrice} </Typography.Title>
        </Col>
      </Row>
      <div className='chart'><Line data={data} options={options} /></div>
      
    </>
  )
}

export default LineChart