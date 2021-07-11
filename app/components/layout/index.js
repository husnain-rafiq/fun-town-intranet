import { Grid, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { twoColumnLayoutRouteNames } from './layoutTypes';
import Header from './header';
import SideMenu from './sideMenu';
import RightInfoPanel from './rightInfoPanel';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: '100vh',
    width: '100vw',
    backgroundColor: theme.palette.bgColor.main,
  },
  rootGrid: {
    overflow: 'auto',
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
  },
  headerGrid: {
    width: '100%',
    display: 'flex',
    position: 'fixed',
    zIndex: 10,
  },
  bodyGrid: {
    flex: 1,
    width: '100%',
    marginTop: '5rem',
    display: 'grid',
    height: 'auto',
  },
  menuGrid: {
    height: '100%',
    zIndex: 5,
    display: 'block',
    position: 'fixed',
    left: 0,
    /* top: 0, */
    width: '10%',
    bottom: 0,
    overflow: 'auto',
    backgroundColor: theme.palette.primary.main,
    [theme.breakpoints.down('xl')]: {
      width: '10vw',
    },
    [theme.breakpoints.down('md')]: {
      width: '13vw',
    },
    [theme.breakpoints.down('xs')]: {
      width: '28vw',
      fontSize: '0.5rem',
    },
    '&::-webkit-scrollbar': {
      width: '0.6rem',
    },
    '&::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
      webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
      backgroundColor: theme.palette.primary.main,
      opacity: '0.1',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: theme.palette.secondary.main,
      borderRadius: '10px',
    },
  },

  contentGrid: {
    flex: 1,
    padding: '1rem',
    overflow: 'auto',
    display: 'flex',
    marginLeft: '10%',
    [theme.breakpoints.down('lg')]: {
      marginLeft: '10vw',
    },
    [theme.breakpoints.down('md')]: {
      marginLeft: '13vw',
    },
    [theme.breakpoints.down('xs')]: {
      marginLeft: '28vw',
    },
  },
  menuSpacer: { flex: 0.11 },
  dasboardGrid: { flex: 0.9 },

  twoColumnLayoutMainGrid: {
    display: 'flex',
    padding: '0.2rem',
    [theme.breakpoints.down('xl')]: {
      flexDirection: 'row',
    },
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },
  sectionBg: { backgroundColor: theme.palette.bgColor.main },
  rightInfoSection: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    paddingInline: '0.2rem',
  },
  notificationsSection: {
    marginBlock: '0.2rem',

    backgroundColor: theme.palette.bgColor.secondary,
    flex: '0.25',
  },
  birthdaySection: {
    marginBlock: '0.2rem',
    backgroundColor: theme.palette.bgColor.secondary,
    flex: '0.45',
  },
  motivationSection: {
    marginBlock: '0.2rem',
    backgroundColor: theme.palette.bgColor.secondary,
    flex: '0.3',
  },
}));
const Layout = ({ children }) => {
  const classes = useStyles();
  const location = useLocation();

  return (
    <Box className={classes.root}>
      {location.pathname === '/' && (
        <Grid xs={12} className={classes.rootGrid}>
          <Grid item className={classes.headerGrid}>
            <Header />
          </Grid>
          {children}
        </Grid>
      )}
      {location.pathname !== '/' && (
        <Grid xs={12} className={classes.rootGrid}>
          <Grid item className={classes.headerGrid}>
            <Header />
          </Grid>
          <Grid item className={classes.bodyGrid}>
            <Grid item id="newmenu" className={classes.menuGrid}>
              <SideMenu />
            </Grid>
            <Grid item id="newmenu" className={classes.contentGrid}>
              {twoColumnLayoutRouteNames &&
              (twoColumnLayoutRouteNames.includes(location.pathname.slice(1)) ||
                location.pathname === '/') ? (
                <>
                  <Grid xs={12} className={classes.twoColumnLayoutMainGrid}>
                    <Grid xs={12} lg={9}>
                      {children}
                    </Grid>
                    <Grid xs={12} lg={3}>
                      <RightInfoPanel />
                    </Grid>
                  </Grid>
                </>
              ) : (
                <> {children}</>
              )}
            </Grid>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default Layout;
