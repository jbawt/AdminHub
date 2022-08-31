import { styled } from '@mui/system';
import { Card, CardHeader } from '@mui/material';

const StyledCard = styled(Card)`
  width: 100%;
  height: 55%;
`;

function ExpenseMonthList() {
  return (
    <StyledCard raised>
      <CardHeader
        sx={{
          borderBottom: '1px solid gray',
        }}
        title="Expense Month"
        subheader="year"
      />
    </StyledCard>
  );
}

export default ExpenseMonthList;
