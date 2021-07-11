import React, { memo, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import CancelIcon from '@material-ui/icons/Cancel';
import useStyles from './style';
import { H6, BodyText } from '../typography';
import { useAuthContext } from '../../context/authContext';
import { colors } from '../../theme/colors';

export function AnnouncementNotification({ item }) {
  let notificationBackgroundColor;
  if (item.priority === 'high') {
    notificationBackgroundColor = colors.red;
  } else if (item.priority === 'medium') {
    notificationBackgroundColor = colors.orange;
  } else if (item.priority === 'low') {
    notificationBackgroundColor = colors.green;
  }
  const [isNotificationClosed, setIsNotificationClosed] = React.useState(true);
  const classes = useStyles();
  const { user, setUser } = useAuthContext();
  const closedAnnouncement = (user && user.announcement) || [];

  const onClose = () => {
    closedAnnouncement.push(item);
    setUser({ ...user, announcement: closedAnnouncement });
  };
  useEffect(() => {
    setIsNotificationClosed(true);
  }, [item]);
  return (
    <>
      <Collapse
        in={isNotificationClosed}
        onExited={onClose}
        timeout={{ exit: 500 }}
      >
        <Box
          width={1}
          height={1}
          p={2}
          mt={1}
          justifyContent="center"
          display="flex"
          className={classes.mainBox}
        >
          <Box width="0.22" alignSelf="center">
            <Box
              width="0.67"
              display="flex"
              justifyContent="center"
              alignItems="center"
              bgcolor={notificationBackgroundColor}
              className={classes.iconBox}
            >
              <NotificationsActiveIcon className={classes.icon} />
            </Box>
          </Box>
          <Box
            width="0.67"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Box mb={2}>
              <H6 color="dark">{item.title}</H6>
            </Box>
            <Box className={classes.textBox}>
              <BodyText color="dark">{item.description}</BodyText>
            </Box>
          </Box>
          <Box width="0.02" mb={2}>
            <CancelIcon
              onClick={() => setIsNotificationClosed(!isNotificationClosed)}
            />
          </Box>
        </Box>
      </Collapse>
    </>
  );
}

export default memo(AnnouncementNotification);
