import FuseScrollbars from '@fuse/core/FuseScrollbars';
import _ from '@lodash';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { useState } from 'react';
import FuseLoading from '@fuse/core/FuseLoading';
import { useSelector } from 'react-redux';
import withRouter from '@fuse/core/withRouter';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { selectProductsSearchText } from '../store/productsSlice';
import ProductsTableHead from './ProductsTableHead';

function ProductsTable({ handleSideBar, companies, handleSelectedCompany, loadingState }) {
  const searchText = useSelector(selectProductsSearchText);

  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState({
    direction: 'asc',
    id: null,
  });

  function handleChangePage(event, value) {
    setPage(value);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(event.target.value);
  }

  if (!loadingState && companies.length === 0) {
    return <FuseLoading />;
  }

  if (companies.length === 0 && !loadingState) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-1 items-center justify-center h-full"
      >
        <Typography color="text.secondary" variant="h5">
          There are no Companies!
        </Typography>
      </motion.div>
    );
  }

  return (
    <div className="w-full flex flex-col min-h-full">
      <FuseScrollbars className="grow overflow-x-auto">
        <Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
          <ProductsTableHead
            selectedProductIds={selected}
            order={order}
            rowCount={companies.length}
          />

          <TableBody>
            {_.orderBy(companies, [order.direction])
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((n) => {
                const isSelected = selected.indexOf(n._id) !== -1;
                return (
                  <TableRow
                    className="h-72 cursor-pointer"
                    hover
                    role="checkbox"
                    aria-checked={isSelected}
                    tabIndex={-1}
                    key={n._id}
                    selected={isSelected}
                    onClick={() => {
                      handleSelectedCompany(n);
                      handleSideBar(true);
                    }}
                  >
                    {/* <TableCell className="w-40 md:w-64 text-center" padding="none">
                      <Checkbox
                        checked={isSelected}
                        onClick={(event) => event.stopPropagation()}
                        onChange={(event) => handleCheck(event, n.id)}
                      />
                    </TableCell> */}

                    <TableCell
                      className="w-52 mx-8 px-8 "
                      component="th"
                      scope="row"
                      padding="none"
                    >
                      <img
                        className="w-full block rounded"
                        src={n.data.photoURL}
                        alt={n.data.displayName}
                      />
                    </TableCell>

                    <TableCell className="p-4 md:p-16" component="th" scope="row">
                      {n.data.displayName}
                    </TableCell>
                    <TableCell className="p-4 md:p-16" component="th" scope="row">
                      {n._id}
                    </TableCell>

                    <TableCell className="p-4 md:p-16 truncate" component="th" scope="row">
                      {n.category}
                    </TableCell>

                    <TableCell className="p-4 md:p-16" component="th" scope="row" align="right">
                      5
                      <i
                        className={clsx(
                          'inline-block w-8 h-8 rounded mx-8'
                          // n.quantity <= 5 && 'bg-red',
                          // n.quantity > 5 && n.quantity <= 25 && 'bg-orange',
                          // n.quantity > 25 && 'bg-green'
                        )}
                      />
                    </TableCell>

                    <TableCell className="p-4 md:p-16 " component="th" scope="row" align="right">
                      {true ? (
                        <FuseSvgIcon className="text-green ml-auto " size={20}>
                          heroicons-outline:check-circle
                        </FuseSvgIcon>
                      ) : (
                        <FuseSvgIcon className="text-red ml-auto" size={20}>
                          heroicons-outline:minus-circle
                        </FuseSvgIcon>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </FuseScrollbars>

      <TablePagination
        className="shrink-0 border-t-1"
        component="div"
        count={companies.length}
        rowsPerPage={rowsPerPage}
        page={page}
        backIconButtonProps={{
          'aria-label': 'Previous Page',
        }}
        nextIconButtonProps={{
          'aria-label': 'Next Page',
        }}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}

export default withRouter(ProductsTable);
