import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { memo } from 'react';

function Widget3(props) {
  const navigate = useNavigate();

  const goToOverDue = () => {
    navigate('/apps/todo/overdue');
  };

  return (
    <Paper className="w-full rounded-20 shadow flex flex-col justify-between">
      <div className="flex items-center justify-between px-4 pt-8">
        <Typography className="text-16 px-16 font-medium" color="textSecondary">
          {props.widget.title}
        </Typography>
        <IconButton onClick={goToOverDue} aria-label="more" size="large">
          <Icon>arrow_forward</Icon>
        </IconButton>
      </div>
      <div className="text-center py-12">
        <Typography className="text-72 font-semibold leading-none text-red tracking-tighter">
          {props.widget.data.count}
        </Typography>
        <Typography className="text-18 font-normal text-red-800">
          {props.widget.data.name}
        </Typography>
      </div>
      <Typography
        className="p-20 pt-0 h-56 flex justify-center items-end text-13 font-medium"
        color="textSecondary"
      >
        <span className="truncate">{props.widget.data.extra.name}</span>:
        <b className="px-8">{props.widget.data.extra.count}</b>
      </Typography>
    </Paper>
  );
}

export default memo(Widget3);
