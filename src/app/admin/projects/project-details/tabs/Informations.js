import { useState } from 'react';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
  name: yup.string().required('You must enter a title'),
});

const Informations = (props) => {
  const { reset, formState, watch, control, getValues } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const [dialogState, setDialogState] = useState(true);

  const { isValid, dirtyFields, errors } = formState;

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
                value="Salaheddin El Hamraoui"
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
                value="Freelancer X"
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
                value="Company X"
              />
            )}
          />
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
      </Paper>
    </div>
  );
};

export default Informations;
