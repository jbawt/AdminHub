import ReactApexChart from 'react-apexcharts';
import { Box } from '@mui/material';
import chartData from './ProgressChartData';

const ProgressChart = (props) => {
  const { goalData } = props;
  const data = chartData(goalData);

  return (
    <Box
      sx={{
        height: '40%',
        width: '95%',
        borderRadius: 5,
      }}
    >
      <ReactApexChart options={data.options} series={data.series} type="bar" height="100%" />
    </Box>
  );
};

export default ProgressChart;
