import React, { memo } from 'react';
import { Helmet } from 'react-helmet';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useHistory, useParams } from 'react-router-dom';
import { Loading } from '../../components/loading';
import { CreateEventPage } from '../../components/pages/createEvent';
import { useDeleteEvent } from '../../hooks/event';
import {
  createEvent,
  getEventById,
  updateEvent,
  getLocations,
} from '../../state/queryFunctions';
import { keys } from '../../state/queryKeys';
import { Modal, navigateTo, Toast, addHourToDate } from '../../utils/helper';

function CreateEvent() {
  const { data: locationData, isLoading: isLocationLoading } = useQuery(
    keys.locations,
    getLocations
  );
  const history = useHistory();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const today = new Date();
  const { data, isLoading } = useQuery(keys.getEvent(id), getEventById, {
    enabled: !!id,
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
  const { mutate, isLoading: loading } = useMutation(
    id ? updateEvent : createEvent,
    {
      onSuccess: () => {
        Toast({
          icon: 'success',
          title: `Event ${id ? 'Updated' : 'Created'}  Successfully`,
        });
        queryClient.invalidateQueries(keys.getEvent(id));
        navigateTo(history, '/events');
      },
      onError: ({
        response: {
          data: { message },
        },
      }) =>
        Toast({
          icon: 'error',
          title: message || 'Some error occurred',
        }),
    }
  );
  const mutation = useDeleteEvent();
  const handleSubmit = (values) => {
    const dataValues = { ...values };
    const locationIds = dataValues.locationIds.map((location) => location.id);
    dataValues.locationIds = locationIds;
    mutate(dataValues);
  };
  const handleDeleteEvent = () => {
    Modal.fire().then(({ isConfirmed }) => {
      if (isConfirmed) {
        mutation.mutate([id]);
      }
    });
  };
  const endDate = addHourToDate(new Date(), 1);

  const initialValues = {
    title: '',
    startDate: today,
    endDate,
    description: '',
    locationIds: [],
  };
  const onLoading = () => {
    if (isLoading || isLocationLoading || loading || mutation.isLoading) {
      return true;
    }
    return false;
  };
  return (
    <>
      <Helmet>
        <title>{id ? 'Edit' : 'Create'} Event</title>
      </Helmet>
      {onLoading() ? (
        <Loading />
      ) : (
        <CreateEventPage
          onHandleSubmit={handleSubmit}
          id={id}
          initialValues={id ? data?.data?.data : initialValues}
          pageTitle={id ? 'Update' : 'Create New'}
          onHandleDeleteEvent={handleDeleteEvent}
          locationData={locationData?.data?.data?.rows}
        />
      )}
    </>
  );
}

export default memo(CreateEvent);
