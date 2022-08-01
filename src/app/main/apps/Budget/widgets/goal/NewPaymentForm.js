import { styled } from '@mui/system';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Box, TextField, Card, CardHeader, CardContent } from '@mui/material';
import * as yup from 'yup';
import { addMoneyToGoal } from '../../store/goalSlice';

const schema = yup.object().shape({
  amount: yup.number().required('You must enter a valid number'),
});

const StyledCard = styled(Card)({
  height: '90%',
  width: '45%',
  // padding: '2%',
});

function NewPaymentForm() {
  const dispatch = useDispatch();
  const goal = useSelector(({ budgetApp }) => budgetApp.goals.goal);
  const { control, handleSubmit, setValue } = useForm({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
  });

  function onSubmit(data) {
    const date = new Date();
    const date2 = new Date();
    const today = date.getDate();
    const currentDay = date.getDay();
    date.setHours(23, 59, 0, 0);
    date2.setHours(0, 1, 0, 0);

    data.goalId = goal.id;
    data.weekStart = new Date(date.setDate(today - currentDay + 1));
    data.weekEnd = new Date(date2.setDate(today - currentDay + 7));

    dispatch(addMoneyToGoal(data));
    setValue('amount', '');
  }

  return (
    <StyledCard>
      <CardHeader
        sx={{
          borderBottom: '1px solid gray',
        }}
        title={`Add $ towards ${goal.name}`}
      />
      <CardContent sx={{ pt: 12, height: '100%' }}>
        <form
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col md:overflow-hidden h-full"
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-around',
              height: '50%',
              width: '100%',
            }}
          >
            <Controller
              control={control}
              name="amount"
              render={({ field }) => (
                <TextField
                  {...field}
                  className="md-24"
                  label="Amount"
                  id="amount"
                  type="number"
                  variant="outlined"
                  required
                />
              )}
            />
            <Button variant="contained" color="primary" type="submit">
              Add
            </Button>
          </Box>
        </form>
      </CardContent>
    </StyledCard>
  );
}

export default NewPaymentForm;
