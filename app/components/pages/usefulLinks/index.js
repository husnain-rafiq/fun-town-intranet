import { Box } from '@material-ui/core';
import React, { memo } from 'react';
import { Alert } from '../..';
import DataTable from '../../dataTable';
import WrapInBreadcrumbs from '../../layout/wrapInBreadcrumbs/index';
import WrapInCard from '../../layout/wrapInCard';
import { TableButtons } from './tableButtons';

function UsefulLinksPage({
  selected,
  setSelected,
  onDelete,
  data,
  headCells,
  isLoading,
}) {
  return (
    <WrapInBreadcrumbs>
      <WrapInCard mb={8}>
        <TableButtons numSelected={selected?.length} onDelete={onDelete} />
        {selected?.length > 0 && (
          <Box my={4}>
            <Alert severity="info">
              <strong>{selected?.length}</strong> Links(s) Selected
            </Alert>
          </Box>
        )}
        {!isLoading && (
          <DataTable
            data={data}
            headCells={headCells}
            selected={selected}
            setSelected={setSelected}
            count={data?.length || 0}
            sortColumn="name"
          />
        )}
      </WrapInCard>
    </WrapInBreadcrumbs>
  );
}

export default memo(UsefulLinksPage);
