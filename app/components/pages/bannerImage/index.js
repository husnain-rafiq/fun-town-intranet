import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { Box } from '@material-ui/core';

const BannerImage = ({ bannerImageURL }) => {
  const useStyles = makeStyles({
    bannerImage: {
      backgroundImage: `url(${bannerImageURL})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      width: '100%',
      backgroundPosition: 'center',
      height: '32vh',
    },
  });

  const classes = useStyles();
  return <Box display="flex" className={classes.bannerImage} />;
};
export default BannerImage;
