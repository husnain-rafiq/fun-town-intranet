import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  mainBox: {
    backgroundColor: theme.palette.bgColor.secondary,
    borderRadius: '6px',
    minHeight: '120px',
  },
  icon: {
    fontSize: '3em',
    color: theme.palette.bgColor.secondary,
  },
  iconBox: {
    height: '3.5rem',
    borderRadius: '6px',
  },

  textBox: {
    overflowWrap: 'break-word',
  },
}));
export default useStyles;
