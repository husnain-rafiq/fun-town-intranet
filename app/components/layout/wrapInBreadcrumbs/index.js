import { Box } from '@material-ui/core';
import React from 'react';
import Breadcrumbs from '../../breadCrumbs';

function index({ children, ...props }) {
  return (
    <Box display="block" width={1} {...props}>
      <Box width={1} p={4} pb={6}>
        <Breadcrumbs />
      </Box>
      <Box>{children}</Box>
    </Box>
  );
}

export { index as default };
