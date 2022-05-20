import clsx from 'clsx';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import _ from '@lodash';
import { Select, MenuItem, Tooltip, InputLabel } from '@mui/material';
import { addLabel } from './store/labelsSlice';

const defaultValues = {
  title: '',
  color: '',
};

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  title: yup.string().required('You must enter a title'),
  color: yup.string().required('You must pick a color'),
});

function TodoAddLabel(props) {
  const dispatch = useDispatch();

  const [formOpen, setFormOpen] = useState(false);
  const { control, formState, handleSubmit, reset } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;

  useEffect(() => {
    if (!formOpen) {
      reset(defaultValues);
    }
  }, [formOpen, reset]);

  function handleOpenForm(ev) {
    ev.stopPropagation();
    setFormOpen(true);
  }

  function handleCloseForm() {
    setFormOpen(false);
  }

  function onSubmit(data) {
    const handle = data.title.toLowerCase().replace(' ', '-');
    data.handle = handle;
    dispatch(addLabel(data));
    handleCloseForm();
  }

  return (
    <div className="w-full border-t-1">
      {formOpen ? (
        <form className="p-16" onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <TextField
                className="mb-16"
                fullWidth
                variant="outlined"
                label="Name"
                required
                {...field}
              />
            )}
          />

          <Controller
            name="color"
            control={control}
            render={({ field }) => (
              <>
                <InputLabel id="color">Select a Color *</InputLabel>
                <Select
                  {...field}
                  id="color"
                  labelId="color"
                  name="color"
                  className="mb-16"
                  variant="filled"
                  defaultValue="#4CAF50"
                  fullWidth
                >
                  <MenuItem value="#4CAF50">
                    <div
                      className={clsx(
                        'bg-green text-black w-full h-20 rounded-6 mx-4 mb-6 flex justify-center items-center'
                      )}
                    >
                      Green
                    </div>
                  </MenuItem>
                  <MenuItem value="#2196F3">
                    <div
                      className={clsx(
                        'bg-blue text-black w-full h-20 rounded-6 mx-4 mb-6 flex justify-center items-center'
                      )}
                    >
                      Blue
                    </div>
                  </MenuItem>
                  <MenuItem value="#FF9800">
                    <div
                      className={clsx(
                        'bg-orange text-black w-full h-20 rounded-6 mx-4 mb-6 flex justify-center items-center'
                      )}
                    >
                      Orange
                    </div>
                  </MenuItem>
                  <MenuItem value="#9C27B0">
                    <div
                      className={clsx(
                        'bg-purple text-black w-full h-20 rounded-6 mx-4 mb-6 flex justify-center items-center'
                      )}
                    >
                      Purple
                    </div>
                  </MenuItem>
                  <MenuItem value="#F44336">
                    <div
                      className={clsx(
                        'bg-red text-black w-full h-20 rounded-6 mx-4 mb-6 flex justify-center items-center'
                      )}
                    >
                      Red
                    </div>
                  </MenuItem>
                  <MenuItem value="#FFEB3B">
                    <div
                      className={clsx(
                        'bg-yellow text-black w-full h-20 rounded-6 mx-4 mb-6 flex justify-center items-center'
                      )}
                    >
                      Yellow
                    </div>
                  </MenuItem>
                </Select>
              </>
            )}
          />

          <div className="flex justify-between items-center">
            <Button onClick={handleCloseForm} variant="contained" color="error">
              Cancel
            </Button>
            <Button
              variant="contained"
              color="secondary"
              type="submit"
              disabled={_.isEmpty(dirtyFields) || !isValid}
            >
              Add
            </Button>
          </div>
        </form>
      ) : (
        <Tooltip title="Add Label">
          <IconButton onClick={handleOpenForm} sx={{ ml: 10, mt: 2 }} color="secondary">
            <Icon fontSize="large">add_circle</Icon>
          </IconButton>
        </Tooltip>
      )}
    </div>
  );
}

export default TodoAddLabel;
