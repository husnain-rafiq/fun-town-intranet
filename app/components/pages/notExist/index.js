import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';
import { H5 } from '../../typography';

const useStyles = makeStyles(() => ({
  iconImage: {
    width: '10%',
    height: '10%',
  },
}));

export function NotExist({ Icon, description }) {
  const classes = useStyles();

  return (
    <>
      <Box m={4}>
        <Box flexDirection="column">
          <Box display="flex" justifyContent="center" alignItems="center">
            <Icon color="disabled" className={classes.iconImage} />
          </Box>
          <Box mt={6} mb={18} display="flex" justifyContent="center">
            <H5 fontWeight="fontWeightMedium" color="grey">
              {description}
            </H5>
          </Box>
        </Box>
      </Box>
    </>
  );
}
NotExist.propTypes = {
  description: PropTypes.string,
  Icon: PropTypes.object,
};
export default NotExist;
