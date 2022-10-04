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
import withRouter from '@fuse/core/withRouter';
import Moment from 'react-moment';
import { useNavigate } from 'react-router-dom';
import ProductsTableHead from './ProductsTableHead';

function ProductsTable({ handleSideBar, data, loadingState }) {
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState({
    direction: 'asc',
    id: null,
  });

  const navigate = useNavigate();

  function handleChangePage(event, value) {
    setPage(value);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(event.target.value);
  }

  if (!loadingState) {
    return <FuseLoading />;
  }

  if (data.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-1 items-center justify-center h-full"
      >
        <Typography color="text.secondary" variant="h5">
          There are no projects!
        </Typography>
      </motion.div>
    );
  }

  return (
    <div className="w-full flex flex-col min-h-full">
      <FuseScrollbars className="grow overflow-x-auto">
        <Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
          <ProductsTableHead selectedProductIds={selected} order={order} rowCount={data.length} />

          <TableBody>
            {_.orderBy(data, [order.direction])
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((n) => {
                const isSelected = selected.indexOf(n.id) !== -1;
                return (
                  <TableRow
                    className="h-72 cursor-pointer"
                    hover
                    role="checkbox"
                    aria-checked={isSelected}
                    tabIndex={-1}
                    key={n.project_name}
                    selected={isSelected}
                    onClick={() => {
                      navigate(`/project-details-company/${n._id}`);
                    }}
                  >
                    <TableCell className="p-4 md:p-16" component="th" scope="row">
                      {n.project_name}
                    </TableCell>
                    <TableCell className="p-4 md:p-16" component="th" scope="row">
                      {n.company_id.data.displayName}
                    </TableCell>
                    <TableCell className="p-4 md:p-16" component="th" scope="row">
                      <div
                        className={clsx(
                          'inline text-12 font-semibold py-4 px-12 rounded-full truncate bg-blue-500 text-white'
                        )}
                      >
                        {n.freelancer_id.data.displayName}
                      </div>
                    </TableCell>
                    <TableCell className="p-4 md:p-16" component="th" scope="row">
                      {n.state}

                      <i
                        className={clsx(
                          'inline-block w-8 h-8 rounded mx-8',
                          n.state !== 'Completed' && 'bg-orange',
                          n.state === 'Completed' && 'bg-green'
                        )}
                      />
                    </TableCell>
                    <TableCell className="p-4 md:p-16" component="th" scope="row">
                      {n.total_session_hours}
                    </TableCell>
                    <TableCell className="p-4 md:p-16" component="th" scope="row">
                      <Moment format="YYYY/MM/DD">{n.start_date}</Moment>
                    </TableCell>

                    {/* <TableCell
                      className="p-4 md:p-16 truncate"
                      component="th"
                      scope="row"
                    >
                      {n.categories.join(", ")}
                    </TableCell> */}

                    {/* <TableCell
                      className="p-4 md:p-16"
                      component="th"
                      scope="row"
                      align="right"
                    >
                      {n.quantity}
                      <i
                        className={clsx(
                          "inline-block w-8 h-8 rounded mx-8",
                          n.quantity <= 5 && "bg-red",
                          n.quantity > 5 && n.quantity <= 25 && "bg-orange",
                          n.quantity > 25 && "bg-green"
                        )}
                      />
                    </TableCell> */}
                    {/* 
                    <TableCell
                      className="p-4 md:p-16 "
                      component="th"
                      scope="row"
                      align="right"
                    >
                      {n.active ? (
                        <FuseSvgIcon className="text-green ml-auto " size={20}>
                          heroicons-outline:check-circle
                        </FuseSvgIcon>
                      ) : (
                        <FuseSvgIcon className="text-red ml-auto" size={20}>
                          heroicons-outline:minus-circle
                        </FuseSvgIcon>
                      )}
                    </TableCell> */}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </FuseScrollbars>

      <TablePagination
        className="shrink-0 border-t-1"
        component="div"
        count={data.length}
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
