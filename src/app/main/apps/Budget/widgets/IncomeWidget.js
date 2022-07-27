import { useState } from 'react';
import { styled } from '@mui/system';
import { useSelector } from 'react-redux';
import { getFederalTaxAmount, getProvincialTaxAmount } from '@equisoft/tax-ca';
import { format } from 'date-fns';
import {
  // TextField,
  Tabs,
  Tab,
  Card,
  CardContent,
  CardHeader,
  Stack,
  Typography,
  Box,
  Divider,
} from '@mui/material';

const StyledCard = styled(Card)`
  width: 100%;
  height: 30%;
`;

const IncomeWidget = (props) => {
  const [tabValue, setTabValue] = useState(0);
  const totalIncome = useSelector(({ budgetApp }) => budgetApp.income.total);
  const expenseData = useSelector(({ budgetApp }) => budgetApp.expenses);
  const filterMonthExpenses = expenseData.data.expenses
    .filter((expense) => {
      if (new Date(expense.date).getMonth() === new Date(Date.now()).getMonth()) {
        return expense;
      }
      return null;
    })
    .filter((item) => item !== null);

  const federalTax = getFederalTaxAmount('AB', totalIncome, 0, 0);
  const provincialTax = getProvincialTaxAmount('AB', totalIncome, 0, 0);
  const tax = federalTax + provincialTax;
  const monthlyIncome = totalIncome / 12;
  const monthlyFedTax = federalTax / 12;
  const monthlyProvTax = provincialTax / 12;
  const monthlyTax = tax / 12;
  const totalAfterTax = monthlyIncome - monthlyTax;
  const expenses = expenseData.loaded
    ? filterMonthExpenses.map((item) => Number(item.total)).reduce((a, b) => a + b)
    : 0;
  const remaining = monthlyIncome - (monthlyTax + expenses);

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
        title="Income"
        subheader={format(new Date(Date.now()), 'MMMM yyyy')}
      />
      <CardContent>
        <Stack spacing={2}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="p" color="inherit" component="div">
              Total Income:
            </Typography>
            ${tabValue === 0 && monthlyIncome.toFixed(2)}
            {tabValue === 1 && (monthlyIncome / 2).toFixed(2)}
            {tabValue === 2 && (monthlyIncome / 4).toFixed(2)}
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="p" color="inherit" component="div">
              Federal Tax:
            </Typography>
            - ${tabValue === 0 && monthlyFedTax.toFixed(2)}
            {tabValue === 1 && (monthlyFedTax / 2).toFixed(2)}
            {tabValue === 2 && (monthlyFedTax / 4).toFixed(2)}
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="p" color="inherit" component="div">
              Provincial Tax:
            </Typography>
            - ${tabValue === 0 && monthlyProvTax.toFixed(2)}
            {tabValue === 1 && (monthlyProvTax / 2).toFixed(2)}
            {tabValue === 2 && (monthlyProvTax / 4).toFixed(2)}
          </Box>
          <Divider />
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="p" color="inherit" component="div">
              Total after tax:
            </Typography>
            ${tabValue === 0 && totalAfterTax.toFixed(2)}
            {tabValue === 1 && (totalAfterTax / 2).toFixed(2)}
            {tabValue === 2 && (totalAfterTax / 4).toFixed(2)}
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="p" color="inherit" component="div">
              Expenses:
            </Typography>
            - ${tabValue === 0 && expenses.toFixed(2)}
            {tabValue === 1 && (expenses / 2).toFixed(2)}
            {tabValue === 2 && (expenses / 4).toFixed(2)}
          </Box>
          <Divider />
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="p" color="inherit" component="div">
              Total after expenses:
            </Typography>
            ${tabValue === 0 && remaining.toFixed(2)}
            {tabValue === 1 && (remaining / 2).toFixed(2)}
            {tabValue === 2 && (remaining / 4).toFixed(2)}
          </Box>
        </Stack>
      </CardContent>
    </StyledCard>
  );
};

export default IncomeWidget;
