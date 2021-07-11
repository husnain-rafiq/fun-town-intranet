/**
 *
 * Poll
 *
 */

import React, { memo } from 'react';
import { Helmet } from 'react-helmet';
import { PollsPage } from '../../components/pages/polls/index';

function Poll() {
  return (
    <>
      <Helmet>
        <title>Poll</title>
        <meta name="description" content="Description of Poll" />
      </Helmet>

      <PollsPage />
    </>
  );
}

export default memo(Poll);
