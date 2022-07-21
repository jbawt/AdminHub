/* eslint-disable no-nested-ternary */
import { useState } from 'react';
import { styled } from '@mui/system';
import ReactApexChart from 'react-apexcharts';
import { useSelector } from 'react-redux';
import {
  Card,
  CardHeader,
  IconButton,
  CardContent,
  Typography,
  Box,
  Tab,
  Tabs,
} from '@mui/material';
import { MoreVert } from '@mui/icons-material';
import chartData from './PiChartData';

const StyledCard = styled(Card)`
  width: 100%;
  height: 45%;
`;

const PiChart = (props) => {
  const [tabValue, setTabValue] = useState(0);
  const expenseData = useSelector(({ budgetApp }) => budgetApp.expenses);
  const data = chartData(expenseData.data);

  return (
    <StyledCard raised>
      <CardHeader
        sx={{
          borderBottom: '1px solid gray',
        }}
        action={
          <Box sx={{ display: 'flex' }}>
            <Tabs
              value={tabValue}
              onChange={(_ev, value) => setTabValue(value)}
              indicatorColor="secondary"
              textColor="inherit"
              variant="scrollable"
              scrollButtons={false}
              className="-mx-4 min-h-40"
              classes={{ indicator: 'flex justify-center bg-transparent w-full h-full' }}
              TabIndicatorProps={{
                children: (
                  <Box
                    sx={{ bgcolor: 'text.disabled' }}
                    className="w-full h-full rounded-full opacity-20"
                  />
                ),
              }}
            >
              <Tab
                className="text-14 font-semibold min-h-40 min-w-64 mx-4 px-12"
                disableRipple
                key={0}
                label="Monthly"
              />
              <Tab
                className="text-14 font-semibold min-h-40 min-w-64 mx-4 px-12"
                disableRipple
                key={1}
                label="Bi-Weekly"
              />
              <Tab
                className="text-14 font-semibold min-h-40 min-w-64 mx-4 px-12"
                disableRipple
                key={2}
                label="Weekly"
              />
            </Tabs>
            <IconButton aria-label="settings">
              <MoreVert />
            </IconButton>
          </Box>
        }
        title="Expenses"
        subheader="January 2022" // make dynamic
      />
      <CardContent
        sx={{
          width: '100%',
          height: '90%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-evenly',
        }}
      >
        {expenseData.loaded && (
          <ReactApexChart
            options={data.options}
            series={
              tabValue === 0
                ? data.series.map((item) => item)
                : tabValue === 1
                ? data.series.map((item) => item / 2)
                : tabValue === 2
                ? data.series.map((item) => item / 4)
                : [0, 0, 0, 0, 0]
            }
            type="donut"
          />
        )}
        <div>
          <Typography variant="h6" color="inherit" component="div">
            Total expenses: ${tabValue === 0 && data?.series?.reduce((a, b) => a + b).toFixed(2)}
            {tabValue === 1 && (data?.series?.reduce((a, b) => a + b) / 2).toFixed(2)}
            {tabValue === 2 && (data?.series?.reduce((a, b) => a + b) / 4).toFixed(2)}
          </Typography>
        </div>
      </CardContent>
    </StyledCard>
  );
};

export default PiChart;
