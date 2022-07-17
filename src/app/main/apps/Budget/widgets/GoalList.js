import { styled } from '@mui/system';
import { Card, CardHeader, CardContent } from '@mui/material';

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
      <CardContent />
    </StyledCard>
  );
};

export default GoalList;
