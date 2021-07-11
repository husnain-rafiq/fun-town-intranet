import React, { memo } from 'react';
import { Calendar, Views, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useHistory } from 'react-router-dom';
import { Box, useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { CustomToolbar } from './customToolbar';
import { useAuthContext } from '../../../context/authContext';
import { ROLES } from '../../../utils/constants';
import { formatDate, navigateTo } from '../../../utils/helper';

export function EventCalendar({ eventList, home }) {
  const history = useHistory();
  const localizer = momentLocalizer(moment); // or globalizeLocalizer
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  const {
    user: { data },
  } = useAuthContext();

  const handleSelectEvent = (event) => {
    if (data.role === ROLES.ADMIN)
      navigateTo(history, `/events/edit/${event.id}`);
    else if (data.role === ROLES.USER)
      navigateTo(history, `/events/view/${event.id}`);
  };
  const dayFormat = () => {
    if (home || matches) {
      return 'dd';
    }

    return 'dddd';
  };
  const formats = {
    weekdayFormat: (date, culture, weekLocalizer) =>
      weekLocalizer.format(date, `${dayFormat()}`, culture),
  };
  const handleEventPropGetter = () => {
    const eventStyle = {
      backgroundColor: theme.palette.secondary.main,
    };
    return { style: eventStyle };
  };
  const handleOnMouseOver = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };
  const calendarEvents = eventList.map((val) => ({
    id: val.id,
    title: val.title,
    start: val.startDate,
    end: val.endDate,
    description: val.description,
  }));

  return (
    <Calendar
      formats={formats}
      selectable
      localizer={localizer}
      events={calendarEvents}
      resizable
      views={{ month: true }}
      defaultView={Views.MONTH}
      defaultDate={new Date()}
      popup
      onSelectEvent={handleSelectEvent}
      tooltipAccessor={(event) =>
        `${formatDate(event?.start)} - ${formatDate(event?.end)}`
      }
      components={{
        toolbar: CustomToolbar({ home, data }),
      }}
      eventPropGetter={handleEventPropGetter}
      messages={{
        showMore: (total) => (
          <Box onMouseOver={handleOnMouseOver} color="text.secondary">
            {`+${total} more`}
          </Box>
        ),
      }}
    />
  );
}

EventCalendar.propTypes = {
  eventList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      allDay: PropTypes.bool,
      startDate: PropTypes.instanceOf(Date).isRequired,
      endDate: PropTypes.instanceOf(Date).isRequired,
    })
  ),
};
EventCalendar.defaultProps = {
  eventList: [],
};

export default memo(EventCalendar);
