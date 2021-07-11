import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';

function TabPanel({ children, value, index, ...other }) {
  return (
    value === index && (
      <Box
        id={`vertical-tabpanel-${index}`}
        width={[1, 1, 1 / 2, 1 / 2]}
        {...other}
      >
        <Box px={[0, 0, 0, 3]}>{children}</Box>
      </Box>
    )
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

export default TabPanel;
