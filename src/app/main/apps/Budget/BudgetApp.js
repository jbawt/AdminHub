import withReducer from 'app/store/withReducer';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { styled } from '@mui/system';
import { Box } from '@mui/material';
import reducer from './store';
import { getIncome } from './store/incomeSlice';
import { getExpenses } from './store/expenseSlice';
import { getGoals } from './store/goalSlice';
import BudgetAppToolbar from './BudgetAppToolbar';
import PiChart from './widgets/PiChart';
import IncomeWidget from './widgets/IncomeWidget';
import Goal from './widgets/goal/Goal';
import GoalList from './widgets/GoalList';
import BudgetCardDialog from './dialogs/BudgetCardDialog';

const StyledBox = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 20%;
  height: 97%;
`;

const StyledDiv = styled('div')`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
`;

function BudgetApp() {
  const dispatch = useDispatch();
  const goals = useSelector(({ budgetApp }) => budgetApp.goals.goalItems);

  useEffect(() => {
    dispatch(getIncome());
    dispatch(getExpenses());
    dispatch(getGoals());
  }, [dispatch]);

  return (
    <>
      <BudgetAppToolbar />
      <StyledDiv>
        <StyledBox>
          {goals && <IncomeWidget />}
          <PiChart />
        </StyledBox>
        <Goal />
        <GoalList />
      </StyledDiv>

      <BudgetCardDialog />
    </>
  );
}

export default withReducer('budgetApp', reducer)(BudgetApp);
