import Button from "@mui/material/Button";
import NavLinkAdapter from "@fuse/core/NavLinkAdapter";
import { useParams } from "react-router-dom";
import FuseLoading from "@fuse/core/FuseLoading";
import _ from "@lodash";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import Box from "@mui/system/Box";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Autocomplete from "@mui/material/Autocomplete/Autocomplete";
import Checkbox from "@mui/material/Checkbox/Checkbox";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  name: yup.string().required("You must enter a name"),
});

const EditeModal = ({ handleSideBar }) => {
  const routeParams = useParams();

  const { control, watch, reset, handleSubmit, formState, getValues } = useForm(
    {
      mode: "onChange",
      resolver: yupResolver(schema),
    }
  );

  const { isValid, dirtyFields, errors } = formState;

  const form = watch();

  /**
   * Form Submit
   */

  // if (_.isEmpty(form) || !contact) {
  //   return <FuseLoading />;
  // }

  return (
    <>
      <IconButton
        className="absolute top-0 right-0 my-16 mx-32 z-10  "
        sx={{ color: "black" }}
        size="large"
        onClick={() => {
          handleSideBar(false);
        }}
      >
        <FuseSvgIcon>heroicons-outline:x</FuseSvgIcon>
      </IconButton>

      <div className="mt-32"></div>

      <div className="relative flex flex-col flex-auto items-center px-24 sm:px-48">
        <Controller
          control={control}
          name="name"
          render={({ field }) => (
            <TextField
              className="mt-32"
              {...field}
              label="Name"
              placeholder="Name"
              id="name"
              error={!!errors.name}
              helperText={errors?.name?.message}
              variant="outlined"
              required
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FuseSvgIcon size={20}>
                      heroicons-solid:user-circle
                    </FuseSvgIcon>
                  </InputAdornment>
                ),
              }}
            />
          )}
        />
        <Controller
          control={control}
          name="Company"
          render={({ field }) => (
            <TextField
              className="mt-32"
              {...field}
              label="Company"
              placeholder="Company"
              id="company"
              variant="outlined"
              required
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FuseSvgIcon size={20}>
                      heroicons-solid:office-building
                    </FuseSvgIcon>
                  </InputAdornment>
                ),
              }}
            />
          )}
        />
        <Controller
          control={control}
          name="freelancer"
          render={({ field }) => (
            <TextField
              className="mt-32"
              {...field}
              label="Freelancer"
              placeholder="Freelancer"
              id="freelancer"
              variant="outlined"
              required
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FuseSvgIcon size={20}>heroicons-solid:code</FuseSvgIcon>
                  </InputAdornment>
                ),
              }}
            />
          )}
        />
        <Controller
          control={control}
          name="state"
          render={({ field }) => (
            <TextField
              className="mt-32"
              {...field}
              label="State"
              placeholder="State"
              id="state"
              variant="outlined"
              required
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FuseSvgIcon size={20}>
                      heroicons-solid:clipboard-check
                    </FuseSvgIcon>
                  </InputAdornment>
                ),
              }}
            />
          )}
        />
        {/* <Controller
          control={control}
          name="name"
          label="Email"
          render={({ field }) => (
            <Select
              labelId="category-select-label"
              id="category-select"
              label="Category"
              className="mt-32 w-full"
            >
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="assigned">Assigned</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
            </Select>
          )}
        /> */}
      </div>

      <Box
        className="flex items-center mt-40 py-14 pr-16 pl-4 sm:pr-48 sm:pl-36 border-t"
        sx={{ backgroundColor: "background.default" }}
      >
        {routeParams.id !== "new" && (
          <Button color="error" onClick={() => {}}>
            Delete
          </Button>
        )}
        <Button
          className="ml-auto"
          onClick={() => {
            handleSideBar(false);
          }}
        >
          Cancel
        </Button>
        <Button
          className="ml-8"
          variant="contained"
          color="secondary"
          disabled={_.isEmpty(dirtyFields) || !isValid}
          onClick={() => {}}
        >
          Save
        </Button>
      </Box>
    </>
  );
};

export default EditeModal;
