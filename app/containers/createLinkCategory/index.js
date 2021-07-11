import React, { memo } from 'react';
import { Helmet } from 'react-helmet';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useHistory, useParams } from 'react-router';
import { Loading } from '../../components/loading';
import CreateLinkCategoryPage from '../../components/pages/createLinkCategory';
import {
  createLinkCategory,
  getLinkCategoryById,
  updateLinkCategory,
} from '../../state/queryFunctions';
import { keys } from '../../state/queryKeys';
import { navigateTo, Toast } from '../../utils/helper';

function CreateLinkCategory() {
  const { id } = useParams();
  const history = useHistory();
  const queryClient = useQueryClient();

  const { data, isLoading: isCategoryLoading } = useQuery(
    keys.getLinkCategory(id),
    getLinkCategoryById,
    {
      enabled: !!id,
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

  const { mutate, isLoading } = useMutation(
    id ? updateLinkCategory : createLinkCategory,
    {
      onSuccess: () => {
        Toast({
          icon: 'success',
          title: `Category ${id ? 'Updated' : 'Created'}  Successfully`,
        });
        navigateTo(history, '/link-categories');
        queryClient.invalidateQueries(keys.linkCategory);
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
        <title>{id ? 'Edit' : 'Create'} Link Category</title>
      </Helmet>
      {isCategoryLoading || isLoading ? (
        <Loading />
      ) : (
        <CreateLinkCategoryPage
          onHandleSubmit={handleSubmit}
          id={id}
          initialValues={id ? data?.data?.data : initialValues}
        />
      )}
    </>
  );
}

export default memo(CreateLinkCategory);
