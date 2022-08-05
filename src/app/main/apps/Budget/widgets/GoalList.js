import { styled } from '@mui/system';
import { useSelector, useDispatch } from 'react-redux';
import { Card, CardHeader, CardContent, Stack, IconButton, Icon } from '@mui/material';
import { openNewCardDialog } from '../store/cardSlice';
import GoalListItem from './GoalListItem';

const StyledCard = styled(Card)`
  width: 20%;
  height: 80%;
`;

const GoalList = (props) => {
  const dispatch = useDispatch();
  const goals = useSelector(({ budgetApp }) => budgetApp.goals.goalItems);
  const users = useSelector(({ budgetApp }) => budgetApp.goals.users);
  const user = useSelector(({ auth }) => auth.user);
  const userId = user.id;
  const userData = {
    first_name: user.data.displayName.split(' ')[0],
    last_name: user.data.displayName.split(' ')[1],
    id: user.id,
    photourl: user.data.photoURL,
  };

  const formDefaults = {
    name: '',
    description: '',
    amountSaved: 0,
    memberIds: [userId],
    members: [userData],
    savingsGoal: 0,
    users,
  };

  return (
    <StyledCard raised>
      <CardHeader
        sx={{
          borderBottom: '1px solid gray',
        }}
        title="Manage Goals"
        action={
          <IconButton color="success" onClick={() => dispatch(openNewCardDialog(formDefaults))}>
            <Icon>add</Icon>
          </IconButton>
        }
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
