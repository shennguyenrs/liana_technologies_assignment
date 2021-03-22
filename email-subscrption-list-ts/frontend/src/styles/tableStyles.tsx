import { makeStyles, withStyles } from '@material-ui/core/styles';
import TableRow from '@material-ui/core/TableRow';

export const tableStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  container: {
    margin: '0 1vw',
  },
  table: {
    minWidth: 650,
  },
  headerContainer: {
    backgroundColor: theme.palette.info.main,
  },
  header: {
    fontWeight: 'bold',
    color: theme.palette.common.white,
  },
}));

export const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);
