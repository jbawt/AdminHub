import { styled } from '@mui/system';
import { useSelector } from 'react-redux';
import { Card, CardHeader, CardContent } from '@mui/material';
import ProgressChart from './ProgressChart';
import ProgressWidget from './ProgressWidget';
import NewPaymentForm from './NewPaymentForm';

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
  display: flex;
  padding: 0 2% 0 2%;
  justify-content: space-between;
`;

const Goal = (props) => {
  const goal = useSelector(({ budgetApp }) => budgetApp.goals.goal);

  return (
    <StyledCard raised>
      <CardHeader
        sx={{
          borderBottom: '1px solid gray',
        }}
        title={goal ? goal.name : ''}
        subheader={goal ? goal.description : ''}
      />
      <StyledCardContent>
        {goal && <ProgressChart goalData={goal} />}
        <StyledDiv>
          {goal && <ProgressWidget goalData={goal} />}
          {goal && <NewPaymentForm />}
        </StyledDiv>
      </StyledCardContent>
    </StyledCard>
  );
};

export default Goal;
