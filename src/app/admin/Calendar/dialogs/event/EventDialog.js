import {useState} from "react"
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import * as yup from 'yup';
import _ from '@lodash';
import { Popover } from '@mui/material';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import EventLabelSelect from '../../EventLabelSelect';

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  title: yup.string().required('You must enter a title'),
});

function EventDialog(props) {
  const { reset, formState, watch, control, getValues } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

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

  /**
   * Remove Event
   */
  function handleRemove() {}

  return (
    <Popover
      open={dialogState}
      anchorReference="anchorPosition"
      anchorOrigin={{
        vertical: 'center',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'center',
        horizontal: 'left',
      }}
      anchorPosition={{
        top: 350,
        left: 150,
      }}
      // onClose={closeComposeDialog}
      component="form"
    >
      <div className="flex flex-col max-w-full p-24 pt-32 sm:pt-40 sm:p-32 w-480">
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
            heroicons-outline:tag
          </FuseSvgIcon>

          <Controller
            name="extendedProps.label"
            control={control}
            render={({ field }) => <EventLabelSelect className="mt-8 mb-16" {...field} />}
          />
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
          <IconButton onClick={handleRemove} size="large">
            <FuseSvgIcon>heroicons-outline:trash</FuseSvgIcon>
          </IconButton>
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
    </Popover>
  );
}

export default EventDialog;
