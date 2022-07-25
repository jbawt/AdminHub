import { styled } from '@mui/system';
import { Card, CardHeader, CardContent, Stack } from '@mui/material';
import GoalListItem from './GoalListItem';

const StyledCard = styled(Card)`
  width: 20%;
  height: 80%;
`;

const GoalList = (props) => {
  return (
    <StyledCard raised>
      <CardHeader
        sx={{
          borderBottom: '1px solid gray',
        }}
        title="Manage Goals"
      />
      <CardContent>
        <Stack spacing={3}>
          <GoalListItem />
          <GoalListItem />
          <GoalListItem />
        </Stack>
      </CardContent>
    </StyledCard>
  );
};

export default GoalList;
