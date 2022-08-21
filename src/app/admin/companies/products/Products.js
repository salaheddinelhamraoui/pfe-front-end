import withReducer from 'app/store/withReducer';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';

import { useDispatch } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { showMessage } from 'app/store/fuse/messageSlice';
import axios from 'axios';
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
  const routeParams = useParams();
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false);
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState();
  const [loadingState, setLoadingState] = useState(true);

  const dispatch = useDispatch();

  // useEffect(() => {
  //   setRightSidebarOpen(Boolean(routeParams.id));
  // }, [routeParams]);

  useEffect(() => {
    getCompanies();
  }, []);

  const handleSideBar = (state) => {
    setRightSidebarOpen(state);
  };

  const getCompanies = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/findAllUsers?role=company`)
      .then((response) => {
        setCompanies(response.data.result);
        setLoadingState(false);
      })
      .catch((error) => {
        console.log(error);
        dispatch(showMessage({ message: error.response.data.message }));
        setLoadingState(false);
      });
  };

  const handleSelectedCompany = (state) => {
    setSelectedCompany(state);
  };

  return (
    <Root
      header={
        <ProductsHeader
          handleSideBar={handleSideBar}
          handleSelectedCompany={handleSelectedCompany}
        />
      }
      content={
        <ProductsTable
          handleSideBar={handleSideBar}
          companies={companies}
          handleSelectedCompany={handleSelectedCompany}
          loadingState={loadingState}
        />
      }
      ref={pageLayout}
      rightSidebarContent={
        <EditeModal
          handleSideBar={handleSideBar}
          company={selectedCompany}
          getCompanies={getCompanies}
        />
      }
      rightSidebarOpen={rightSidebarOpen}
      rightSidebarOnClose={() => setRightSidebarOpen(false)}
      rightSidebarWidth={440}
      scroll={isMobile ? 'normal' : 'content'}
    />
  );
}

export default withReducer('eCommerceApp', reducer)(Products);
