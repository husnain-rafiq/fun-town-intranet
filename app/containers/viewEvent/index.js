import React, { memo } from 'react';
import { Helmet } from 'react-helmet';
import { useQuery } from 'react-query';
import { useParams } from 'react-router';
import { Loading } from '../../components/loading';
import { ViewEventPage } from '../../components/pages/viewEvent';
import { getEventById } from '../../state/queryFunctions';
import { keys } from '../../state/queryKeys';
import { Toast } from '../../utils/helper';

function ViewEvent() {
  const { id } = useParams();
  const { data, isLoading } = useQuery(keys.getEvent(id), getEventById, {
    refetchOnWindowFocus: false,
    onError: ({
      response: {
        data: { message },
      },
    }) => {
      Toast({
        icon: 'error',
        title: message || 'Some error occurred',
      });
    },
  });
  return (
    <>
      <Helmet>
        <title>View Event</title>
      </Helmet>
      {isLoading ? (
        <Loading />
      ) : (
        <ViewEventPage eventDetails={data?.data?.data} />
      )}
    </>
  );
}

export default memo(ViewEvent);
