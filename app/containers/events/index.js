import React, { memo } from 'react';
import { Helmet } from 'react-helmet';
import { useQuery } from 'react-query';
import { Loading } from '../../components/loading';
import { EventsPage } from '../../components/pages/events';
import { fetchEvents } from '../../state/queryFunctions';
import { keys } from '../../state/queryKeys';

function Events() {
  const { data, isLoading } = useQuery(keys.events, fetchEvents);
  return (
    <>
      <Helmet>
        <title>Company Events</title>
      </Helmet>
      {isLoading ? (
        <Loading />
      ) : (
        <EventsPage isLoading={isLoading} eventList={data?.data?.data?.rows} />
      )}
    </>
  );
}

export default memo(Events);
