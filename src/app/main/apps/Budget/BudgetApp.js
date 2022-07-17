import { styled } from '@mui/system';
import { Box } from '@mui/material';
import BudgetAppToolbar from './BudgetAppToolbar';
import PiChart from './widgets/PiChart';
import IncomeWidget from './widgets/IncomeWidget';
import Goal from './widgets/goal/Goal';
import GoalList from './widgets/GoalList';

const StyledBox = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 20%;
  height: 100%;
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
  return (
    <>
      <BudgetAppToolbar />
      <StyledDiv>
        <StyledBox>
          <IncomeWidget />
          <PiChart />
        </StyledBox>
        <Goal />
        <GoalList />
      </StyledDiv>
    </>
  );
}

export default BudgetApp;
