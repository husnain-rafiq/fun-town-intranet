import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Box } from '@material-ui/core';

const Loading = () => (
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    height={1}
    width={1}
  >
    <CircularProgress size={60} color="primary" />
  </Box>
);

export { Loading };
