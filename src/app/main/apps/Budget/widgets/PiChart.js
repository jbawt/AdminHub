/* eslint-disable no-nested-ternary */
import { useState } from 'react';
import { styled } from '@mui/system';
import ReactApexChart from 'react-apexcharts';
import { useSelector } from 'react-redux';
import { format } from 'date-fns';
import {
  Card,
  CardHeader,
  IconButton,
  CardContent,
  Typography,
  Box,
  Tab,
  Tabs,
  Menu,
  MenuItem,
  Tooltip,
} from '@mui/material';
import { MoreVert } from '@mui/icons-material';
import chartData from './PiChartData';

const StyledCard = styled(Card)`
  width: 100%;
  height: 45%;
`;

const PiChart = (props) => {
  const [tabValue, setTabValue] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date(Date.now()));
  const [anchorEl, setAnchorEl] = useState(null);
  const expenseData = useSelector(({ budgetApp }) => budgetApp.expenses);
  const open = Boolean(anchorEl);

  const data = chartData(expenseData.data, selectedDate);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleMonthSelect = (monthsAgo) => {
    if (monthsAgo === null) {
      setSelectedDate(new Date(Date.now()));
    } else {
      const date = new Date();
      const newDate = new Date(date.getFullYear(), date.getMonth() - monthsAgo, 1);
      setSelectedDate(newDate);
    }
  };

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
          </Box>
        }
        title="Expenses"
        subheader={format(selectedDate, 'MMMM yyyy')} // make dynamic
      />
      <CardContent
        sx={{
          width: '100%',
          height: '90%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
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
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" color="inherit" component="div">
            Total expenses: ${tabValue === 0 && data?.series?.reduce((a, b) => a + b).toFixed(2)}
            {tabValue === 1 && (data?.series?.reduce((a, b) => a + b) / 2).toFixed(2)}
            {tabValue === 2 && (data?.series?.reduce((a, b) => a + b) / 4).toFixed(2)}
          </Typography>
          <Tooltip title="View previous months" placement="top-end">
            <IconButton
              id="settings-menu"
              aria-label="settings"
              aria-controls={open ? 'settings-position-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            >
              <MoreVert />
            </IconButton>
          </Tooltip>
          <Menu
            id="settings-positioned-menu"
            aria-labelledby="settings-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
          >
            <MenuItem
              id="TM"
              onClick={() => {
                handleMonthSelect(null);
                handleClose();
              }}
            >
              This Month
            </MenuItem>
            <MenuItem
              id="LM"
              onClick={() => {
                handleMonthSelect(1);
                handleClose();
              }}
            >
              Last Month
            </MenuItem>
            <MenuItem
              id="NM"
              onClick={() => {
                handleMonthSelect(-1);
                handleClose();
              }}
            >
              Next Month
            </MenuItem>
          </Menu>
        </Box>
      </CardContent>
    </StyledCard>
  );
};

export default PiChart;
