import React, { memo } from 'react';
import { Helmet } from 'react-helmet';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useHistory, useParams } from 'react-router';
import { Loading } from '../../components/loading';
import CreateBlogPage from '../../components/pages/createBlog';
import {
  createBlog,
  getBlogById,
  updateBlog,
} from '../../state/queryFunctions';
import { keys } from '../../state/queryKeys';
import { navigateTo, Toast } from '../../utils/helper';

function CreateBlog() {
  const { id } = useParams();
  const history = useHistory();
  const queryClient = useQueryClient();

  const { data, isLoading: isListLoading } = useQuery(
    keys.getBlog(id),
    getBlogById,
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
  const { mutate, isLoading } = useMutation(id ? updateBlog : createBlog, {
    onSuccess: () => {
      Toast({
        icon: 'success',
        title: `Blog ${id ? 'Updated' : 'Created'}  Successfully`,
      });
      navigateTo(history, '/blogs');
      queryClient.invalidateQueries(keys.blog);
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
  });
  const handleSubmit = (values) => {
    const filteredContent = values.content.replace(
      /(<br\s*\/?>|&nbsp;)/gm,
      ' '
    );
    const formData = new FormData();
    if (id) formData.append('id', id);
    formData.append('title', values.title);
    formData.append('content', filteredContent);
    formData.append('file', values?.file?.file);
    mutate(formData);
  };
  const initialValues = {
    title: data?.data?.data?.title || '',
    content: data?.data?.data?.content || '',
    file: data?.data?.data?.thumbnail || '',
  };
  return (
    <>
      <Helmet>
        <title>{id ? 'Edit' : 'Create'} Blog</title>
      </Helmet>
      {isListLoading || isLoading ? (
        <Loading />
      ) : (
        <CreateBlogPage
          onHandleSubmit={handleSubmit}
          id={id}
          initialValues={initialValues}
        />
      )}
    </>
  );
}

export default memo(CreateBlog);
