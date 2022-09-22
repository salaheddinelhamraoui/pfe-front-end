import { useState } from 'react';
import { useParams } from 'react-router-dom';
import _ from '@lodash';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { showMessage } from 'app/store/fuse/messageSlice';

const schema = yup.object().shape({
  name: yup.string().required('You must enter a title'),
});

const Informations = (props) => {
  const defaultValues = {
    name: props.projectData.project_name,
    desc: props.projectData.description,
  };

  console.log(props.projectData.freelancer_id);
  const { reset, formState, watch, control, getValues } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { id } = useParams();

  const dispatch = useDispatch();

  const [submitState, setSubmitState] = useState(false);

  const { isValid, dirtyFields, errors } = formState;

  const name = watch('name');
  const desc = watch('desc');

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitState(true);
    axios
      .patch(`${process.env.REACT_APP_API_URL}/updateProject/${id}`, {
        name,
        desc,
      })
      .then((res) => {
        dispatch(showMessage({ message: 'Project Updated Successfully' }));
      })
      .catch((err) => {
        console.log(err);
        dispatch(showMessage({ message: 'Failed To Update' }));
      });
  };

  return (
    <div className="w-full px-24 w-full mt-20">
      <Paper className="shadow flex rounded-2xl overflow-hidden p-24">
        <div className="mx-auto">
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                className="mt-8 mb-16"
                error={!!errors.name}
                required
                helperText={errors?.name?.message}
                label="Title"
                autoFocus
                id="name"
                variant="outlined"
                fullWidth
              />
            )}
          />
          <Controller
            name="freelancer"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                className="mt-8 mb-16"
                error={!!errors.name}
                required
                helperText={errors?.name?.message}
                label="Freelancer"
                autoFocus
                disabled
                id="freelancer"
                variant="outlined"
                fullWidth
                value={props.projectData.freelancer_id.data.displayName}
              />
            )}
          />
          <Controller
            name="company"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                className="mt-8 mb-16"
                error={!!errors.name}
                required
                helperText={errors?.name?.message}
                label="Company"
                autoFocus
                disabled
                id="company"
                variant="outlined"
                fullWidth
                value={props.projectData.company_id.data.displayName}
              />
            )}
          />
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
          <div className="flex items-center space-x-8">
            <div className="flex flex-1" />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              disabled={_.isEmpty(dirtyFields) || !isValid || submitState}
            >
              Save
            </Button>
          </div>
        </div>
      </Paper>
    </div>
  );
};

export default Informations;
