import { AppBar, Toolbar, Box, Typography } from '@mui/material';

const BudgetAppToolbar = (props) => {
  return (
    <Box sx={{ flexGrow: 0.5 }}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit" component="div" sx={{ ml: 10 }}>
            Budget
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default BudgetAppToolbar;
