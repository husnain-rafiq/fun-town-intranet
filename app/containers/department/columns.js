import React from 'react';
import { IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { useHistory } from 'react-router-dom';
import { useAuthContext } from '../../context/authContext';
import { ROLES } from '../../utils/constants';
import { Modal, navigateTo } from '../../utils/helper';
import { useDeleteDepartment } from '../../hooks/department';

const ActionButtons = ({ data, setSelected, disabled }) => {
  const history = useHistory();
  const mutation = useDeleteDepartment({ callbackFn: () => setSelected([]) });
  const {
    user: {
      data: { role },
    },
  } = useAuthContext();

  const handleDeleteDepartments = () => {
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
          <IconButton disabled={disabled}>
            <EditIcon
              color="secondary"
              onClick={() =>
                navigateTo(history, `/departments/edit/${data.id}`)
              }
            />
          </IconButton>
          <IconButton
            disabled={disabled}
            onClick={() => handleDeleteDepartments()}
          >
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
    label: 'Department',
    type: 'label',
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
