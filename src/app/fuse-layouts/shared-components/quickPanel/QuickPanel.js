import FuseScrollbars from '@fuse/core/FuseScrollbars';
import { styled } from '@mui/material/styles';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Typography from '@mui/material/Typography';
import { ListSubheader, Divider, ListItem, ListItemText, List } from '@mui/material';
import format from 'date-fns/format';
import withReducer from 'app/store/withReducer';
import { Fragment, memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import reducer from './store';
import { getData } from './store/dataSlice';
import { toggleQuickPanel } from './store/stateSlice';

const StyledSwipeableDrawer = styled(SwipeableDrawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    width: 280,
  },
}));

function QuickPanel(props) {
  const dispatch = useDispatch();
  const data = useSelector(({ quickPanel }) => quickPanel.data);
  const state = useSelector(({ quickPanel }) => quickPanel.state);

  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);

  return (
    <StyledSwipeableDrawer
      open={state}
      anchor="right"
      onOpen={(ev) => {}}
      onClose={(ev) => dispatch(toggleQuickPanel())}
      disableSwipeToOpen
    >
      <FuseScrollbars>
        <ListSubheader component="div">Today</ListSubheader>

        <div className="mb-0 py-16 px-24">
          <Typography className="mb-12 text-32" color="textSecondary">
            {format(new Date(), 'eeee')}
          </Typography>
          <div className="flex">
            <Typography className="leading-none text-32" color="textSecondary">
              {format(new Date(), 'dd')}
            </Typography>
            <Typography className="leading-none text-16" color="textSecondary">
              th
            </Typography>
            <Typography className="leading-none text-32" color="textSecondary">
              {format(new Date(), 'MMMM')}
            </Typography>
          </div>
        </div>
        <Divider />
        <List>
          <ListSubheader component="div">Notes</ListSubheader>
          {data &&
            data.notes.map((note, key) => {
              return (
                <Fragment key={key}>
                  <ListItem>
                    <ListItemText
                      primary={note.title}
                      // secondary={format(new Date(note.time), 'EEE MMM do yyyy')}
                    />
                  </ListItem>
                  <Divider />
                </Fragment>
              );
            })}
        </List>
        <List>
          <ListSubheader component="div">Reminders For The Next 7 Days</ListSubheader>
          {data &&
            data.reminders.map((note, key) => {
              return (
                <Fragment key={key}>
                  <ListItem>
                    <ListItemText
                      primary={note.title}
                      secondary={`Due: ${format(new Date(note.reminder), 'EEE MMM do h:mm aaa')}`}
                    />
                  </ListItem>
                  <Divider />
                </Fragment>
              );
            })}
        </List>
      </FuseScrollbars>
    </StyledSwipeableDrawer>
  );
}

export default withReducer('quickPanel', reducer)(memo(QuickPanel));
