import { withStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';

const MuiCheckbox = withStyles((theme) => ({
  root: {
    color: theme.palette.checkbox.main,
    '&$checked': {
      '& .MuiIconButton-label': {
        position: 'relative',
        zIndex: 0,
        color: theme.palette.checkbox.main,
      },
      '& .MuiIconButton-label:after': {
        content: '""',
        height: 15,
        width: 15,
        position: 'absolute',
        backgroundColor: theme.palette.checkbox.secondary,
        zIndex: -1,
      },
    },
  },
  checked: {},
}))(Checkbox);
export default MuiCheckbox;
