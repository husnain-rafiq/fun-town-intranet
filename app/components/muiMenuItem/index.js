import { MenuItem } from '@material-ui/core';

import { withStyles } from '@material-ui/core/styles';

const MuiMenuItem = withStyles((theme) => ({
  root: {
    padding: `${theme.spacing(1)} ${theme.spacing(6)}`,
  },
}))(MenuItem);
export default MuiMenuItem;
