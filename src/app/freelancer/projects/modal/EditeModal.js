import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { useParams } from 'react-router-dom';
import FuseLoading from '@fuse/core/FuseLoading';
import _ from '@lodash';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import Box from '@mui/system/Box';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from 'app/store/userSlice';
import { showMessage } from 'app/store/fuse/messageSlice';
import SearchInput from '../components/SearchInput';

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  name: yup.string().required('You must enter a name'),
});

const EditeModal = ({ handleSideBar, getProjects }) => {
  const [companies, setCompanies] = useState();
  const [freelancers, setFreelancers] = useState();
  const [selectedFreelancer, setSelectedFreelancer] = useState();
  const [selectedCompany, setSelectedCompany] = useState();
  const [projectDescription, setProjectDescription] = useState('');
  const [loadingState, setLoadingState] = useState(false);
  const routeParams = useParams();
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const { control, watch, reset, handleSubmit, formState, getValues } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;

  const form = watch();

  const getCompanies = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/findAllUsers?role=company`)
      .then((response) => {
        setCompanies(response.data.result);
      })
      .catch((error) => {
        console.log(error);
        dispatch(showMessage({ message: error.response.data.message }));
      });
  };

  const getFreelancers = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/findAllUsers?role=freelancer`)
      .then((response) => {
        setFreelancers(response.data.result);
      })
      .catch((error) => {
        console.log(error);
        dispatch(showMessage({ message: error.response.data.message }));
      });
  };

  useEffect(() => {
    getFreelancers();
    getCompanies();
  }, []);

  const handleSelectedFreelancer = (state) => {
    setSelectedFreelancer(state);
  };

  const handleSelectedCompany = (state) => {
    setSelectedCompany(state);
  };

  const handleSubmitForm = ({ name }) => {
    setLoadingState(true);
    try {
      axios
        .post(`${process.env.REACT_APP_API_URL}/addProject`, {
          project_name: name,
          creator_id: user._id,
          freelancer_id: selectedFreelancer._id,
          company_id: selectedCompany._id,
          description: projectDescription,
          state: 'Started',
          total_session_hours: 10,
          start_date: new Date(),
        })
        .then((res) => {
          dispatch(showMessage({ message: 'Project Added successfully' }));
          setLoadingState(false);
          getProjects();
          reset({
            name: '',
          });
          setProjectDescription('');
          handleSideBar(false);
        })
        .catch((err) => {
          console.log(err);
          dispatch(showMessage({ message: err.response.data.message }));
          setLoadingState(false);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const handleDescriptionChange = (event) => {
    setProjectDescription(event.target.value);
  };

  if (!freelancers || !companies || loadingState) {
    return <FuseLoading />;
  }

  return (
    <>
      <IconButton
        className="absolute top-0 right-0 my-16 mx-32 z-10  "
        sx={{ color: 'black' }}
        size="large"
        onClick={() => {
          handleSideBar(false);
        }}
      >
        <FuseSvgIcon>heroicons-outline:x</FuseSvgIcon>
      </IconButton>

      <div className="mt-32" />

      <div className="relative flex flex-col flex-auto items-center px-24 sm:px-48">
        <Controller
          control={control}
          name="name"
          render={({ field }) => (
            <TextField
              className="mt-32"
              {...field}
              label="Title"
              placeholder="Name"
              id="name"
              error={!!errors.name}
              helperText={errors?.name?.message}
              variant="outlined"
              required
              fullWidth
            />
          )}
        />

        <FormControl fullWidth sx={{ m: 1 }} variant="standard">
          <InputLabel htmlFor="standard-adornment-amount">Freelancer</InputLabel>
          <SearchInput
            marginFromTop="mt-[5.2rem]"
            data={freelancers || []}
            handleSelectedState={handleSelectedFreelancer}
          />
        </FormControl>
        <FormControl fullWidth sx={{ m: 1 }} variant="standard">
          <InputLabel htmlFor="standard-adornment-amount" className="absolute top-[-22px]">
            Company
          </InputLabel>
          <SearchInput
            marginFromTop="mt-[3.2rem]"
            data={companies || []}
            handleSelectedState={handleSelectedCompany}
          />
        </FormControl>

        <FormControl fullWidth sx={{ m: 1 }} variant="standard">
          <InputLabel htmlFor="standard-adornment-amount" className="absolute top-[-22px]">
            Description
          </InputLabel>
          <TextareaAutosize
            maxRows={6}
            minRows={4}
            aria-label="maximum height"
            placeholder="Project Description"
            className="mt-[3.2rem] w-full border p-16"
            value={projectDescription}
            onChange={handleDescriptionChange}
          />
        </FormControl>
      </div>

      <Box
        className="flex items-center mt-40 py-14 pr-16 pl-4 sm:pr-48 sm:pl-36 border-t"
        sx={{ backgroundColor: 'background.default' }}
      >
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
          onClick={handleSubmit(handleSubmitForm)}
        >
          Save
        </Button>
      </Box>
    </>
  );
};

export default EditeModal;
