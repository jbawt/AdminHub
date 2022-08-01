import { styled } from '@mui/system';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { Button, Stack, TextField, Card, CardHeader, CardContent } from '@mui/material';
import * as yup from 'yup';

const schema = yup.object().shape({
  amount: yup.number().required('You must enter a valid number'),
});

const StyledCard = styled(Card)({
  height: '90%',
  width: '45%',
  // padding: '2%',
});

function NewPaymentForm() {
  const goal = useSelector(({ budgetApp }) => budgetApp.goals.goal);
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
  });

  function onSubmit(data) {
    console.log(data);
  }

  return (
    <StyledCard>
      <CardHeader
        sx={{
          borderBottom: '1px solid gray',
        }}
        title={`Add $ towards ${goal.name}`}
      />
      <CardContent sx={{ pt: 12 }}>
        <form
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col md:overflow-hidden"
        >
          <Stack spacing={4}>
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
          </Stack>
        </form>
      </CardContent>
    </StyledCard>
  );
}

export default NewPaymentForm;
