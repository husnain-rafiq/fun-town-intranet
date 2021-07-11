import { Box, Button, IconButton, Link } from '@material-ui/core';
import React, { memo } from 'react';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import AddIcon from '@material-ui/icons/Add';
import { H5 } from '../../typography';
import { ROLES } from '../../../utils/constants';

export const CustomToolbar = ({ home, data: { role } }) => ({
  label,
  onNavigate,
}) => {
  const navigate = (action) => {
    onNavigate(action);
  };

  return (
    <>
      {role === ROLES.ADMIN && !home && (
        <Box mb={5}>
          <Link href="/events/add" underline="none">
            <Button
              variant="contained"
              color="secondary"
              startIcon={<AddIcon />}
            >
              New Event
            </Button>
          </Link>
        </Box>
      )}
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        bgcolor="secondary.main"
      >
        <IconButton onClick={() => navigate('PREV')}>
          <Box color="text.light">
            <ArrowBackIosIcon />
          </Box>
        </IconButton>
        <H5 color="light">{label}</H5>
        <IconButton onClick={() => navigate('NEXT')}>
          <Box color="text.light">
            <ArrowForwardIosIcon />
          </Box>
        </IconButton>
      </Box>
      <Box />
    </>
  );
};

export default memo(CustomToolbar);
