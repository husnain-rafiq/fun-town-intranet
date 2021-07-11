import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';

const MuiTabs = withStyles(() => ({
  indicator: {
    '& > span': {
      width: '100%',
    },
  },
}))((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

export default MuiTabs;
