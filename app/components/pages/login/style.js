import { makeStyles } from '@material-ui/core/styles';
import bg from '../../../images/LoginPng.png';

const useStyles = makeStyles((theme) => ({
  bgContainer: {
    backgroundImage: `url(${bg})`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '50%',
    height: '80vh',
    '@media (max-width:991px)': {
      backgroundPosition: '0% 0%',
    },
  },
  loginContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    justifyContent: 'center',
  },
  welcomBox: {
    position: 'relative',
    zIndex: '1',
    background: theme.palette.primary.main,
    padding: '20px 80px',
    color: '#fff',
    textAlign: 'center',
    borderRadius: '10px',
    margin: '0 15px',
    boxShadow: '0px 3px 6px #00000029',
  },
  loginBox: {
    position: 'relative',
    zIndex: '0',
    marginTop: '-50px',
    padding: '50px 50px',
    borderRadius: '10px',
  },
  loginBtn: {
    padding: '9px 0',
    width: '54%',
  },
  centerAlign: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  error: {
    color: theme.palette.text.error,
    textAlign: theme.palette.text.error,
  },
}));
export default useStyles;
