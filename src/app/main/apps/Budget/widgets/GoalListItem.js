import { styled } from '@mui/system';
import { useDispatch } from 'react-redux';
import withReducer from 'app/store/withReducer';
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  IconButton,
  Tooltip,
  Avatar,
  Typography,
} from '@mui/material';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { EditOutlined, DeleteOutline } from '@mui/icons-material';
import reducer from '../store';
import { getGoal } from '../store/goalSlice';
import { openCardDialog } from '../store/cardSlice';

const StyledCard = styled(Card)({
  width: '100%',
  border: '2px solid gray',
  borderRadius: '10px',
  '&:hover': {
    cursor: 'pointer',
    backgroundColor: 'gray',
  },
});

const StyledDiv = styled('div')`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  boarderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
  },
}));

function GoalListItem(props) {
  const dispatch = useDispatch();
  const { goalData } = props;
  const progressBarPercent = Math.round((goalData.amountSaved / goalData.savings_goal) * 100);

  const handleGoalSelect = (goalId) => {
    dispatch(getGoal(goalId));
  };

  const handleGoalEdit = (data) => {
    dispatch(openCardDialog(goalData));
  };

  return (
    <StyledCard onClick={() => handleGoalSelect(goalData.id)}>
      <CardHeader
        sx={{
          borderBottom: '1px solid gray',
        }}
        action={
          <Box>
            <IconButton color="warning" onClick={() => handleGoalEdit('random data')}>
              <EditOutlined />
            </IconButton>
            <IconButton color="error">
              <DeleteOutline />
            </IconButton>
          </Box>
        }
        title={goalData.name}
        subheader={goalData.description}
      />
      <CardContent>
        <BorderLinearProgress variant="determinate" value={progressBarPercent} />
        <StyledDiv>
          {goalData.members.length > 0 && (
            <div className="flex flex-wrap mt-10 -mx-4">
              {goalData.members.map((member, index) => {
                return (
                  <Tooltip title={`${member.first_name} ${member.last_name}`} key={index}>
                    <Avatar
                      className="mx-4 w-32 h-32"
                      src={member.photourl !== '' ? member.photourl : ''}
                    />
                  </Tooltip>
                );
              })}
              <div />
            </div>
          )}
          <Typography variany="body2" color="text.secondary">
            ${goalData.amountSaved} / ${goalData.savings_goal}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {progressBarPercent}%
          </Typography>
        </StyledDiv>
      </CardContent>
    </StyledCard>
  );
}

export default withReducer('budgetApp', reducer)(GoalListItem);
