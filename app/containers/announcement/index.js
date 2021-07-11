import React, { memo, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Box from '@material-ui/core/Box';
import { useQuery } from 'react-query';
import { Alert } from '@material-ui/lab';
import moment from 'moment';
import { headCells } from './columns';
import WrapInCard from '../../components/layout/wrapInCard';
import DataTable from '../../components/dataTable';
import TableButtons from './tableButtons';
import { useAuthContext } from '../../context/authContext';
import { Loading } from '../../components/loading';
import { ROLES } from '../../utils/constants';
import WrapInBreadcrumbs from '../../components/layout/wrapInBreadcrumbs';
import { retrieveAnnouncements } from '../../state/queryFunctions';
import { keys } from '../../state/queryKeys';
import { Modal, capitalize } from '../../utils/helper';
import { useDeleteAnnouncement } from '../../hooks/announcement';

function AnnouncementContainer() {
  const [selected, setSelected] = useState([]);
  const [formatData, setFormatData] = useState([]);

  const { data, isLoading } = useQuery(
    keys.adminAnnouncements,
    retrieveAnnouncements
  );
  const mutation = useDeleteAnnouncement({ callbackFn: () => setSelected([]) });

  const {
    user: {
      data: { role },
    },
  } = useAuthContext();

  const handleDelete = () => {
    if (!selected.length) {
      return;
    }
    Modal.fire().then((result) => {
      if (result.isConfirmed) {
        mutation.mutate(selected);
      }
    });
  };

  useEffect(() => {
    let updatedFormatData = [];
    if (data) {
      updatedFormatData = data.data.data.rows.map((item) => {
        const announcement = { ...item };

        announcement.startTime = moment(announcement.startTime).format(
          'MM-DD-YYYY'
        );
        announcement.endTime = moment(announcement.endTime).format(
          'MM-DD-YYYY'
        );
        announcement.status = capitalize(announcement.status);
        announcement.priority = capitalize(announcement.priority);

        return announcement;
      });
    }
    setFormatData(updatedFormatData);
  }, [data]);

  return (
    <>
      <Helmet>
        <title>Announcement</title>
      </Helmet>
      {isLoading || mutation.isLoading ? (
        <Loading />
      ) : (
        <WrapInBreadcrumbs>
          <Box width={1}>
            <WrapInCard>
              {role === ROLES.ADMIN && (
                <Box mt={4}>
                  <TableButtons
                    onDelete={handleDelete}
                    numSelected={selected.length}
                  />
                  {selected.length > 0 && (
                    <Box my={4}>
                      <Alert severity="info">
                        <strong>{selected.length}</strong> Announcement(s)
                        Selected
                      </Alert>
                    </Box>
                  )}
                </Box>
              )}
              <DataTable
                data={formatData}
                headCells={headCells}
                setSelected={setSelected}
                selected={selected}
                count={formatData?.length || 0}
                sortColumn="title"
              />
            </WrapInCard>
          </Box>
        </WrapInBreadcrumbs>
      )}
    </>
  );
}

export default memo(AnnouncementContainer);
