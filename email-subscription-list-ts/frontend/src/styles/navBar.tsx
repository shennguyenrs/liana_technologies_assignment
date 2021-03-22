import { makeStyles } from '@material-ui/core/styles';

export const navBar = makeStyles((theme) => ({
  root: {
    marginLeft: '5vw',
    marginRight: '5vw',
  },
  button: {
    margin: '1.2em',
    backgroundColor: theme.palette.success.main,
  },
  onRight: {
    textAlign: 'center',
  },
  onLeft: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
}));
