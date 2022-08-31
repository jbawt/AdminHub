import { styled } from '@mui/system';
import { useSelector } from 'react-redux';
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  List,
  ListItemButton,
  ListItemText,
  Divider,
} from '@mui/material';

const StyledCard = styled(Card)`
  width: 100%;
  height: 60%;
`;

function ExpenseMonthList() {
  const monthData = useSelector(({ budgetApp }) => budgetApp.expenses.monthList);

  return (
    <StyledCard raised>
      <CardHeader
        sx={{
          borderBottom: '1px solid gray',
        }}
        title="Expense Month"
        subheader={new Date(Date.now()).getFullYear()}
      />
      <CardContent>
        <List>
          {monthData.map((item, index) => {
            return (
              <Box key={index}>
                <ListItemButton alignItems="flex-start">
                  <ListItemText primary={item.month} />
                  <Box sx={{ display: 'flex', width: '50%' }}>
                    <ListItemText
                      primary={item.amount !== null ? `$${item.amount}` : 'No budget'}
                    />
                  </Box>
                </ListItemButton>
                <Divider />
              </Box>
            );
          })}
        </List>
      </CardContent>
    </StyledCard>
  );
}

export default ExpenseMonthList;
