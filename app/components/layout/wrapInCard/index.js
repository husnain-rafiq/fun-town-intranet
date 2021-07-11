import { Card } from '@material-ui/core';
import React from 'react';
import Box from '@material-ui/core/Box';

export default function WrapInCard({ children, ...props }) {
  return (
    <>
      <Box width={1} {...props}>
        <Card>
          <Box p={4}>{children}</Box>
        </Card>
      </Box>
    </>
  );
}
