import { Box } from '@material-ui/core';
import React from 'react';
import { EventCalendar } from '../events/calendar';

function EventCalendarHome({ eventList }) {
  return (
    <Box
      height={['55vh', '60vh', '60vh', '60vh']}
      p={2}
      width={[1, 1, 1, 1 / 2]}
      mr={[0, 0, 0, 8]}
      ml={[0, 0, 0, 8]}
    >
      <EventCalendar home eventList={eventList} />
    </Box>
  );
}

export default EventCalendarHome;
