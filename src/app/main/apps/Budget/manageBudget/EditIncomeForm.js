import { styled } from '@mui/system';
import { useForm, Controller } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { Card, CardHeader, CardContent, TextField, Stack, Button, Box } from '@mui/material';
import { updateIncome } from '../store/incomeSlice';

const StyledCard = styled(Card)`
  width: 100%;
  height: 20%;
`;

function EditIncomeForm() {
  const dispatch = useDispatch();
  const income = useSelector(({ budgetApp }) => budgetApp?.income);
  const { control, handleSubmit, reset } = useForm({
    mode: 'onSubmit',
    defaultValues: income,
  });

  const onSubmit = (data) => {
    data.total = Number(data.total);
    dispatch(updateIncome(data));
  };

  if (!income) {
    return null;
  }

  return (
    <StyledCard raised>
      <CardHeader
        sx={{
          borderBottom: '1px solid gray',
        }}
        title="Edit Income"
      />
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
            <Controller
              name="total"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Salary"
                  variant="outlined"
                  color="info"
                  type="number"
                  fullWidth
                  required
                />
              )}
            />
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-around',
              }}
            >
              <Button
                variant="contained"
                color="error"
                onClick={() => reset({ total: income?.total })}
              >
                Cancel
              </Button>
              <Button variant="contained" color="success" type="submit">
                Save
              </Button>
            </Box>
          </Stack>
        </form>
      </CardContent>
    </StyledCard>
  );
}

export default EditIncomeForm;
