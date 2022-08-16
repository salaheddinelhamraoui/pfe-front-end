import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { useParams } from 'react-router-dom';
import _ from '@lodash';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import Box from '@mui/system/Box';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import FuseLoading from '@fuse/core/FuseLoading';
import { useDispatch } from 'react-redux';
import { showMessage } from 'app/store/fuse/messageSlice';
import axios from 'axios';

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  name: yup.string().required('You must enter a name'),
  email: yup
    .string()
    .email('You must enter a valid email')
    .required('You must enter a email'),
  password: yup
    .string()
    .required('Please enter your password.')
    .min(4, 'Password is too short - must be at least 4 chars.'),
});

const EditeModal = ({ handleSideBar, freelancer }) => {
  const [fileInputState, setFileInputState] = useState('');
  const [previewSource, setPreviewSource] = useState('');
  const [selectedFile, setSelectedFile] = useState('');
  const [loadingState, setLoadingState] = useState(false);
  const routeParams = useParams();
  const dispatch = useDispatch();

  const {
    control,
    watch,
    reset,
    handleSubmit,
    formState,
    getValues,
    setValue,
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;

  const form = watch();

  useEffect(() => {
    if (freelancer) {
      setValue('name', freelancer.data.displayName);
      setValue('email', freelancer.data.email);
      setValue('category', freelancer.category);
    }
  }, [freelancer]);

  /**
   * Form Submit
   */

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
    setSelectedFile(file);
    setFileInputState(e.target.value);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  function onSubmit({ name, email, password, category }) {
    setLoadingState(true);

    if (selectedFile) {
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onloadend = () => {
        const base64EncodedImage = reader.result;

        axios
          .post(process.env.REACT_APP_API_URL + '/register', {
            data: {
              displayName: name,
              email: email,
              photoURL: base64EncodedImage,
            },
            password: password,
            role: 'freelancer',
            category: category,
          })
          .then((res) => {
            dispatch(showMessage({ message: 'Freelancer Added successfully' }));
            setLoadingState(false);
            handleSideBar(false);
            reset({
              name: '',
              email: '',
            });
            setSelectedFile('');
            setFileInputState('');
            setPreviewSource('');
          })
          .catch((res) => {
            console.log(res.response.data.message);
            dispatch(showMessage({ message: res.response.data.message }));
            setLoadingState(false);
          });
      };

      reader.onerror = () => {
        console.error('failed to load your image!!');
        dispatch(showMessage({ message: 'failed to load your image!!' }));
        setLoadingState(false);
      };
    } else {
      axios
        .post(process.env.REACT_APP_API_URL + '/register', {
          data: {
            displayName: name,
            email: email,
          },
          password: password,
          role: 'freelancer',
          category: category,
        })
        .then((res) => {
          dispatch(showMessage({ message: 'Freelancer Added successfully' }));
          setLoadingState(false);
          handleSideBar(false);
          reset({
            name: '',
            email: '',
          });
          setSelectedFile('');
          setFileInputState('');
          setPreviewSource('');
        })
        .catch((res) => {
          console.log(res.response.data.message);
          dispatch(showMessage({ message: res.response.data.message }));
          setLoadingState(false);
        });
    }
  }

  if (loadingState) {
    return <FuseLoading />;
  }

  return (
    <>
      <IconButton
        className='absolute top-0 right-0 my-16 mx-32 z-10  '
        sx={{ color: 'black' }}
        size='large'
        onClick={() => {
          handleSideBar(false);
        }}
      >
        <FuseSvgIcon>heroicons-outline:x</FuseSvgIcon>
      </IconButton>

      <div className='mt-32'>
        <p> </p>
      </div>
      <form
        name='addFreelancerForm'
        noValidate
        className='flex flex-col justify-center w-full mt-32'
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className='flex mx-auto'>
          <Controller
            control={control}
            name='avatar'
            render={({ field: { onChange, value } }) => (
              <Box
                sx={{
                  borderWidth: 4,
                  borderStyle: 'solid',
                  borderColor: 'background.paper',
                }}
                className='relative flex items-center justify-center w-128 h-128 rounded-full overflow-hidden'
              >
                <div className='absolute inset-0 bg-black bg-opacity-50 z-10' />
                <div className='absolute inset-0 flex items-center justify-center z-20'>
                  <div>
                    <label
                      htmlFor='button-avatar'
                      className='flex p-8 cursor-pointer'
                    >
                      <input
                        accept='image/*'
                        className='hidden'
                        id='button-avatar'
                        type='file'
                        onChange={handleFileInputChange}
                      />
                      <FuseSvgIcon className='text-white'>
                        heroicons-outline:camera
                      </FuseSvgIcon>
                    </label>
                  </div>
                  <div>
                    <IconButton
                      onClick={() => {
                        setSelectedFile('');
                        setFileInputState('');
                        setPreviewSource('');
                      }}
                    >
                      <FuseSvgIcon className='text-white'>
                        heroicons-solid:trash
                      </FuseSvgIcon>
                    </IconButton>
                  </div>
                </div>
                <Avatar
                  sx={{
                    backgroundColor: 'background.default',
                    color: 'text.secondary',
                  }}
                  className='object-cover w-full h-full text-64 font-bold'
                  src={
                    previewSource
                      ? previewSource
                      : 'https://monstar-lab.com/global/wp-content/uploads/sites/11/2019/04/male-placeholder-image.jpeg'
                  }
                  alt='company logo'
                >
                  Freelancer Name
                </Avatar>
              </Box>
            )}
          />
        </div>
        <div className='relative flex flex-col flex-auto items-center px-24 sm:px-48'>
          <Controller
            control={control}
            name='name'
            render={({ field }) => (
              <TextField
                className='mt-32'
                {...field}
                label='Name'
                placeholder='Name'
                id='name'
                error={!!errors.name}
                helperText={errors?.name?.message}
                variant='outlined'
                required
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
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
            name='email'
            render={({ field }) => (
              <TextField
                className='mt-32'
                {...field}
                label='Email'
                placeholder='email'
                id='email'
                variant='outlined'
                required
                fullWidth
                error={!!errors.email}
                helperText={errors?.email?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <FuseSvgIcon size={20}>
                        heroicons-solid:at-symbol
                      </FuseSvgIcon>
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
          <Controller
            name='password'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                className='mt-32'
                label='Password'
                type='password'
                error={!!errors.password}
                helperText={errors?.password?.message}
                variant='outlined'
                required
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <FuseSvgIcon size={20}>
                        heroicons-solid:lock-closed
                      </FuseSvgIcon>
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
          <Controller
            name='category'
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                className='mt-32'
                label='category'
                type='text'
                variant='outlined'
                required
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <FuseSvgIcon size={20}>
                        heroicons-solid:color-swatch
                      </FuseSvgIcon>
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
        </div>
        <Box
          className='flex items-center mt-40 py-14 pr-16 pl-4 sm:pr-48 sm:pl-36 border-t'
          sx={{ backgroundColor: 'background.default' }}
        >
          {routeParams.id !== 'new' && (
            <Button
              color='error'
              onClick={() => {
                setValue('name', 'test');
              }}
            >
              Delete
            </Button>
          )}
          <Button
            className='ml-auto'
            onClick={() => {
              handleSideBar(false);
            }}
          >
            Cancel
          </Button>
          <Button
            className='ml-8'
            variant='contained'
            color='secondary'
            disabled={_.isEmpty(dirtyFields) || !isValid}
            type='submit'
          >
            Save
          </Button>
        </Box>
      </form>
    </>
  );
};

export default EditeModal;
