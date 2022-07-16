import { useState } from 'react';
import { styled } from '@mui/system';
import {
  // TextField,
  Tabs,
  Tab,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Stack,
  Typography,
  Box,
  Divider,
} from '@mui/material';
import { MoreVert } from '@mui/icons-material';

const StyledCard = styled(Card)`
  width: 20%;
  height: 25%;
`;

const IncomeWidget = (props) => {
  const [tabValue, setTabValue] = useState(0);
  const totalIncome = 4000;
  const tax = 880;
  const expenses = 2120;
  const remaining = totalIncome - (tax + expenses);

  return (
    <StyledCard>
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
        title="Income"
        subheader="January" // make dynamic
      />
      <CardContent>
        <Stack spacing={3}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="p" color="inherit" component="div">
              Total Income:
            </Typography>
            {tabValue === 0 && totalIncome.toFixed(2)}
            {tabValue === 1 && (totalIncome / 2).toFixed(2)}
            {tabValue === 2 && (totalIncome / 4).toFixed(2)}
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="p" color="inherit" component="div">
              Expenses:
            </Typography>
            -{tabValue === 0 && expenses.toFixed(2)}
            {tabValue === 1 && (expenses / 2).toFixed(2)}
            {tabValue === 2 && (expenses / 4).toFixed(2)}
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="p" color="inherit" component="div">
              Tax:
            </Typography>
            -{tabValue === 0 && tax.toFixed(2)}
            {tabValue === 1 && (tax / 2).toFixed(2)}
            {tabValue === 2 && (tax / 4).toFixed(2)}
          </Box>
          <Divider />
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="p" color="inherit" component="div">
              Remaining:
            </Typography>
            {tabValue === 0 && remaining.toFixed(2)}
            {tabValue === 1 && (remaining / 2).toFixed(2)}
            {tabValue === 2 && (remaining / 4).toFixed(2)}
          </Box>
        </Stack>
      </CardContent>
    </StyledCard>
  );
};

export default IncomeWidget;
