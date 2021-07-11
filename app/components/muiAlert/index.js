import Alert from '@material-ui/lab/Alert';
import { withStyles } from '@material-ui/styles';

const StyledAlert = withStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
})(Alert);

export default StyledAlert;
