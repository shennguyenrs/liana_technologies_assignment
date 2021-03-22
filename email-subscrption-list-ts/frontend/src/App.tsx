import React, { useState, useEffect } from 'react';

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import TableFooter from '@material-ui/core/TableFooter';

// Components
import NavBar from './components/NavBar';
import PaginationActions from './components/PaginationActions';

// Interfaces
import { CustomerData } from './interfaces/CustomerData';

// Services
import apiService from './services/apiService';

// Utils
import { saveCsv } from './utils/saveCsv';

// Styles
import { tableStyles, StyledTableRow } from './styles/tableStyles';

const App: React.FC = () => {
  const classes = tableStyles();
  const [rows, setRows] = useState<CustomerData[]>([]);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(8);

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  // Use Effect
  useEffect(() => {
    apiService.getAll().then((data: CustomerData[]) => {
      setRows(data);
    });
  }, []);

  // Handle save file csv
  const handleSaveFile = () => {
    const element = document.createElement('a');
    const file = new Blob([saveCsv(rows)], {
      type: 'text/csv;charset=UTF-8',
    });

    element.href = window.URL.createObjectURL(file);
    element.download = 'email-subscription-list.csv';
    document.body.appendChild(element);
    element.click();
  };

  // Handle change page
  const handleChangePage = (
    _e: React.MouseEvent<HTMLButtonElement> | null,
    page: number
  ) => {
    setPage(page);
  };

  // Handle change rows per pages
  const handleChangeRowsPerPage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(Number(e.target.value));
    setPage(0);
  };

  return (
    <>
      <NavBar clickButton={handleSaveFile} />
      <div className={classes.root}>
        <TableContainer component={Paper} className={classes.container}>
          <Table className={classes.table}>
            <TableHead className={classes.headerContainer}>
              <TableRow>
                <TableCell className={classes.header}>Time Stamp</TableCell>
                <TableCell className={classes.header} align="right">
                  Email
                </TableCell>
                <TableCell className={classes.header} align="right">
                  UTM Source
                </TableCell>
                <TableCell className={classes.header} align="right">
                  UTM Medium
                </TableCell>
                <TableCell className={classes.header} align="right">
                  UTM Term
                </TableCell>
                <TableCell className={classes.header} align="right">
                  UTM Campaign
                </TableCell>
                <TableCell className={classes.header} align="right">
                  UTM Content
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? rows.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : rows
              ).map((row, id) => (
                <StyledTableRow key={id}>
                  <TableCell component="th" scope="row">
                    {row.timestamp}
                  </TableCell>
                  <TableCell align="right">{row.email}</TableCell>
                  <TableCell align="right">{row.utm_source}</TableCell>
                  <TableCell align="right">{row.utm_medium}</TableCell>
                  <TableCell align="right">{row.utm_term}</TableCell>
                  <TableCell align="right">{row.utm_campaign}</TableCell>
                  <TableCell align="right">{row.utm_content}</TableCell>
                </StyledTableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 8, 12, { label: 'All', value: -1 }]}
                  colSpan={3}
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: { 'aria-label': 'rows per page' },
                    native: true,
                  }}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                  ActionsComponent={PaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default App;
