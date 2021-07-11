import { Box, Button, Link } from '@material-ui/core';
import React, { memo } from 'react';
import AddIcon from '@material-ui/icons/Add';
import WrapInBreadcrumbs from '../../layout/wrapInBreadcrumbs/index';
import WrapInCard from '../../layout/wrapInCard';
import { H5 } from '../../typography';
import DocumentTabs from './documentTabs';
import { Modal } from '../../../utils/helper';

export function Documents({ data }) {
  const handleDelete = () => {
    Modal.fire();
  };
  return (
    <WrapInBreadcrumbs>
      <WrapInCard mb={8}>
        <Box pb={8} pt={3}>
          <H5> Documents </H5>
        </Box>
        <Box>
          <Link href="/documents/add" underline="none">
            <Button
              variant="contained"
              color="secondary"
              startIcon={<AddIcon />}
            >
              New Document
            </Button>
          </Link>
        </Box>
        <Box my={8}>
          <DocumentTabs
            documents={data?.documents}
            departments={data?.departments}
            onHandleDelete={handleDelete}
          />
        </Box>
      </WrapInCard>
    </WrapInBreadcrumbs>
  );
}

export default memo(Documents);
