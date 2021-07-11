import { makeStyles } from '@material-ui/core/styles';
import img from '../../images/photoBg.png';

export const useStyles = makeStyles((theme) => ({
  backgroundgrid: {
    backgroundRepeat: 'no-repeat',
    backgroundImage: `url(${img})`,
    backgroundSize: 'cover',
    backgroundPosition: '100% 100%',
    padding: '5px',
  },
  textBox: {
    overflowWrap: 'break-word',
  },
  birthdayText: {
    display: 'block',
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
    },
  },
  imgStyle: {
    border: '5px solid ',
    borderColor: 'white',
    borderRadius: '50%',
    width: '76px',
    height: '76px',
    marginTop: '15px',
    marginRight: '5px',
  },
  inline: {
    display: 'inline',
  },
}));
