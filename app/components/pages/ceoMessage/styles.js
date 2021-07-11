import { makeStyles } from '@material-ui/core/styles';
import Image from '../../../images/backgroundImage.png';
import { colors } from '../../../theme/colors';

const useStyles = makeStyles((theme) => ({
  backgroundImage: {
    height: '29rem',
    width: '30rem',
    backgroundImage: `url(${Image})`,
    margin: 'auto',
    [theme.breakpoints.down('xs')]: {
      height: '30vh',
      width: '100%',
      backgroundSize: 'cover',
    },
  },
  ceoImage: {
    height: '80%',
    width: '80%',
    borderRadius: '50%',
    [theme.breakpoints.down('xs')]: {
      height: '22vh',
      width: ' 80%',
    },
  },
  editIcon: {
    color: colors.secondary,
    cursor: 'pointer',
  },
  rightBox: {
    float: 'right',
  },
  lineBreak: {
    whiteSpace: 'pre-wrap',
  },
}));
export { useStyles };
