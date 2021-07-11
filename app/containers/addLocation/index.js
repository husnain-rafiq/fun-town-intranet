import React, { memo } from 'react';
import { Helmet } from 'react-helmet';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useHistory, useParams } from 'react-router-dom';
import { Loading } from '../../components/loading';
import AddLocationPage from '../../components/pages/addLocation';
import {
  createLocation,
  getLocationById,
  updateLocation,
} from '../../state/queryFunctions';
import { keys } from '../../state/queryKeys';
import { navigateTo, Toast } from '../../utils/helper';

function AddLocation() {
  const history = useHistory();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery(keys.getLocation(id), getLocationById, {
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
    id ? updateLocation : createLocation,
    {
      onSuccess: () => {
        Toast({
          icon: 'success',
          title: `Location ${id ? 'Updated' : 'Created'}  Successfully`,
        });
        queryClient.invalidateQueries(keys.locations);
        queryClient.invalidateQueries(keys.getLocation);
        navigateTo(history, '/locations');
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
  const handleSubmit = (values) => {
    mutate(values);
  };

  const initialValues = {
    name: '',
  };
  return (
    <>
      <Helmet>
        <title>{id ? 'Edit' : 'Create'} Location</title>
      </Helmet>
      {isLoading || loading ? (
        <Loading />
      ) : (
        <AddLocationPage
          onHandleSubmit={handleSubmit}
          id={id}
          initialValues={id ? data?.data?.data : initialValues}
        />
      )}
    </>
  );
}

export default memo(AddLocation);
