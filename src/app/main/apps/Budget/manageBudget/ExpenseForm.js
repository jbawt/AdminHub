import { styled } from '@mui/system';
import { Card, CardHeader } from '@mui/material';

const StyledCard = styled(Card)`
  width: 40%;
  height: 87%;
`;

function ExpenseForm() {
  return (
    <StyledCard raised>
      <CardHeader
        sx={{
          borderBottom: '1px solid gray',
        }}
        title="Month"
        subheader="Year"
      />
    </StyledCard>
  );
}

export default ExpenseForm;
