import { useDebounce } from '@fuse/hooks';
import _ from '@lodash';
import { DateTimePicker } from '@mui/lab';
import clsx from 'clsx';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import List from '@mui/material/List';
import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';
import format from 'date-fns/format';
import { Controller, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Switch } from '@mui/material';
import {
  closeCardDialog,
  removeCard,
  updateCard,
  deleteAttachment,
  attachmentCover,
  removeAttachmentCover,
  subscribeToCard,
} from '../../../store/cardSlice';
import CardActivity from './activity/CardActivity';
import CardAttachment from './attachment/CardAttachment';
import CardChecklist from './checklist/CardChecklist';
import CardComment from './comment/CardComment';
import CheckListMenu from './toolbar/CheckListMenu';
import DueMenu from './toolbar/DueMenu';
import LabelsMenu from './toolbar/LabelsMenu';
import MembersMenu from './toolbar/MembersMenu';
import OptionsMenu from './toolbar/OptionsMenu';
import AttachmentMenu from './toolbar/AttachmentMenu';

function BoardCardForm(props) {
  const dispatch = useDispatch();
  const card = useSelector(({ scrumboardApp }) => scrumboardApp.card.data);
  const board = useSelector(({ scrumboardApp }) => scrumboardApp.board);
  const { register, watch, control, setValue } = useForm({ mode: 'onSubmit', defaultValues: card });
  const cardForm = watch();
  const [changeDisabled, setChangeDisabled] = useState(true);

  const updateCardData = useDebounce((boardId, newCard) => {
    dispatch(updateCard({ boardId, card: { ...newCard } }));
    dispatch(closeCardDialog());
  }, 600);

  const removeAttachment = useDebounce((attachmentId) => {
    dispatch(deleteAttachment({ attachmentId, cardId: card.id }));
  }, 600);

  const makeCover = useDebounce((attachmentId) => {
    dispatch(attachmentCover({ attachmentId, cardId: card.id }));
  }, 600);

  const removeCover = useDebounce(() => {
    dispatch(removeAttachmentCover({ cardId: card.id }));
  }, 600);

  const list = card ? _.find(board.lists, (_list) => _list.idCards.includes(card.id)) : null;

  useEffect(() => {
    if (!card) {
      return;
    }
    if (!_.isEqual(card, cardForm)) {
      setChangeDisabled(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [board.id, card, cardForm, updateCardData]);

  useEffect(() => {
    register('idAttachmentCover');
  }, [register]);

  if (!card) {
    return null;
  }

  return (
    <>
      <DialogTitle component="div" className="p-0">
        <AppBar position="static" elevation={0}>
          <Toolbar className="flex w-full overflow-x-auto px-8 sm:px-16">
            <div className="flex flex-1">
              <Controller
                name="due"
                control={control}
                defaultValue={null}
                render={({ field: { onChange, value } }) => (
                  <DueMenu onDueChange={onChange} onRemoveDue={() => onChange(null)} due={value} />
                )}
              />

              <Controller
                name="idLabels"
                control={control}
                defaultValue={[]}
                render={({ field: { onChange, value } }) => (
                  <LabelsMenu
                    onToggleLabel={(labelId) => onChange(_.xor(value, [labelId]))}
                    labels={board.labels}
                    idLabels={value}
                  />
                )}
              />

              <Controller
                name="idMembers"
                control={control}
                defaultValue={[]}
                render={({ field: { onChange, value } }) => (
                  <MembersMenu
                    onToggleMember={(memberId) => onChange(_.xor(value, [memberId]))}
                    members={board.members}
                    idMembers={value}
                  />
                )}
              />

              <Controller
                name="attachments"
                control={control}
                defaultValue={[]}
                render={({ field: { onChange, value } }) => (
                  <AttachmentMenu onChange={(val) => onChange([...cardForm.attachments, val])} />
                )}
              />

              <Controller
                name="checklists"
                control={control}
                defaultValue={[]}
                render={({ field: { onChange, value } }) => (
                  <CheckListMenu
                    onAddCheckList={(newList) => onChange([...cardForm.checklists, newList])}
                  />
                )}
              />

              <OptionsMenu
                onRemoveCard={() =>
                  dispatch(removeCard({ boardId: board.id, cardId: cardForm.id }))
                }
              />
            </div>
            <Tooltip title="Subscribe">
              <IconButton
                color="inherit"
                onClick={() =>
                  dispatch(
                    subscribeToCard({
                      cardId: card.id,
                      subscribed: !card.subscribed,
                      boardId: board.id,
                    })
                  )
                }
              >
                <Icon>remove_red_eye</Icon>
              </IconButton>
            </Tooltip>
            <Switch
              onChange={() => {
                dispatch(
                  subscribeToCard({
                    cardId: card.id,
                    subscribed: !card.subscribed,
                    boardId: board.id,
                  })
                );
              }}
              checked={card.subscribed}
            />
            <IconButton color="inherit" onClick={(ev) => dispatch(closeCardDialog())} size="large">
              <Icon>close</Icon>
            </IconButton>
          </Toolbar>
        </AppBar>
      </DialogTitle>

      <DialogContent className="p-16 sm:p-24">
        <div className="flex flex-col sm:flex-row sm:justify-between justify-center items-center my-24">
          <div className="mb-16 sm:mb-0 flex items-center">
            <Typography>{board.name}</Typography>

            <Icon className="text-20" color="inherit">
              chevron_right
            </Icon>

            <Typography>{list && list.name}</Typography>
          </div>
          {cardForm.due && (
            <DateTimePicker
              value={format(new Date(cardForm.due), 'Pp')}
              inputFormat="Pp"
              onChange={(val) => setValue('due', val.toISOString())}
              renderInput={(_props) => (
                <TextField
                  label="Due date"
                  placeholder="Choose a due date"
                  className="w-full sm:w-auto"
                  {..._props}
                />
              )}
            />
          )}
        </div>

        <div className="flex items-center mb-24">
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Title"
                type="text"
                variant="outlined"
                fullWidth
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      {card.subscribed && (
                        <Icon className="text-20" color="action">
                          remove_red_eye
                        </Icon>
                      )}
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
        </div>

        <div className="w-full mb-24">
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Description"
                multiline
                rows="4"
                variant="outlined"
                fullWidth
              />
            )}
          />
        </div>

        <div className="flex flex-col sm:flex-row -mx-8">
          {cardForm.idLabels && cardForm.idLabels.length > 0 && (
            <div className="flex-1 mb-24 mx-8">
              <div className="flex items-center mt-16 mb-12">
                <Icon className="text-20" color="inherit">
                  label
                </Icon>
                <Typography className="font-semibold text-16 mx-8">Labels</Typography>
              </div>
              <Autocomplete
                className="mt-8 mb-16"
                multiple
                freeSolo
                options={board.labels}
                getOptionLabel={(label) => {
                  return label.name;
                }}
                value={cardForm.idLabels.map((id) => _.find(board.labels, { id }))}
                onChange={(event, newValue) => {
                  setValue(
                    'idLabels',
                    newValue.map((item) => item.id)
                  );
                }}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => {
                    return (
                      <Chip
                        label={option.name}
                        {...getTagProps({ index })}
                        className={clsx('m-3', option.class)}
                      />
                    );
                  })
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Select multiple Labels"
                    label="Labels"
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                )}
              />
            </div>
          )}

          {cardForm.idMembers && cardForm.idMembers.length > 0 && (
            <div className="flex-1 mb-24 mx-8">
              <div className="flex items-center mt-16 mb-12">
                <Icon className="text-20" color="inherit">
                  supervisor_account
                </Icon>
                <Typography className="font-semibold text-16 mx-8">Members</Typography>
              </div>
              <Autocomplete
                className="mt-8 mb-16"
                multiple
                freeSolo
                options={board.members}
                getOptionLabel={(member) => {
                  return member.name;
                }}
                value={cardForm.idMembers.map((id) => _.find(board.members, { id }))}
                onChange={(event, newValue) => {
                  setValue(
                    'idMembers',
                    newValue.map((item) => item.id)
                  );
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
        </div>

        {cardForm.attachments && cardForm.attachments.length > 0 && (
          <div className="mb-24">
            <div className="flex items-center mt-16 mb-12">
              <Icon className="text-20" color="inherit">
                attachment
              </Icon>
              <Typography className="font-semibold text-16 mx-8">Attachments</Typography>
            </div>
            <div className="flex flex-col sm:flex-row flex-wrap -mx-16">
              {cardForm.attachments.map((item, key) => (
                <CardAttachment
                  item={item}
                  card={cardForm}
                  makeCover={makeCover}
                  removeCover={removeCover}
                  removeAttachment={(attachmentId) => {
                    removeAttachment(attachmentId);
                    setValue(
                      'attachments',
                      _.reject(cardForm.attachments, { attachment_id: item.attachment_id })
                    );
                  }}
                  key={key}
                />
              ))}
            </div>
          </div>
        )}

        {cardForm.checklists &&
          cardForm.checklists.map((checklist, index) => (
            <CardChecklist
              key={checklist.id}
              checklist={checklist}
              index={index}
              onCheckListChange={(item, itemIndex) => {
                setValue('checklists', _.setIn(cardForm.checklists, `[${itemIndex}]`, item));
              }}
              onRemoveCheckList={() => {
                setValue('checklists', _.reject(cardForm.checklists, { id: checklist.id }));
              }}
            />
          ))}

        <div className="mb-24">
          <div className="flex items-center mt-16 mb-12">
            <Icon className="text-20" color="inherit">
              comment
            </Icon>
            <Typography className="font-semibold text-16 mx-8">Comment</Typography>
          </div>
          <div>
            <CardComment
              members={board.members}
              onCommentAdd={(comment) => setValue('activities', [comment, ...cardForm.activities])}
            />
          </div>
        </div>

        <Controller
          name="activities"
          control={control}
          defaultValue={[]}
          render={({ field: { onChange, value } }) => (
            <div>
              {value.length > 0 && (
                <div className="mb-24">
                  <div className="flex items-center mt-16">
                    <Icon className="text-20" color="inherit">
                      list
                    </Icon>
                    <Typography className="font-semibold text-16 mx-8">Activity</Typography>
                  </div>
                  <List className="">
                    {value.map((item, key) => (
                      <CardActivity item={item} key={key} members={board.members} />
                    ))}
                  </List>
                </div>
              )}
            </div>
          )}
        />
        <div className="w-full flex justify-around items-center">
          <Button variant="contained" color="error" onClick={() => dispatch(closeCardDialog())}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => updateCardData(board.id, cardForm)}
            disabled={changeDisabled}
          >
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </>
  );
}

export default BoardCardForm;
