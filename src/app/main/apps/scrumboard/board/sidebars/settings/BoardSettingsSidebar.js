import clsx from 'clsx';
import _ from '@lodash';
import AppBar from '@mui/material/AppBar';
import Icon from '@mui/material/Icon';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import ListItemText from '@mui/material/ListItemText';
import Switch from '@mui/material/Switch';
import Toolbar from '@mui/material/Toolbar';
import {
  Typography,
  Autocomplete,
  Chip,
  Tooltip,
  Avatar,
  TextField,
  Divider,
  IconButton,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Fragment } from 'react';
import BoardAddLabel from '../BoardAddLabel';
import {
  deleteBoard,
  // copyBoard,
  changeBoardSettings,
  updateMembers,
  removeLabel,
} from '../../../store/boardSlice';

function BoardSettingsSidebar(props) {
  const dispatch = useDispatch();
  const board = useSelector(({ scrumboardApp }) => scrumboardApp.board);
  const loggedInUser = useSelector(({ auth }) => auth.user);

  const deleteLabel = (boardId, labelId) => {
    const labelInfo = {
      boardId,
      labelId,
    };
    dispatch(removeLabel(labelInfo));
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar className="flex w-full justify-center">
          <Icon className="text-20" color="inherit">
            developer_board
          </Icon>
          <Typography className="font-semibold text-16 mx-8">Manage Board</Typography>
        </Toolbar>
      </AppBar>

      <List className="py-16" dense>
        <div className="flex-1 mb-24 mx-8">
          <div className="flex items-center mt-16 ml-11 mb-12">
            <Icon className="text-20" color="inherit">
              tune
            </Icon>
            <Typography className="font-semibold text-16 mx-8">Options</Typography>
          </div>
          <ListItem
            button
            onClick={() =>
              dispatch(changeBoardSettings({ cardCoverImages: !board.settings.cardCoverImages }))
            }
          >
            <ListItemIcon className="min-w-40">
              <Icon>photo</Icon>
            </ListItemIcon>
            <ListItemText primary="Card Cover Images" />
            <ListItemSecondaryAction>
              <Switch
                onChange={() =>
                  dispatch(
                    changeBoardSettings({ cardCoverImages: !board.settings.cardCoverImages })
                  )
                }
                checked={board.settings.cardCoverImages}
              />
            </ListItemSecondaryAction>
          </ListItem>

          <ListItem
            button
            onClick={() =>
              dispatch(changeBoardSettings({ subscribed: !board.settings.subscribed }))
            }
          >
            <ListItemIcon className="min-w-40">
              <Icon>remove_red_eye</Icon>
            </ListItemIcon>
            <ListItemText primary="Subscribe" />
            <ListItemSecondaryAction>
              <Switch
                onChange={() =>
                  dispatch(changeBoardSettings({ subscribed: !board.settings.subscribed }))
                }
                checked={board.settings.subscribed}
              />
            </ListItemSecondaryAction>
          </ListItem>

          {/* <ListItem button onClick={() => dispatch(copyBoard(board))}>
            <ListItemIcon className="min-w-40">
              <Icon>file_copy</Icon>
            </ListItemIcon>
            <ListItemText primary="Copy Board" />
          </ListItem> */}

          <ListItem button onClick={() => dispatch(deleteBoard(board.id))}>
            <ListItemIcon className="min-w-40">
              <Icon>delete</Icon>
            </ListItemIcon>
            <ListItemText primary="Delete Board" />
          </ListItem>
        </div>
        <Divider />
        <ListItem>
          {board.users && loggedInUser.role === 'admin' && (
            <div className="flex-1 mb-24 mx-8">
              <div className="flex items-center mt-16 mb-12">
                <Icon className="text-20" color="inherit">
                  supervisor_account
                </Icon>
                <Typography className="font-semibold text-16 mx-8">Add Members</Typography>
              </div>
              <Autocomplete
                className="mt-8 mb-16"
                multiple
                freeSolo
                options={board.users}
                getOptionLabel={(user) => {
                  return user.name;
                }}
                value={board.members.map((member) => _.find(board.users, { id: member.id }))}
                onChange={(event, newMembers) => {
                  dispatch(updateMembers({ newMembers, boardId: board.id }));
                }}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => {
                    return (
                      <Chip
                        label={option.name}
                        {...getTagProps({ index })}
                        className={clsx('m-3', option.class)}
                        avatar={
                          <Tooltip title={option.name}>
                            <Avatar src={option.avatar} />
                          </Tooltip>
                        }
                      />
                    );
                  })
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Select multiple Members"
                    label="Members"
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                )}
              />
            </div>
          )}
        </ListItem>
        <Divider />
        <ListItem>
          <div className="flex-1 mb-24 mx-8">
            <div className="flex items-center mt-16 mb-12">
              <ListItemIcon className="min-w-40">
                <Icon className="text-20" color="inherit">
                  labels
                </Icon>
              </ListItemIcon>
              <Typography className="font-semibold text-16 mx-8">Edit Labels</Typography>
            </div>
            <List className="py-16" dense>
              {board.labels.map((label, key) => {
                return (
                  <Fragment key={key}>
                    <ListItem>
                      <ListItemText primary={label.name} />
                      <div className={clsx(label.class, 'w-32  h-10 rounded-6 mx-4 mb-1')} />
                      <ListItemIcon className="min-w-40">
                        <Tooltip title="Remove Label" placement="left">
                          <IconButton onClick={() => deleteLabel(board.id, label.id)} color="error">
                            <Icon>delete</Icon>
                          </IconButton>
                        </Tooltip>
                      </ListItemIcon>
                    </ListItem>
                    <Divider />
                  </Fragment>
                );
              })}
              <BoardAddLabel />
            </List>
          </div>
        </ListItem>
      </List>
    </div>
  );
}

export default BoardSettingsSidebar;
