import { styled } from '@mui/system';
import {
  TextField,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Stack,
  Typography,
  Box,
  Divider,
} from '@mui/material';
import { MoreVert } from '@mui/icons-material';

const StyledCard = styled(Card)`
  width: 25%;
  height: 25%;
`;

const IncomeWidget = (props) => {
  return (
    <StyledCard>
      <CardHeader
        sx={{
          borderBottom: '1px solid gray',
        }}
        action={
          <IconButton aria-label="settings">
            <MoreVert />
          </IconButton>
        }
        title="Income"
        subheader="January" // make dynamic
      />
      <CardContent>
        <Stack spacing={3}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="p" color="inherit" component="div">
              Total Income:
            </Typography>
            3000
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="p" color="inherit" component="div">
              Tax:
            </Typography>
            -880
          </Box>
          <Divider />
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <div />
            2120
          </Box>
        </Stack>
      </CardContent>
    </StyledCard>
  );
};

export default IncomeWidget;
