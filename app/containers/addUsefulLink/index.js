import React, { memo } from 'react';
import { Helmet } from 'react-helmet';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useHistory, useParams } from 'react-router';
import { AddUsefulLinkPage } from '../../components/pages/addUsefulLink';
import {
  createLink,
  getLinkById,
  updateLink,
  getCategories,
} from '../../state/queryFunctions';
import { keys } from '../../state/queryKeys';
import { navigateTo, Toast } from '../../utils/helper';
import { Loading } from '../../components/loading';

function AddUsefulLink() {
  const history = useHistory();
  const { id, categoryId } = useParams();
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery(
    keys.getLink(id),
    () => getLinkById(id),
    {
      enabled: !!id,
    }
  );
  const { data: categories, isCategoryLoading } = useQuery(
    keys.getCategories,
    getCategories
  );

  const mutation = useMutation(id ? updateLink : createLink, {
    onSuccess: () => {
      navigateTo(history, `/link-categories/useful-links/${categoryId}`);
      Toast({
        icon: 'success',
        title: `Link ${id ? 'updated' : 'created'}  successfully`,
      });
      if (id) {
        queryClient.invalidateQueries(keys.getLink(id));
      }
      queryClient.invalidateQueries(keys.getLink(categoryId));
    },
    onError: ({
      response: {
        data: { message },
      },
    }) => {
      Toast({
        icon: 'error',
        title: message || 'Some error occured',
      });
    },
  });
  const handleSubmit = (values) => {
    mutation.mutate(values);
  };

  const options = categories?.data.data.map((val) => ({
    value: val.id,
    label: val.name,
  }));
  const initialValues = { name: '', url: '', categoryId };

  return (
    <>
      <Helmet>
        <title>Useful Links</title>
      </Helmet>
      {isLoading || isCategoryLoading ? (
        <Loading />
      ) : (
        <AddUsefulLinkPage
          id={id}
          onHandleSubmit={handleSubmit}
          initialValues={id ? data?.data.data : initialValues}
          history={history}
          options={options}
        />
      )}
    </>
  );
}

export default memo(AddUsefulLink);
