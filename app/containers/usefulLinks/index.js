import React, { memo, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useQuery } from 'react-query';
import { useParams } from 'react-router';
import { Loading } from '../../components/loading';
import UsefulLinksPage from '../../components/pages/usefulLinks';
import { getUsefulLinksByCategoryId } from '../../state/queryFunctions';
import { keys } from '../../state/queryKeys';
import { headCells } from './columns';
import { Modal, Toast } from '../../utils/helper';
import { useDeleteLink } from '../../hooks/usefulLink';

function UsefulLinks() {
  const [selected, setSelected] = useState([]);
  const { categoryId } = useParams();
  const { data, isLoading } = useQuery(
    keys.getLink(categoryId),
    getUsefulLinksByCategoryId,
    {
      refetchOnWindowFocus: false,
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
  const mutation = useDeleteLink({
    callbackFn: () => setSelected([]),
  });

  const handleDeleteLinks = () => {
    if (!selected.length) {
      return;
    }
    Modal.fire().then((result) => {
      if (result.isConfirmed) {
        mutation.mutate(selected);
      }
    });
  };
  return (
    <>
      <Helmet>
        <title>Useful Links</title>
      </Helmet>
      {isLoading || mutation.isLoading ? (
        <Loading />
      ) : (
        <UsefulLinksPage
          data={data?.data?.data?.rows}
          selected={selected}
          setSelected={setSelected}
          onDelete={handleDeleteLinks}
          headCells={headCells}
          isLoading={isLoading}
        />
      )}
    </>
  );
}

export default memo(UsefulLinks);
