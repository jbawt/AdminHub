import { styled } from '@mui/system';
import { Card, CardHeader } from '@mui/material';

const StyledCard = styled(Card)`
  width: 100%;
  height: 20%;
`;

function EditIncomeForm() {
  return (
    <StyledCard raised>
      <CardHeader
        sx={{
          borderBottom: '1px solid gray',
        }}
        title="Edit Income"
      />
    </StyledCard>
  );
}

export default EditIncomeForm;
