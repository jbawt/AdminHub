import { styled } from '@mui/system';
import { Card, CardHeader, CardContent } from '@mui/material';
import ProgressChart from './ProgressChart';

const StyledCard = styled(Card)`
  width: 40%;
  height: 80%;
`;

const StyledCardContent = styled(CardContent)`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

const StyledDiv = styled('div')`
  height: 50%;
  width: 100%;
`;

const Goal = (props) => {
  return (
    <StyledCard raised>
      <CardHeader
        sx={{
          borderBottom: '1px solid gray',
        }}
        title="Goal Name" // make dynamic
      />
      <StyledCardContent>
        <ProgressChart />
        <StyledDiv />
      </StyledCardContent>
    </StyledCard>
  );
};

export default Goal;
