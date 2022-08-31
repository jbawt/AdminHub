import { AppBar, Toolbar, Box, Typography } from '@mui/material';

const BudgetAppToolbar = (props) => {
  return (
    <Box sx={{ flexGrow: 1, mb: 0 }}>
      <AppBar position="static">
        <Toolbar variant="regular" sx={{ display: 'flex', justifyContent: 'space-around' }}>
          <Typography variant="h6" color="inherit" component="div">
            Budget Planner
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default BudgetAppToolbar;
