/**
 *
 * EditUser
 *
 */

import { WrapInCard } from 'components';
import React, { memo } from 'react';
import { Helmet } from 'react-helmet';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import {
  getUserById,
  updateUser,
  getLocations,
  getDepartments,
} from 'state/queryFunctions';
import { keys } from 'state/queryKeys';
import Loading from '../../components/layout/loading';
import WrapInBreadcrumbs from '../../components/layout/wrapInBreadcrumbs';
import EditUserInfo from '../../components/pages/createUser';
import { parseDate } from '../../utils/functions';
import { navigateTo, Toast } from '../../utils/helper';
import { ROLES } from '../../utils/constants';
import { useAuthContext } from '../../context/authContext';
import { useCreateDepartment } from '../../hooks/departmentMutation';
import { useCreateLocation } from '../../hooks/locationMutation';

function EditUser() {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const history = useHistory();
  const {
    user: {
      data: { role },
    },
  } = useAuthContext();
  const locationMutation = useCreateLocation();
  const departmentMutation = useCreateDepartment();
  const { data: locations, isLocationLoading } = useQuery(
    keys.location,
    getLocations
  );
  const { data: deparments, isDepartmentLoading } = useQuery(
    keys.department,
    getDepartments
  );
  const { data, isLoading } = useQuery(keys.getUser(id), () => getUserById(id));
  const mutation = useMutation(updateUser, {
    onSuccess: () => {
      Toast({
        icon: 'success',
        title: `User Updated Successfully`,
      });

      navigateTo(history, '/directory');

      queryClient.removeQueries(keys.getUser(id));
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

  const handleCreateLocation = (payload) => {
    locationMutation.mutate(payload);
  };
  const handleCreateDepartment = (payload) => {
    departmentMutation.mutate(payload);
  };

  const locationOptions = locations?.data.data.rows.map((val) => ({
    value: val.id,
    label: val.name,
  }));
  const departmentOptions = deparments?.data.data.rows.map((val) => ({
    value: val.id,
    label: val.name,
  }));
  const initialData = data?.data?.data || null;
  const handleSubmit = (updatedData) => {
    const payload = { id, updatedData };
    mutation.mutate(payload);
  };

  const defaultData = {
    firstName: '',
    lastName: '',
    password: '',
    contactNo: '',
    locationId: '',
    departmentId: '',
    title: '',
    email: '',
    extension: '',
    status: '',
    joiningDate: null,
    dob: null,
    avatar: '',
    role: ROLES.USER,
  };

  defaultData.isProfilePicAttached = false;
  if (initialData) {
    initialData.password = '';
    initialData.confirmPassword = '';

    initialData.locationId = initialData?.location?.id;
    initialData.departmentId = initialData?.department?.id;

    if (initialData.joiningDate) {
      initialData.joiningDate = parseDate(initialData.joiningDate);
    }
    if (initialData.dob) {
      initialData.dob = parseDate(initialData.dob);
    }

    if (!initialData.role) {
      initialData.role = ROLES.USER;
    }
  }
  const defaultDialogData = {
    location: '',
    department: '',
  };

  const onLoading = () => {
    if (isLoading || isLocationLoading || isDepartmentLoading) {
      return true;
    }
    return false;
  };
  return (
    <>
      <Helmet>
        <title>Edit User</title>
        <meta name="updateUser" content="ftrv - update user data" />
      </Helmet>

      <WrapInBreadcrumbs>
        <WrapInCard>
          {onLoading() ? (
            <Loading />
          ) : (
            <EditUserInfo
              mutation={mutation}
              initialData={initialData || defaultData}
              onHandleSubmit={handleSubmit}
              onCreateLocation={handleCreateLocation}
              onCreateDepartment={handleCreateDepartment}
              formType="edit"
              initialDialogData={defaultDialogData}
              editRole={role}
              locationOptions={locationOptions}
              departmentOptions={departmentOptions}
            />
          )}
        </WrapInCard>
      </WrapInBreadcrumbs>
    </>
  );
}
export default memo(EditUser);
