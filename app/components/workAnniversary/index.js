import { Box } from '@material-ui/core';
import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { makeStyles } from '@material-ui/core/styles';
import BoxWithBg from '../boxWithBg';
import WorkAnniversaryCard from './workAnniversaryCard';
import { colors } from '../../theme/colors';

const useStyles = makeStyles(() => ({
  bgImage: {
    backgroundImage: colors.darkBlue,
  },
}));

export function WorkAnniversaryCarousel({ items }) {
  const classes = useStyles();
  return (
    <>
      {items?.length >= 1 && (
        <Box>
          <BoxWithBg title="Work Anniversary" styles={classes.bgImage}>
            <Carousel
              autoPlay
              animation="fade"
              navButtonsAlwaysInvisible
              indicators={items?.length !== 1}
            >
              {items?.map((item) => (
                <WorkAnniversaryCard item={item} />
              ))}
            </Carousel>
          </BoxWithBg>
        </Box>
      )}
    </>
  );
}

export default WorkAnniversaryCarousel;
