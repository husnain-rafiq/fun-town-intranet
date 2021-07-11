import React from 'react';
import Box from '@material-ui/core/Box';
import EditIcon from '@material-ui/icons/Edit';
import { useHistory } from 'react-router-dom';
import { Avatar } from '@material-ui/core';
import { H5, BodyTextLarge } from '../../typography';
import { useStyles } from './styles';
import { useAuthContext } from '../../../context/authContext';
import { ROLES } from '../../../utils/constants';
import { navigateTo } from '../../../utils/helper';

export default function CeoMessage({ ceoMessageData }) {
  const classes = useStyles();
  const history = useHistory();
  const {
    user: {
      data: { role },
    },
  } = useAuthContext();

  return (
    <>
      <Box width={[1, 1, 1, '30%']} display="flex" className={classes.rightBox}>
        <Box
          className={classes.backgroundImage}
          height={1}
          width={1}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Avatar
            className={classes.ceoImage}
            src={ceoMessageData.avatar}
            alt="person"
          ></Avatar>
        </Box>
      </Box>
      <Box width={[1, 1, 1, '68%']} p={2} m={2} mt={5} display="flex" mb={4}>
        <Box width={1 / 2}>
          <H5>CEO Message</H5>
        </Box>
        {role === ROLES.ADMIN && (
          <Box width={1 / 2} display="flex" justifyContent="flex-end">
            <EditIcon
              className={classes.editIcon}
              onClick={() => navigateTo(history, '/ceo-message/edit')}
            />{' '}
          </Box>
        )}
      </Box>
      <Box p={2} m={2}>
        <BodyTextLarge className={classes.lineBreak}>
          {' '}
          {ceoMessageData.content}
        </BodyTextLarge>
      </Box>
    </>
  );
}
