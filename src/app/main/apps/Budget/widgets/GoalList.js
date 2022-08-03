import { styled } from '@mui/system';
import { useSelector } from 'react-redux';
import { Card, CardHeader, CardContent, Stack } from '@mui/material';
import GoalListItem from './GoalListItem';

const StyledCard = styled(Card)`
  width: 20%;
  height: 80%;
`;

const GoalList = (props) => {
  const goals = useSelector(({ budgetApp }) => budgetApp.goals.goalItems);

  return (
    <StyledCard raised>
      <CardHeader
        sx={{
          borderBottom: '1px solid gray',
        }}
        title="Manage Goals"
      />
      <CardContent>
        {goals && goals.length > 0 && (
          <Stack spacing={3}>
            {goals.map((goal, index) => {
              return <GoalListItem goalData={goal} key={index} />;
            })}
          </Stack>
        )}
      </CardContent>
    </StyledCard>
  );
};

export default GoalList;
