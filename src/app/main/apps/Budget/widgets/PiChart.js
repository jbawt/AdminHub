import ReactApexChart from 'react-apexcharts';
import { styled } from '@mui/system';
import { Card, CardHeader, IconButton, CardContent, Typography } from '@mui/material';
import { MoreVert } from '@mui/icons-material';

const PiChart = (props) => {
  // fake data until backend is made
  const data = {
    options: {
      labels: ['Rent', 'Expenses', 'Spending', 'Savings'],
      theme: {
        monochrome: {
          enabled: false,
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: '100%',
              height: '100%',
            },
            legend: {
              show: false,
            },
          },
        },
      ],
      chart: {
        events: {
          dataPointSelection: (event, chartContext, config) => {
            console.log(config.w.config.labels[config.dataPointIndex]);
          },
        },
      },
    },
    series: [1060, 500, 130, 430],
  };

  const StyledCard = styled(Card)`
    width: 25%;
    height: 50%;
  `;

  return (
    <StyledCard>
      <CardHeader
        sx={{
          borderBottom: '1px solid gray',
        }}
        action={
          <IconButton aria-label="settings">
            <MoreVert />
          </IconButton>
        }
        title="Expenses"
        subheader="January" // make dynamic
      />
      <CardContent
        sx={{
          width: '100%',
          height: '90%',
        }}
      >
        <ReactApexChart options={data.options} series={data.series} type="pie" />
        <div>
          <Typography variant="h6" color="inherit" component="div">
            Total expenses: {data.series.reduce((a, b) => a + b)}
          </Typography>
        </div>
      </CardContent>
    </StyledCard>
  );
};

export default PiChart;
