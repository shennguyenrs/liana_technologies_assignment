import React from 'react';
import { useTheme } from '@material-ui/core/styles';

import { TablePaginationProps } from '@material-ui/core/TablePagination';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';

// Styles
import { tablePagination } from '../styles/tablePagination';

const PaginationActions: React.FC<TablePaginationProps> = ({
  count,
  onChangePage,
  page,
  rowsPerPage,
}: TablePaginationProps) => {
  const classes = tablePagination();
  const theme = useTheme();

  // Handle first page button click
  const handleFirstPageButtonClick = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    onChangePage(e, 0);
  };

  // Handle back page button click
  const handleBackPageButtonClick = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    onChangePage(e, page - 1);
  };

  // Handle next page button click
  const handleNextPageButtonClick = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    onChangePage(e, page + 1);
  };

  // Handle next page button click
  const handleLastPageButtonClick = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    onChangePage(e, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <>
      <div className={classes.root}>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="First page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={handleBackPageButtonClick}
          disabled={page === 0}
          aria-label="Previous page"
        >
          {theme.direction === 'rtl' ? (
            <KeyboardArrowRight />
          ) : (
            <KeyboardArrowLeft />
          )}
        </IconButton>
        <IconButton
          onClick={handleNextPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Last page"
        >
          {theme.direction === 'rtl' ? (
            <KeyboardArrowLeft />
          ) : (
            <KeyboardArrowRight />
          )}
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Last page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </div>
    </>
  );
};

export default PaginationActions;
