import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import AnnouncementNotification from '../../announcementNotification';
import BirthdayCarousel from '../../birthdayCard';
import { keys } from '../../../state/queryKeys';
import { useAuthContext } from '../../../context/authContext';
import {
  getBirthdays,
  getQuote,
  retrieveActiveAnnouncements,
  getWorkAnniversaries,
} from '../../../state/queryFunctions';
import BoxWithBg from '../../boxWithBg';
import { H6 } from '../../typography';
import WorkAnniversaryCard from '../../workAnniversary';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    margin: '0 1.2rem',
    ' & > div': {
      marginBottom: '1rem',
    },
  },
  motivationSection: {
    minHeight: 80,
    whiteSpace: 'pre-line',
  },
}));
function Index() {
  const classes = useStyles();
  const { data } = useQuery(keys.birthday, getBirthdays, {
    refetchOnWindowFocus: true,
  });
  const { data: workAnniversaryData } = useQuery(
    keys.workAnniversary,
    getWorkAnniversaries
  );
  const { data: quoteData } = useQuery(keys.quote, getQuote);
  const { data: announcementData } = useQuery(
    keys.announcements,
    retrieveActiveAnnouncements,
    { refetchOnWindowFocus: true }
  );

  const birthdays = data?.data?.data || [];
  const workAnniversary = workAnniversaryData?.data?.data || [];
  const quote = quoteData?.data?.data;
  let activeAnnouncements = [];
  const { user } = useAuthContext();
  const { announcement = [] } = user;
  const [filterArray, setFilterArray] = useState([]);

  useEffect(() => {
    activeAnnouncements = announcementData?.data?.data?.filter(
      (row) =>
        !announcement.find(
          (localAnnouncement) => row.id === localAnnouncement.id
        )
    );

    setFilterArray(activeAnnouncements);
  }, [announcementData, user]);

  return (
    <>
      <Grid xs={12} className={classes.root}>
        {filterArray?.map((item) => (
          <Grid xs={12}>
            <AnnouncementNotification item={item} />
          </Grid>
        ))}

        {birthdays.length > 0 && (
          <Grid xs={12}>
            <BirthdayCarousel items={birthdays} />
          </Grid>
        )}

        {workAnniversary.length > 0 && (
          <Grid xs={12}>
            <WorkAnniversaryCard items={workAnniversary} />
          </Grid>
        )}

        <Grid xs={12}>
          {quote && (
            <BoxWithBg
              styles={classes.motivationSection}
              title="Daily Dose of Motivation"
              bgColor="secondary.main"
            >
              <H6>{quote}</H6>
            </BoxWithBg>
          )}
        </Grid>
      </Grid>
    </>
  );
}

export default Index;
