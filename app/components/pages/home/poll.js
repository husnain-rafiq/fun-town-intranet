import { Box } from '@material-ui/core';
import React from 'react';
import { Poll } from '../../poll';

function PollHome({ pollData }) {
  return (
    <>
      {pollData && (
        <Box p={2} mr={[0, 0, 0, 8]} ml={[0, 0, 0, 8]} width={[1, 1, 1, 1 / 2]}>
          <Poll
            name={pollData.name}
            description={pollData.description}
            options={pollData.options}
          />
        </Box>
      )}
    </>
  );
}

export default PollHome;
