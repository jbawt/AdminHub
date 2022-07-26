import { useState } from 'react';
import { AppBar, Toolbar, Box, Typography, Tab, Tabs } from '@mui/material';

const BudgetAppToolbar = (props) => {
  const [tabValue, setTabValue] = useState(0);

  return (
    <Box sx={{ flexGrow: 1, mb: 0 }}>
      <AppBar position="static">
        <Toolbar variant="regular" sx={{ display: 'flex', justifyContent: 'space-around' }}>
          <Typography variant="h6" color="inherit" component="div">
            Budget Planner
          </Typography>
          <Tabs
            value={tabValue}
            onChange={(_ev, value) => setTabValue(value)}
            indicatorColor="secondary"
            textColor="inherit"
            variant="scrollable"
            scrollButtons={false}
            className="-mx-4 min-h-40"
            classes={{ indicator: 'flex justify-center bg-transparent w-full h-full' }}
            TabIndicatorProps={{
              children: (
                <Box
                  sx={{ bgcolor: 'text.disabled' }}
                  className="w-full h-full rounded-full opacity-20"
                />
              ),
            }}
          >
            <Tab
              key={0}
              label="Overview"
              disableRipple
              className="text-14 font-semibold min-h-40 min-w-64 mx-4 px-12"
            />
            <Tab
              key={1}
              label="Manage Budget"
              disableRipple
              className="text-14 font-semibold min-h-40 min-w-64 mx-4 px-12"
            />
          </Tabs>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default BudgetAppToolbar;
