import { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { Box } from '@mui/material';

const ProgressChart = (props) => {
  const [tabValue, setTabValue] = useState(0);

  // fake data until api is made
  const data = {
    series: [
      {
        name: 'Put Away',
        data: [100, 150, 100, 200, 150, 300, 200],
      },
    ],
    options: {
      chart: {
        type: 'bar',
        toolbar: {
          show: false,
        },
      },
      legend: {
        show: false,
      },
      theme: {
        palette: 'palette1',
      },
      plotOptions: {
        bar: {
          horizontal: false,
          borderRadius: 10,
          distributed: true,
          columnWidth: '55%',
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent'],
      },
      xaxis: {
        categories: ['week1', 'week2', 'week3', 'week4', 'week5', 'week6', 'week7'],
      },
      yaxis: {
        title: {
          text: '$ Put Away',
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter(val) {
            return `$${val}`;
          },
        },
        theme: 'dark',
      },
    },
  };

  return (
    <Box
      sx={{
        height: '40%',
        width: '95%',
        // border: '2px solid gray',
        borderRadius: 5,
        background: '#fff',
      }}
    >
      <ReactApexChart options={data.options} series={data.series} type="bar" height="100%" />
    </Box>
  );
};

export default ProgressChart;
