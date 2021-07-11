import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import { colors } from '../../theme/colors';

export const MuiTab = withStyles((theme) => ({
  root: {
    fontSize: theme.typography.pxToRem(15),
    border: `1px solid ${colors.darkGrey}`,
  },
}))((props) => <Tab disableRipple {...props} />);

export default MuiTab;
