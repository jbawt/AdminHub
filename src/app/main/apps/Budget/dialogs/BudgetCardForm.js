import { useDebounce } from '@fuse/hooks';
import _ from '@lodash';
import clsx from 'clsx';
import {
  AppBar,
  Avatar,
  Chip,
  DialogContent,
  DialogTitle,
  Icon,
  IconButton,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
  Autocomplete,
  Button,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateCard, closeCardDialog } from '../store/cardSlice';
import MembersMenu from './toolbar/MembersMenu';

function BudgetCardForm(props) {
  const dispatch = useDispatch();
  const cardData = useSelector(({ budgetApp }) => budgetApp.card.data);
  const members = useSelector(({ budgetApp }) => budgetApp.goals.users);
  const { register, watch, control, setValue } = useForm({
    mode: 'onSubmit',
    defaultValues: cardData,
  });
  const cardForm = watch();
  const [changeDisabled, setChangeDisabled] = useState(true);

  const updateCardData = useDebounce((goalId, newCard) => {
    dispatch(updateCard({ goalId, card: { ...newCard } }));
    dispatch(closeCardDialog());
  }, 600);

  useEffect(() => {
    if (!cardData) {
      return;
    }
    if (!_.isEqual(cardData, cardForm)) {
      setChangeDisabled(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardData, cardForm, updateCardData]);

  if (!cardData) {
    return null;
  }

  return (
    <>
      <DialogTitle component="div" className="p-0">
        <AppBar position="static" elevation={0}>
          <Toolbar className="flex w-full overflow-x-auto px-8 sm:px-16">
            <div className="flex flex-1">
              <Controller
                name="memberIds"
                control={control}
                defaultValue={null}
                render={({ field: { onChange, value } }) => (
                  <MembersMenu
                    onToggleMember={(memberId) => onChange(_.xor(value, [memberId]))}
                    members={members}
                    memberIds={value}
                  />
                )}
              />
            </div>
            <IconButton color="inherit" onClick={(_ev) => dispatch(closeCardDialog())} size="large">
              <Icon>close</Icon>
            </IconButton>
          </Toolbar>
        </AppBar>
      </DialogTitle>

      <DialogContent className="p-16 sm:p-24">
        <div className="flex items-center mb-24 mt-24">
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Name" variant="outlined" fullWidth required />
            )}
          />
        </div>

        <div className="flex items-center mb-24">
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
                required
              />
            )}
          />
        </div>

        <div className="flex flex-col sm:flex-row -mx-8">
          {cardForm.members && cardForm.members.length > 0 && (
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
                options={members}
                getOptionLabel={(member) => {
                  return `${member.first_name} ${member.last_name}`;
                }}
                value={cardForm.memberIds.map((id) => _.find(members, { id }))}
                onChange={(event, newValue) => {
                  setValue(
                    'memberIds',
                    newValue.map((item) => item.id)
                  );
                }}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => {
                    return (
                      <Chip
                        label={`${option.first_name} ${option.last_name}`}
                        {...getTagProps({ index })}
                        className={clsx('m-3', option.class)}
                        avatar={
                          <Tooltip title={`${option.first_name} ${option.last_name}`}>
                            <Avatar src={option.photourl} />
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

        <div className="w-full flex justify-around items-center">
          <Button variant="contained" color="error" onClick={() => dispatch(closeCardDialog())}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => updateCardData()}
            disabled={changeDisabled}
          >
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </>
  );
}

export default BudgetCardForm;
