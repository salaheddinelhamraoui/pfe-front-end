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
import EditeModal from '../modal/EditeModal';
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

  const handleSideBar = (state) => {
    setRightSidebarOpen(state);
  };

  const handleSelectedUser = (state) => {
    setFreelancer(state);
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/findAllUsers?role=freelancer&page=1&limit=3`)
      .then((response) => {
        setFreelancers(response.data.result);
        setLoadingState(false);
      })
      .catch((error) => {
        console.log(error);
        setLoadingState(false);
      });
  }, []);

  useEffect(() => {
    if (freelancers.length > 0) {
      setRightSidebarOpen(true);
    }
  }, [freelancer]);

  function handleSearchText(event) {
    setSearchText(event.target.value);
  }

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

            return freelancers.length > 0 ? (
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
        </div>
      }
      rightSidebarContent={<EditeModal handleSideBar={handleSideBar} freelancer={freelancer} />}
      rightSidebarOpen={rightSidebarOpen}
      rightSidebarOnClose={() => setRightSidebarOpen(false)}
      rightSidebarWidth={440}
      scroll={isMobile ? 'normal' : 'page'}
    />
  );
}

export default Freelancers;
