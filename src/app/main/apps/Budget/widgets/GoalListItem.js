import { styled } from '@mui/system';
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  IconButton,
  Typography,
  ButtonBase,
} from '@mui/material';
import { EditOutlined, DeleteOutline } from '@mui/icons-material';

const StyledCard = styled(Card)`
  width: 100%;
  border: 2px solid gray;
  border-radius: 10px;
`;

const StyledButtonBase = styled(ButtonBase)`
  width: 100%;
`;

function GoalListItem(props) {
  return (
    <StyledButtonBase>
      <StyledCard>
        <CardHeader
          sx={{
            borderBottom: '1px solid gray',
          }}
          action={
            <Box sx={{ display: 'flex' }}>
              <IconButton color="warning">
                <EditOutlined />
              </IconButton>
              <IconButton color="error">
                <DeleteOutline />
              </IconButton>
            </Box>
          }
          title="Test Goal" // make Dynamic
        />
      </StyledCard>
    </StyledButtonBase>
  );
}

export default GoalListItem;
