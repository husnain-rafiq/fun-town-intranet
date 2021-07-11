/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 */

import React from 'react';
import { Box } from '@material-ui/core';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import { Helmet } from 'react-helmet';
import { WrapInCard } from 'components';
import WrapInBreadcrumbs from '../../components/layout/wrapInBreadcrumbs';
import NotExist from '../../components/pages/notExist';

export default function NotFound() {
  return (
    <>
      {' '}
      <Helmet>
        <title>Not Found</title>
      </Helmet>
      <WrapInBreadcrumbs>
        <WrapInCard>
          <Box m={12}>
            <NotExist Icon={ErrorOutlineIcon} description="Page Not Found" />
          </Box>
        </WrapInCard>
      </WrapInBreadcrumbs>
    </>
  );
}
