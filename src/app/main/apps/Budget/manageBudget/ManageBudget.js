import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { styled } from '@mui/system';
import { Box } from '@mui/material';
import BudgetAppToolbar from '../BudgetAppToolbar';
import PiChart from '../widgets/PiChart';
import IncomeWidget from '../widgets/IncomeWidget';
import ExpenseForm from './ExpenseForm';
import ExpenseMonthList from './ExpenseMonthList';
import EditIncomeForm from './EditIncomeForm';
import { getIncome } from '../store/incomeSlice';
import { getExpenses } from '../store/expenseSlice';

const StyledDiv = styled('div')`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
`;

const StyledBox = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 20%;
  height: 97%;
`;

function ManageBudget() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIncome());
    dispatch(getExpenses());
  }, [dispatch]);

  return (
    <>
      <BudgetAppToolbar />
      <StyledDiv>
        <StyledBox>
          <IncomeWidget />
          <PiChart />
        </StyledBox>
        <StyledBox>
          <EditIncomeForm />
          <ExpenseMonthList />
        </StyledBox>
        <ExpenseForm />
      </StyledDiv>
    </>
  );
}

export default ManageBudget;
