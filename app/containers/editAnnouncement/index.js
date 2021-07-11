import { WrapInCard } from 'components';
import React, { memo } from 'react';
import { Helmet } from 'react-helmet';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import {
  retrieveAnnouncementById,
  updateAnnouncement,
} from 'state/queryFunctions';
import { keys } from 'state/queryKeys';
import Loading from '../../components/layout/loading';
import WrapInBreadcrumbs from '../../components/layout/wrapInBreadcrumbs';
import EditAnnouncementInfo from '../../components/pages/createAnnouncement';
import { navigateTo, Toast } from '../../utils/helper';

function EditAnnouncement() {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const history = useHistory();

  const { data, isLoading } = useQuery(keys.getAnnouncementById(id), () =>
    retrieveAnnouncementById(id)
  );
  const mutation = useMutation(updateAnnouncement, {
    onSuccess: () => {
      queryClient.invalidateQueries(keys.adminAnnouncements);
      queryClient.invalidateQueries(keys.getAnnouncementById(id));

      Toast({
        icon: 'success',
        title: `Announcement Updated Successfully`,
      });

      navigateTo(history, '/announcement');
    },
    onError: ({
      response: {
        data: { message },
      },
    }) => {
      Toast({
        icon: 'error',
        title: message || 'Error while Updating',
      });
    },
  });

  const initialData = data?.data?.data || null;
  const handleSubmit = (updatedData) => {
    const payload = updatedData;
    mutation.mutate(payload);
  };

  const defaultData = {
    title: '',
    description: '',
    startTime: new Date(),
    endTime: new Date(),
    status: '',
    priority: '',
  };
  return (
    <>
      <Helmet>
        <title>Edit Announcement</title>
        <meta
          name="updateAnnouncement"
          content="ftrv - update announcement data"
        />
      </Helmet>

      <WrapInBreadcrumbs>
        <WrapInCard>
          {isLoading ? (
            <Loading />
          ) : (
            <EditAnnouncementInfo
              initialValues={initialData || defaultData}
              onUpdateAnnouncement={handleSubmit}
              formType="edit"
            />
          )}
        </WrapInCard>
      </WrapInBreadcrumbs>
    </>
  );
}
export default memo(EditAnnouncement);
