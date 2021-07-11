import { Box, Grid } from '@material-ui/core';
import React from 'react';
import EventCalendarHome from './calendar';
import PollHome from './poll';
import BannerImageHome from './bannerImage';
import { useStyles } from './style';

function Home({
  eventList,
  pollData,
  isImageLoading,
  onHandleImageChange,
  fileName,
}) {
  const classes = useStyles();
  return (
    <>
      <Grid xs={12} className={classes.root}>
        <BannerImageHome
          isImageLoading={isImageLoading}
          onHandleImageChange={onHandleImageChange}
          fileName={fileName}
        />

        <Grid xs={12} className={classes.statsSection}>
          <Box
            m={[2, 2, 2, 10]}
            display="flex"
            flexDirection={['column', 'column', 'column', 'row']}
          >
            <EventCalendarHome eventList={eventList} />
            <PollHome pollData={pollData} />
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default Home;
