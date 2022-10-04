import FusePageSimple from '@fuse/core/FusePageSimple';
import withReducer from 'app/store/withReducer';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import { selectUser } from 'app/store/userSlice';
import { useRef, useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';

import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { showMessage } from 'app/store/fuse/messageSlice';
import EditeModal from '../modal/EditeModal';

import reducer from '../store';
import ProductsHeader from './ProductsHeader';
import ProductsTable from './ProductsTable';

const Root = styled(FusePageSimple)(({ theme }) => ({
  '& .FusePageSimple-header': {
    backgroundColor: theme.palette.background.white,
  },
}));

function Products() {
  const pageLayout = useRef(null);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false);
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
  const [projects, setProjects] = useState([]);
  const [loadingState, setLoadingState] = useState(true);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const handleSideBar = (state) => {
    setRightSidebarOpen(state);
  };

  const getProjects = () => {
    setLoadingState(false);
    axios
      .get(`${process.env.REACT_APP_API_URL}/findProjectByCompanyId/${user._id}`)
      .then((response) => {
        setProjects(response.data.result);
        setLoadingState(true);
      })
      .catch((error) => {
        console.log(error);
        dispatch(showMessage({ message: error.response.data.message }));
        setLoadingState(true);
      });
  };

  useEffect(() => {
    getProjects();
  }, []);

  return (
    <Root
      header={<ProductsHeader handleSideBar={handleSideBar} />}
      content={
        <ProductsTable handleSideBar={handleSideBar} data={projects} loadingState={loadingState} />
      }
      ref={pageLayout}
      rightSidebarContent={<EditeModal handleSideBar={handleSideBar} getProjects={getProjects} />}
      rightSidebarOpen={rightSidebarOpen}
      rightSidebarOnClose={() => setRightSidebarOpen(false)}
      rightSidebarWidth={440}
      scroll={isMobile ? 'normal' : 'content'}
    />
  );
}

export default withReducer('eCommerceApp', reducer)(Products);
