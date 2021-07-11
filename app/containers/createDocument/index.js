import React, { memo } from 'react';
import { Helmet } from 'react-helmet';
import { useMutation, useQueryClient } from 'react-query';
import { useHistory, useParams } from 'react-router-dom';
import { CreateDocumentPage } from '../../components/pages/createDocument';
import { createDocument } from '../../state/queryFunctions';
import { keys } from '../../state/queryKeys';
import { createFormData } from '../../utils/functions';
import { navigateTo, Toast } from '../../utils/helper';

function AddDocument() {
  const { id } = useParams();
  const history = useHistory();

  const queryClient = useQueryClient();
  const { mutate } = useMutation(createDocument, {
    onSuccess: () => {
      Toast({
        icon: 'success',
        title: `Document ${id ? 'Updated' : 'Created'}  successfully`,
      });
      queryClient.invalidateQueries(keys.documents);
      navigateTo(history, '/documents');
    },
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

  const handleSubmit = (values) => {
    const data = createFormData(values);
    mutate(data);
  };

  const initialValues = {
    departmentId: '',
    file: '',
    name: '',
    description: '',
  };
  return (
    <>
      <Helmet>
        <title>{id ? 'Edit' : 'Create'} Document</title>
      </Helmet>

      <CreateDocumentPage
        id={id}
        initialValues={initialValues}
        onHandleSubmit={handleSubmit}
      />
    </>
  );
}

export default memo(AddDocument);
