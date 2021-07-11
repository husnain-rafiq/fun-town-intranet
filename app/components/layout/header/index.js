import { AppBar, Avatar, Box, Hidden, Menu, Toolbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import React, { useState } from 'react';
import { PowerSettingsNew, AccountCircle } from '@material-ui/icons';
import Button from '@material-ui/core/Button';
import { Link, useHistory } from 'react-router-dom';
import { H5, H6, MenuItem, ListItemIcon } from 'components';
import { useGoogleLogout } from 'react-google-login';
import { useQueryClient } from 'react-query';
import { useAuthContext } from '../../../context/authContext';
import Logo from '../../../images/logo.png';
import { navigateTo } from '../../../utils/helper';

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: 'white',
    height: theme.defaultHeights.header,
    color: theme.palette.primary.main,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  toolbar: { display: 'flex', justifyContent: 'space-between' },
  title: {
    flexGrow: 1,
  },
  logoStyle: {
    width: 150,
    marginTop: theme.spacing(3.3),
  },
  profileBox: {
    display: 'flex',
  },
  titleBox: { display: 'flex', marginInline: '1em', alignItems: 'flex-end' },
  welcomeTextBox: { marginTop: '0.2rem' },
}));

export default function Header() {
  const classes = useStyles();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);
  const { user, setUser } = useAuthContext();
  const queryClient = useQueryClient();
  const userAvatar = user.data.avatar;
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const handleClick = (event) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClickProfile = () => {
    navigateTo(history, '/profile');
    setAnchorEl(null);
  };

  // INITIALIZING
  useGoogleLogout({
    clientId,
    cookiePolicy: 'single_host_origin',
  });
  const onGoogleLogout = () => {
    const auth2 = window.gapi.auth2.getAuthInstance();
    if (auth2 != null) {
      auth2.signOut().then(auth2.disconnect());
    }
  };
  const handleLogout = () => {
    onGoogleLogout();
    setUser({
      announcement: [],
      data: {},
      isAuthenticated: false,
      token: null,
    });
    queryClient.invalidateQueries();
  };
  return (
    <>
      <AppBar position="absolute" className={clsx(classes.appBar)}>
        <Toolbar className={classes.toolbar}>
          <Link to="/home">
            <img src={Logo} alt="intranet logo" className={classes.logoStyle} />
          </Link>
          {user.isAuthenticated && (
            <Box className={classes.profileBox}>
              <Hidden xsDown>
                <Box className={classes.titleBox}>
                  <Box className={classes.welcomeTextBox} mr={2}>
                    <H6 regular color="primary">
                      Welcome Back,
                    </H6>
                  </Box>
                  <H5 medium color="primary">
                    {user.data.name}!
                  </H5>
                </Box>
              </Hidden>
              <>
                <Button onClick={handleClick}>
                  <Avatar src={userAvatar} />
                </Button>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                  elevation={0}
                  getContentAnchorEl={null}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                  }}
                >
                  <MenuItem onClick={handleClickProfile}>
                    <ListItemIcon>
                      <AccountCircle />
                    </ListItemIcon>
                    Profile
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                      <PowerSettingsNew />
                    </ListItemIcon>
                    Logout
                  </MenuItem>
                </Menu>
              </>
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
}
