import React, { memo } from 'react';
import Box from '@material-ui/core/Box';
import moment from 'moment';
import PropTypes from 'prop-types';
import { BodyTextLarge, BodyTextSmall } from '../../typography';

function BlogCreatorInfo({ user, createdAt }) {
  const date = new Date(createdAt);
  const creationDate = moment(date).format('MMMM DD, YYYY');

  return (
    <>
      <Box>
        <BodyTextLarge fontWeight="fontWeightMedium" color="grey">
          {`${user.firstName}${' '}${user.lastName}`}
        </BodyTextLarge>
      </Box>
      <Box mt={1} mb={5}>
        <BodyTextSmall color="grey">{creationDate}</BodyTextSmall>
      </Box>
    </>
  );
}

BlogCreatorInfo.propTypes = {
  user: PropTypes.object,
  createdAt: PropTypes.string,
};
export default memo(BlogCreatorInfo);
