import Paper from '@mui/material/Paper';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import _ from '@lodash';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from 'app/store/userSlice';
import axios from 'axios';
import { showMessage } from 'app/store/fuse/messageSlice';
import { useParams, useNavigate } from 'react-router-dom';

const schema = yup.object().shape({
  title: yup.string().required('You must enter a title'),
});

const NewSession = () => {
  const defaultValues = {
    date: new Date(),
    endDate: '',
    title: '',
    desc: '',
  };

  const { reset, formState, watch, control, getValues } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  const user = useSelector(selectUser);

  const { id } = useParams();

  const [loadingState, setLoadingState] = useState(false);

  const dispatch = useDispatch();

  const [dialogState, setDialogState] = useState(true);

  const { isValid, dirtyFields, errors } = formState;

  const date = watch('date');
  const title = watch('title');
  const description = watch('desc');
  const endDate = watch('endDate');

  /**
   * Form Submit
   */
  function onSubmit(ev) {
    ev.preventDefault();
    setLoadingState(true);
    console.log(endDate);
    axios
      .post(`${process.env.REACT_APP_API_URL}/addSession`, {
        creator_id: user._id,
        project_id: id,
        title,
        description,
        date,
        end_date: endDate,
      })
      .then(() => {
        dispatch(showMessage({ message: 'Session added successfully' }));
        setLoadingState(false);
        reset({
          start: null,
          title: '',
          description: '',
        });
        navigate('/calendar-admin');
      })
      .catch((err) => {
        console.log(err);
        dispatch(showMessage({ message: 'Failed to add the session' }));
        setLoadingState(false);
      });
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
                  name="date"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <DateTimePicker
                      value={value}
                      onChange={onChange}
                      renderInput={(_props) => (
                        <TextField label="Date" className="mt-8 mb-16 w-full" {..._props} />
                      )}
                      className="mt-8 mb-16 w-full"
                      // maxDate={end}
                    />
                  )}
                />
              </div>
            </div>
          </div>
          <div className="flex sm:space-x-24 mb-16">
            <FuseSvgIcon className="hidden sm:inline-flex mt-16" color="action">
              heroicons-outline:calendar
            </FuseSvgIcon>
            <div className="w-full">
              <div className="flex flex-column sm:flex-row w-full items-center space-x-16">
                <Controller
                  name="endDate"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <DateTimePicker
                      value={value}
                      onChange={onChange}
                      renderInput={(_props) => (
                        <TextField label="endDate" className="mt-8 mb-16 w-full" {..._props} />
                      )}
                      className="mt-8 mb-16 w-full"
                      // maxDate={end}
                      minDate={date}
                      maxDate={new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1)}
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
              name="desc"
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
              disabled={_.isEmpty(dirtyFields) || !isValid || loadingState}
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
