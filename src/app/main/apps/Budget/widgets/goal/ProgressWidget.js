import { styled } from '@mui/system';
import {
  Card,
  CardHeader,
  CardContent,
  Box,
  Typography,
  CircularProgress,
  Divider,
} from '@mui/material';

const StyledCard = styled(Card)({
  height: '90%',
  width: '45%',
});

function ProgressWidget(props) {
  const { goalData } = props;
  const amountSaved =
    goalData.savingsData.length > 0
      ? goalData.savingsData.map((item) => item.amount).reduce((a, b) => a + b)
      : 0;
  const goalPercent = Math.round((amountSaved / goalData.savings_goal) * 100);

  return (
    <StyledCard>
      <CardHeader title={`${goalData.name} Progress`} sx={{ borderBottom: '1px solid gray' }} />
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-around',
            height: '100%',
            marginBottom: '4%',
          }}
        >
          <CircularProgress
            size={225}
            variant="determinate"
            value={goalPercent}
            color="secondary"
            thickness={10}
          />
          <Box
            sx={{
              position: 'absolute',
            }}
          >
            <Typography variant="body2" component="div" color="text.secondary">
              {goalPercent}%
            </Typography>
          </Box>
        </Box>
        <Divider />
        <Typography variant="body1" color="text.secondary" marginTop={4} textAlign="center">
          ${amountSaved} / ${goalData.savings_goal}
        </Typography>
      </CardContent>
    </StyledCard>
  );
}

export default ProgressWidget;
