import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Controller, useFormContext } from "react-hook-form";

function BasicInfoTab(props) {
  const methods = useFormContext();
  const { control, formState } = methods;
  const { errors } = formState;

  return (
    <div>
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
            label="Name"
            autoFocus
            id="name"
            variant="outlined"
            fullWidth
            value={"Salaheddin El Hamraoui"}
          />
        )}
      />
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            error={!!errors.name}
            required
            helperText={errors?.name?.message}
            label="Email"
            autoFocus
            id="Email"
            variant="outlined"
            fullWidth
            value={"salah.infospace@gmail.com"}
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            error={!!errors.name}
            required
            helperText={errors?.name?.message}
            label="New Password"
            autoFocus
            id="password"
            variant="outlined"
            fullWidth
            value={"kmdskjdskfjlkds"}
            type="password"
          />
        )}
      />
      <Controller
        name="confirm_password"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            error={!!errors.name}
            required
            helperText={errors?.name?.message}
            label="Confirm Password"
            autoFocus
            id="confirm_password"
            variant="outlined"
            fullWidth
            value={"kmdskjdskfjlkds"}
            type="password"
          />
        )}
      />
    </div>
  );
}

export default BasicInfoTab;
