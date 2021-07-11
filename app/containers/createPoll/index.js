/**
 *
 * CreatePoll
 *
 */

import React, { memo } from 'react';
import { Helmet } from 'react-helmet';
import { useHistory, useParams } from 'react-router-dom';
import CreatePollPage from '../../components/pages/createPoll';
import { navigateTo, Toast } from '../../utils/helper';

function CreatePoll() {
  const { id } = useParams();
  const history = useHistory();
  const handleSubmit = (values) => {
    if (values) {
      Toast({
        icon: 'success',
        title: `Poll ${id ? 'Updated' : 'Created'}  Successfully`,
      });
      navigateTo(history, '/polls');
    }
  };
  const initialValues = {
    options: ['', ''],
    name: '',
    question: '',
    'options-1': '',
    'options-2': '',
    startDate: new Date(),
    endDate: new Date(),
    status: '',
  };

  return (
    <>
      <Helmet>
        <title>{id ? 'Edit' : 'Create'} Poll</title>
      </Helmet>
      <CreatePollPage
        onHandleSubmit={handleSubmit}
        id={id}
        initialValues={id ? initialValues : initialValues}
      />
    </>
  );
}

export default memo(CreatePoll);
