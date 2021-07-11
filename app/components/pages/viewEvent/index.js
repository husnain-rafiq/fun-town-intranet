import { Box, Button } from '@material-ui/core';
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import WrapInBreadcrumbs from '../../layout/wrapInBreadcrumbs';
import WrapInCard from '../../layout/wrapInCard';
import { H5, H6 } from '../../typography';

export function ViewEventPage({
  eventDetails: { title, startDate, endDate, description, locationIds },
}) {
  const history = useHistory();

  return (
    <WrapInBreadcrumbs>
      <WrapInCard mb={8}>
        <Box ml={3}>
          <Box my={7}>
            <H5> View Event </H5>
          </Box>
          <Box pb={2}>
            <H6>Title:</H6>
            {title}
          </Box>
          <Box py={2}>
            <H6>Start Date:</H6>
            {new Date(startDate).toLocaleString()}
          </Box>
          <Box py={2}>
            <H6>End Date:</H6>
            {new Date(endDate).toLocaleString()}
          </Box>
          <Box pt={2}>
            <H6>Description:</H6>
            {description}
          </Box>
          <Box pt={2}>
            <H6>Locations:</H6>
            {locationIds?.map((location) => (
              <Box>- {location.name}</Box>
            ))}
          </Box>
          <Box mt={10}>
            <Button
              variant="text"
              startIcon={<KeyboardBackspaceIcon />}
              onClick={() => history.goBack()}
            >
              Back
            </Button>
          </Box>
        </Box>
      </WrapInCard>
    </WrapInBreadcrumbs>
  );
}

ViewEventPage.propTypes = {
  eventDetails: PropTypes.object,
};
ViewEventPage.defaultProps = {
  eventDetails: {
    title: '',
    startDate: new Date(),
    endDate: new Date(),
    description: '',
  },
};

export default memo(ViewEventPage);
