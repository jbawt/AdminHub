import Icon from '@mui/material/Icon';
import { DateTimePicker } from '@mui/lab';
import TextField from '@mui/material/TextField';

function NoteFormReminder(props) {
  const reminder = new Date(props.reminder);
  const validDate = reminder >= new Date(Date.now()) ? reminder : new Date(Date.now());
  return (
    <DateTimePicker
      clearable
      showTodayButton
      disablePast
      value={validDate}
      onChange={props.onChange}
      renderInput={(_props) => (
        <TextField
          sx={{
            '@media (min-width: 780px)': {
              '& .MuiInputAdornment-root': {
                minWidth: 40,
                minHeight: 40,
                m: 0,
              },
              '& .MuiOutlinedInput-notchedOutline': {
                display: 'none',
              },
              '& .MuiInputBase-input': {
                position: 'absolute',
                pointerEvents: 'none',
                visibility: 'hidden',
              },
            },
            '& .MuiInputAdornment-root': {
              minHeight: 40,
              minWidth: 40,
              m: 0,
            },
          }}
          {..._props}
        />
      )}
      components={{ OpenPickerIcon: () => <Icon fontSize="small">notifications_active</Icon> }}
    />
  );
}

export default NoteFormReminder;
