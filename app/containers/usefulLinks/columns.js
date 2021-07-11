import React from 'react';
import { IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { useHistory, useParams } from 'react-router-dom';
import { useAuthContext } from '../../context/authContext';
import { ROLES } from '../../utils/constants';
import { Modal, navigateTo } from '../../utils/helper';
import { useDeleteLink } from '../../hooks/usefulLink';

const ActionButtons = ({ data, setSelected, disabled }) => {
  const { categoryId } = useParams();
  const history = useHistory();
  const mutation = useDeleteLink({
    callbackFn: () => setSelected([]),
  });
  const {
    user: {
      data: { role },
    },
  } = useAuthContext();

  const handleDeleteLinks = () => {
    Modal.fire().then((result) => {
      if (result.isConfirmed) {
        mutation.mutate([data.id]);
      }
    });
  };

  return (
    <>
      {role === ROLES.ADMIN && (
        <>
          <IconButton
            onClick={() =>
              navigateTo(
                history,
                `/link-categories/useful-links/${categoryId}/edit/${data.id}`
              )
            }
            disabled={disabled}
          >
            <EditIcon color="secondary" />
          </IconButton>
          <IconButton onClick={() => handleDeleteLinks()} disabled={disabled}>
            <DeleteIcon color="error" />
          </IconButton>
        </>
      )}
    </>
  );
};

export const headCells = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Name',
    type: 'label',
  },
  {
    id: 'url',
    numeric: false,
    disablePadding: false,
    label: 'Links',
    type: 'link',
  },
  {
    id: 'actions',
    numeric: true,
    disablePadding: false,
    label: '',
    buttons: ActionButtons,
    type: 'action',
  },
];
