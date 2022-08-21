import Paper from '@mui/material/Paper';
import { useState, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import _ from '@lodash';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';

const schema = yup.object().shape({
  title: yup.string().required('You must enter a title'),
});

const NewSession = () => {
  const { reset, formState, watch, control, getValues } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();

  const [dialogState, setDialogState] = useState(true);

  const { isValid, dirtyFields, errors } = formState;

  const start = watch('start');
  const end = watch('end');
  const id = watch('id');

  /**
   * Form Submit
   */
  function onSubmit(ev) {
    ev.preventDefault();
  }
  return (
    <div className="w-full px-24 w-full mt-20">
      <Paper className="shadow rounded-2xl overflow-hidden p-24 flex">
        <div className="mx-auto flex flex-col max-w-full p-24 pt-32 sm:pt-40 sm:p-32 w-480">
          <div className="flex sm:space-x-24 mb-16">
            <FuseSvgIcon className="hidden sm:inline-flex mt-16" color="action">
              heroicons-outline:pencil-alt
            </FuseSvgIcon>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  id="title"
                  label="Title"
                  className="flex-auto"
                  error={!!errors.title}
                  helperText={errors?.title?.message}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                  autoFocus
                  required
                  fullWidth
                />
              )}
            />
          </div>

          <div className="flex sm:space-x-24 mb-16">
            <FuseSvgIcon className="hidden sm:inline-flex mt-16" color="action">
              heroicons-outline:calendar
            </FuseSvgIcon>
            <div className="w-full">
              <div className="flex flex-column sm:flex-row w-full items-center space-x-16">
                <Controller
                  name="start"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <DateTimePicker
                      value={value}
                      onChange={onChange}
                      renderInput={(_props) => (
                        <TextField label="Start" className="mt-8 mb-16 w-full" {..._props} />
                      )}
                      className="mt-8 mb-16 w-full"
                      maxDate={end}
                    />
                  )}
                />

                <Controller
                  name="end"
                  control={control}
                  defaultValue=""
                  render={({ field: { onChange, value } }) => (
                    <DateTimePicker
                      value={value}
                      onChange={onChange}
                      renderInput={(_props) => (
                        <TextField label="End" className="mt-8 mb-16 w-full" {..._props} />
                      )}
                      minDate={start}
                    />
                  )}
                />
              </div>
            </div>
          </div>
          <div className="flex sm:space-x-24 mb-16">
            <FuseSvgIcon className="hidden sm:inline-flex mt-16" color="action">
              heroicons-outline:menu-alt-2
            </FuseSvgIcon>

            <Controller
              name="extendedProps.desc"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mt-8 mb-16"
                  id="desc"
                  label="Description"
                  type="text"
                  multiline
                  rows={5}
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </div>

          <div className="flex items-center space-x-8">
            <div className="flex flex-1" />
            <Button
              variant="contained"
              color="primary"
              onClick={onSubmit}
              disabled={_.isEmpty(dirtyFields) || !isValid}
            >
              Save
            </Button>
          </div>
        </div>
      </Paper>
    </div>
  );
};

export default NewSession;
