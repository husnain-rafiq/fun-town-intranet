/**
 *
 * login
 *
 */

import React, { memo } from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';
import Button from '@material-ui/core/Button';
import { Form, Formik } from 'formik';
import Alert from '@material-ui/lab/Alert';
import { GoogleLogin } from 'react-google-login';
import { Input } from '../../index';
import { loginSchema } from '../../../containers/login/schema';
import { H3 } from '../../typography';
import useStyles from './style';

export function Login({
  onHandleSubmit,
  googleError,
  errorMessage,
  onGoogleSuccess,
  onGoogleFailed,
}) {
  const classes = useStyles();
  const domain = process.env.GSUITE_DOMAIN;
  const clientId = process.env.GOOGLE_CLIENT_ID;

  return (
    <Box className={classes.bgContainer} h="100%" width={1}>
      <Container component="main" maxWidth="xs">
        <Box className={classes.loginContainer}>
          <Box className={classes.welcomBox}>
            <H3 color="light">Welcome!</H3>
          </Box>
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            validationSchema={loginSchema}
            onSubmit={(values) => {
              onHandleSubmit(values);
            }}
          >
            <Form>
              <Paper className={classes.loginBox}>
                {errorMessage && (
                  <Box mt={6} textAlign="center">
                    <Alert severity="error">{errorMessage}</Alert>
                  </Box>
                )}
                {googleError && (
                  <Box mt={6} textAlign="center">
                    <Alert severity="error">{googleError}</Alert>
                  </Box>
                )}
                <Box mt={7}>
                  <Input
                    name="email"
                    placeholderText="Email"
                    Icon={EmailIcon}
                    appendIcon
                    IconClickable={false}
                  />
                </Box>
                <Box my={5}>
                  <Input
                    type="password"
                    name="password"
                    placeholderText="Password"
                    Icon={LockIcon}
                    appendIcon
                    IconClickable={false}
                  />
                </Box>
                <Box className={classes.centerAlign}>
                  <Button
                    className={classes.loginBtn}
                    variant="contained"
                    color="primary"
                    type="submit"
                  >
                    Login
                  </Button>
                  <Box mt={5}>
                    <GoogleLogin
                      clientId={clientId}
                      buttonText="Login with Google"
                      onSuccess={(res) => onGoogleSuccess(res)}
                      onFailure={(e) => onGoogleFailed(e)}
                      cookiePolicy="single_host_origin"
                      theme="dark"
                      hostedDomain={domain}
                    />
                  </Box>
                </Box>
              </Paper>
            </Form>
          </Formik>
        </Box>
      </Container>
    </Box>
  );
}

export default memo(Login);
