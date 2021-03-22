import React from 'react';

import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import Grid from '@material-ui/core/Grid';

// Styles
import { navBar } from '../styles/navBar';

type Props = {
  clickButton: () => void;
};

const NavBar: React.FC<Props> = ({ clickButton }: Props) => {
  const classes = navBar();

  return (
    <>
      <div className={classes.root}>
        <Grid container>
          <Grid item xs={9} className={classes.onRight}>
            <h2>Email Subscription Database</h2>
          </Grid>
          <Grid item xs={3} className={classes.onLeft}>
            <Button
              onClick={clickButton}
              variant="contained"
              color="primary"
              className={classes.button}
              startIcon={<SaveIcon />}
            >
              Save CSV
            </Button>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default NavBar;
