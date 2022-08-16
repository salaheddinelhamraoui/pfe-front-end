import _ from '@lodash';

import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import FusePageSimple from '@fuse/core/FusePageSimple';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';

import FreelancerCard from './FreelancerCard';
import Button from '@mui/material/Button';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import EditeModal from '../modal/EditeModal';

function Freelancers(props) {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));

  // const theme = useTheme();
  const [filteredData, setFilteredData] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false);

  const handleSideBar = (state) => {
    setRightSidebarOpen(state);
  };

  const data = [
    {
      'id': '694e4e5f-f25f-470b-bd0e-26b1d4f64028',
      'title': 'Khalid Adel',
      'slug': 'khalid-adel',
      'description': 'Introductory course for Angular and framework basics',
      'category': 'front-end-developer',
      'duration': 3,
      'totalSteps': 11,
      'updatedAt': 'Jun 28, 2021',
      'progress': { 'currentStep': 3, 'completed': 2 },
    },
    {
      'id': '694e4e5f-f25f-470b-bd0e-26b1d4f6402e',
      'title': 'Khalid Adel',
      'slug': 'khalid-adel',
      'description': 'Introductory course for Angular and framework basics',
      'category': 'front-end-developer',
      'duration': 3,
      'totalSteps': 11,
      'updatedAt': 'Jun 28, 2021',
      'progress': { 'currentStep': 3, 'completed': 2 },
    },
    {
      'id': '694e4e5f-f25f-470b-bd0e-26b1d4f6402d',
      'title': 'Khalid Adel',
      'slug': 'khalid-adel',
      'description': 'Introductory course for Angular and framework basics',
      'category': 'front-end-developer',
      'duration': 3,
      'totalSteps': 11,
      'updatedAt': 'Jun 28, 2021',
      'progress': { 'currentStep': 3, 'completed': 2 },
    },
  ];

  function handleSearchText(event) {
    setSearchText(event.target.value);
  }
  return (
    <FusePageSimple
      content={
        <div className='w-full flex flex-col flex-1  mx-auto px-24 pt-24 sm:p-40'>
          <div className='w-full flex flex-col shrink-0 sm:flex-row items-center justify-between space-y-16 sm:space-y-0'>
            <div className='flex flex-col sm:flex-row w-full sm:w-auto items-center space-y-16 sm:space-y-0 sm:space-x-16'>
              <TextField
                label='Search for a freelancer'
                placeholder='Enter a keyword...'
                className='flex w-full sm:w-256 mx-8'
                value={searchText}
                inputProps={{
                  'aria-label': 'Search',
                }}
                onChange={handleSearchText}
                variant='outlined'
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <div className='ml-auto'>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}
                >
                  <Button
                    className=''
                    variant='contained'
                    color='secondary'
                    startIcon={
                      <FuseSvgIcon>heroicons-outline:plus</FuseSvgIcon>
                    }
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

            return data.length > 0 ? (
              <motion.div
                className='flex grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-32 mt-32 sm:mt-40'
                variants={container}
                initial='hidden'
                animate='show'
              >
                {data.map((freelancer) => {
                  return (
                    <motion.div variants={item} key={freelancer.id}>
                      <FreelancerCard freelancer={freelancer} />
                    </motion.div>
                  );
                })}
              </motion.div>
            ) : (
              <div className='flex flex-1 items-center justify-center'>
                <Typography color='text.secondary' className='text-24 my-24'>
                  No courses found!
                </Typography>
              </div>
            );
          }, [data])}
        </div>
      }
      rightSidebarContent={<EditeModal handleSideBar={handleSideBar} />}
      rightSidebarOpen={rightSidebarOpen}
      rightSidebarOnClose={() => setRightSidebarOpen(false)}
      rightSidebarWidth={440}
      scroll={isMobile ? 'normal' : 'page'}
    />
  );
}

export default Freelancers;
