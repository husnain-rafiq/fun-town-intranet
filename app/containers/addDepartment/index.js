import React, { memo } from 'react';
import { Helmet } from 'react-helmet';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useHistory, useParams } from 'react-router-dom';
import { Loading } from '../../components/loading';
import AddDepartmentPage from '../../components/pages/addDepartment';
import {
  createDepartment,
  getDepartmentById,
  updateDepartment,
} from '../../state/queryFunctions';
import { keys } from '../../state/queryKeys';
import { navigateTo, Toast } from '../../utils/helper';

function AddDepartment() {
  const history = useHistory();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery(
    keys.getDepartments(id),
    getDepartmentById,
    {
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
    }
  );
  const { mutate, isLoading: loading } = useMutation(
    id ? updateDepartment : createDepartment,
    {
      onSuccess: () => {
        Toast({
          icon: 'success',
          title: `Department ${id ? 'Updated' : 'Created'}  Successfully`,
        });
        queryClient.invalidateQueries(keys.departments);
        queryClient.invalidateQueries(keys.getDepartments);
        navigateTo(history, '/departments');
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
        <title>{id ? 'Edit' : 'Create'} Department</title>
      </Helmet>
      {isLoading || loading ? (
        <Loading />
      ) : (
        <AddDepartmentPage
          onHandleSubmit={handleSubmit}
          id={id}
          initialValues={id ? data?.data?.data : initialValues}
        />
      )}
    </>
  );
}

export default memo(AddDepartment);
