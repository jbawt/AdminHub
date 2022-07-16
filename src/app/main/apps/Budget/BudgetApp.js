import { styled } from '@mui/system';
import { Box } from '@mui/material';
import BudgetAppToolbar from './BudgetAppToolbar';
import PiChart from './widgets/PiChart';
import IncomeWidget from './widgets/IncomeWidget';

const StyledBox = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 100%;
  height: 100%;
  margin-left: 5%;
`;

function BudgetApp() {
  return (
    <>
      <BudgetAppToolbar />
      <StyledBox>
        <IncomeWidget />
        <PiChart />
      </StyledBox>
    </>
  );
}

export default BudgetApp;
