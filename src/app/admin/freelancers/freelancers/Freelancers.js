import axios from 'axios';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import FusePageSimple from '@fuse/core/FusePageSimple';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';

import Button from '@mui/material/Button';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import FuseLoading from '@fuse/core/FuseLoading';
import { useDispatch } from 'react-redux';
import { showMessage } from 'app/store/fuse/messageSlice';
import EditModal from '../modal/EditModal';
import FreelancerCard from './FreelancerCard';

function Freelancers(props) {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

  // const theme = useTheme();
  const [filteredData, setFilteredData] = useState('');
  const [searchText, setSearchText] = useState('');
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false);
  const [freelancers, setFreelancers] = useState([]);
  const [loadingState, setLoadingState] = useState(true);
  const [freelancer, setFreelancer] = useState(null);
  const [update, setUpdate] = useState(false);

  /* Pagination State */
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(3);
  const [totalPages, setTotalPages] = useState(null);

  const dispatch = useDispatch();

  const handleSideBar = (state) => {
    setRightSidebarOpen(state);
  };

  const handleSelectedUser = (state) => {
    setFreelancer(state);
  };

  const getMoreFreelancers = (init) => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/findAllUsers?role=freelancer&page=${currentPage}&limit=${limit}&userName=${searchText}`
      )
      .then((response) => {
        if (init) {
          setFreelancers(response.data.result);
        } else {
          setFreelancers([...freelancers, ...response.data.result]);
        }
        setTotalPages(response.data.metadata.size);
        setLoadingState(false);
      })
      .catch((error) => {
        dispatch(showMessage({ message: error.response.data.message }));
        setLoadingState(false);
      });
  };

  const getInitFreelancers = () => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/findAllUsers?role=freelancer&page=1&limit=${limit}&userName=${searchText}`
      )
      .then((response) => {
        setFreelancers(response.data.result);
        setTotalPages(response.data.metadata.size);
        setLoadingState(false);
      })
      .catch((error) => {
        dispatch(showMessage({ message: error.response.data.message }));
        setLoadingState(false);
      });
  };

  useEffect(() => {
    if (currentPage !== 1) {
      getMoreFreelancers();
    }
  }, [currentPage]);

  useEffect(() => {
    getInitFreelancers();
  }, [searchText]);

  useEffect(() => {
    if (freelancers.length > 0) {
      setRightSidebarOpen(true);
    }
  }, [freelancer]);

  const handleSearchText = (event) => {
    setSearchText(event.target.value);
  };

  const handlLoadMoreButton = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleCurrentPage = (page) => {
    setCurrentPage(page);
  };

  return (
    <FusePageSimple
      content={
        <div className="w-full flex flex-col flex-1  mx-auto px-24 pt-24 sm:p-40">
          <div className="w-full flex flex-col shrink-0 sm:flex-row items-center justify-between space-y-16 sm:space-y-0">
            <div className="flex flex-col sm:flex-row w-full sm:w-auto items-center space-y-16 sm:space-y-0 sm:space-x-16">
              <TextField
                label="Search for a freelancer"
                placeholder="Enter a keyword..."
                className="flex w-full sm:w-256 mx-8"
                value={searchText}
                inputProps={{
                  'aria-label': 'Search',
                }}
                onChange={handleSearchText}
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <div className="ml-auto">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}
                >
                  <Button
                    className=""
                    variant="contained"
                    color="secondary"
                    startIcon={<FuseSvgIcon>heroicons-outline:plus</FuseSvgIcon>}
                    onClick={() => {
                      setRightSidebarOpen(true);
                      setFreelancer(null);
                    }}
                  >
                    Add
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
          {loadingState && <FuseLoading />}
          {useMemo(() => {
            const container = {
              show: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            };

            const item = {
              hidden: {
                opacity: 0,
                y: 20,
              },
              show: {
                opacity: 1,
                y: 0,
              },
            };

            return freelancers.length > 0 && totalPages !== 0 ? (
              <motion.div
                className="flex grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-32 mt-32 sm:mt-40"
                variants={container}
                initial="hidden"
                animate="show"
              >
                {freelancers.map((freelancer) => {
                  return (
                    <motion.div variants={item} key={freelancer._id}>
                      <FreelancerCard
                        freelancer={freelancer}
                        handleSelectedUser={handleSelectedUser}
                        handleSideBar={handleSideBar}
                      />
                    </motion.div>
                  );
                })}
              </motion.div>
            ) : (
              <div className="flex flex-1 items-center justify-center">
                <Typography color="text.secondary" className="text-24 my-24">
                  No freelancers found!
                </Typography>
              </div>
            );
          }, [freelancers])}
          <div className="w-full text-center">
            {freelancers.length > 2 && currentPage !== totalPages &&  (
              <Button
                className="px-24 mt-24 min-w-128 "
                color="primary"
                variant="contained"
                onClick={handlLoadMoreButton}
              >
                Load More{' '}
                <svg
                  className="animate-spin  ml-8 h-12 w-12"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="3"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              </Button>
            )}
          </div>
        </div>
      }
      rightSidebarContent={
        <EditModal
          handleSideBar={handleSideBar}
          freelancer={freelancer}
          getInitFreelancers={getInitFreelancers}
          handleCurrentPage={handleCurrentPage}
        />
      }
      rightSidebarOpen={rightSidebarOpen}
      rightSidebarOnClose={() => setRightSidebarOpen(false)}
      rightSidebarWidth={440}
      scroll={isMobile ? 'normal' : 'page'}
    />
  );
}

export default Freelancers;
