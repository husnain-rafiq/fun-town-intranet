import { ListItemIcon } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const MuiListItemIcon = withStyles((theme) => ({
  root: {
    minWidth: '24px',
    marginRight: theme.spacing(4),
    fontSize: '24px',
  },
}))(ListItemIcon);
export default MuiListItemIcon;
