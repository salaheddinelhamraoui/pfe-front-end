import { useState, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from 'app/store/userSlice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import FuseLoading from '@fuse/core/FuseLoading';
import { showMessage } from 'app/store/fuse/messageSlice';

const schema = yup.object().shape({
  title: yup.string().required('You must enter a title'),
});

const UpdateSession = ({ selectedSessionId, handleSelectedSessionId, handleClose }) => {
  const [data, setData] = useState();

  const defaultValues = {
    date: '',
    title: '',
    desc: '',
    endDate: '',
  };

  const { reset, formState, watch, control, getValues } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  const user = useSelector(selectUser);

  const [loadingState, setLoadingState] = useState(false);

  const dispatch = useDispatch();

  const { isValid, dirtyFields, errors } = formState;

  const date = watch('date');
  const title = watch('title');
  const description = watch('desc');
  const endDate = watch('endDate');

  useEffect(() => {
    setLoadingState(true);
    if (selectedSessionId) {
      axios
        .get(`${process.env.REACT_APP_API_URL}/findSession/${selectedSessionId}`)
        .then((res) => {
          reset({
            title: res.data.result.title,
            desc: res.data.result.description,
            date: res.data.result.date,
            endDate: res.data.result.end_date,
          });

          setData(res.data.result);
          setLoadingState(false);
        })
        .catch((err) => {
          console.log(err);
          setLoadingState(false);
        });
    }
  }, [selectedSessionId]);

  /**
   * Form Submit
   */

  const onSubmit = () => {
    console.log(selectedSessionId);
    axios
      .patch(`${process.env.REACT_APP_API_URL}/updateSession/${selectedSessionId}`, {
        title,
        description,
        date,
        endDate,
      })
      .then(() => {
        dispatch(showMessage({ message: 'Session updated successfully' }));
        setLoadingState(false);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        dispatch(showMessage({ message: 'Failed to update the session' }));
        setLoadingState(false);
      });
  };

  if (loadingState) {
    return <FuseLoading />;
  }

  return (
    <div className="w-full px-24 w-full mt-20">
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
          <Button variant="contained" color="primary" onClick={onSubmit} disabled={loadingState}>
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UpdateSession;
