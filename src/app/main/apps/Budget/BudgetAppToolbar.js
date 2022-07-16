import { AppBar, Toolbar, Box, Typography, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const BudgetAppToolbar = (props) => {
  return (
    <Box sx={{ flexGrow: 0.5 }}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" component="div">
            Budgets
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default BudgetAppToolbar;
