import FusePageSimple from '@fuse/core/FusePageSimple';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import ProjectDashboardAppHeader from './ProjectDashboardAppHeader';
import TimeLine from './tabs/TimeLine';
import NewSession from './sessions/NewSession';
import Informations from './tabs/Informations';

const Root = styled(FusePageSimple)(({ theme }) => ({
  '& .FusePageSimple-header': {
    backgroundColor: theme.palette.background.paper,
    boxShadow: `inset 0 0 0 1px  ${theme.palette.divider}`,
  },
}));

function ProjectDetails(props) {
  const [tabValue, setTabValue] = useState(0);
  const [projectData, setProjectData] = useState({});
  const { id } = useParams();

  function handleChangeTab(event, value) {
    setTabValue(value);
  }

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/findProject/${id}`)
      .then((res) => {
        setProjectData(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Root
      header={<ProjectDashboardAppHeader projectData={projectData} />}
      content={
        <div className="w-full p-12 pt-16 sm:pt-24 lg:ltr:pr-0 lg:rtl:pl-0">
          <Tabs
            value={tabValue}
            onChange={handleChangeTab}
            indicatorColor="secondary"
            textColor="inherit"
            variant="scrollable"
            scrollButtons={false}
            className="w-full px-24 -mx-4 min-h-40"
            classes={{
              indicator: 'flex justify-center bg-transparent w-full h-full',
            }}
            TabIndicatorProps={{
              children: (
                <Box
                  sx={{ bgcolor: 'text.disabled' }}
                  className="w-full h-full rounded-full opacity-20"
                />
              ),
            }}
          >
            <Tab
              className="text-14 font-semibold min-h-40 min-w-64 mx-4 px-12"
              disableRipple
              label="Timeline"
            />
            <Tab
              className="text-14 font-semibold min-h-40 min-w-64 mx-4 px-12"
              disableRipple
              label="Informations"
            />
            <Tab
              className="text-14 font-semibold min-h-40 min-w-64 mx-4 px-12"
              disableRipple
              label="New Session"
            />
          </Tabs>
          {tabValue === 0 && <TimeLine />}
          {tabValue === 1 && <Informations projectData={projectData} />}
          {tabValue === 2 && <NewSession />}
        </div>
      }
    />
  );
}

export default ProjectDetails;
