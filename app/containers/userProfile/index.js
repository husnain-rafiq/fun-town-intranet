/**
 *
 * EditUser
 *
 */

import { WrapInCard } from 'components';
import React, { memo } from 'react';
import { Helmet } from 'react-helmet';
import { useMutation, useQuery, useQueryClient } from 'react-query';
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
import { useAuthContext } from '../../context/authContext';
import { ROLES } from '../../utils/constants';
import { parseDate } from '../../utils/functions';
import { navigateTo, Toast } from '../../utils/helper';

import { useCreateDepartment } from '../../hooks/departmentMutation';
import { useCreateLocation } from '../../hooks/locationMutation';

function EditUser() {
  const queryClient = useQueryClient();
  const history = useHistory();
  const { user, setUser } = useAuthContext();
  const locationMutation = useCreateLocation();
  const departmentMutation = useCreateDepartment();
  const id = user && user.data && user.data.id;
  const userRole = user && user.data && user.data.role;
  const { data, isLoading } = useQuery(keys.getUser(id), () => getUserById(id));
  const { data: locations, isLocationLoading } = useQuery(
    keys.location,
    getLocations
  );
  const { data: deparments, isDepartmentLoading } = useQuery(
    keys.department,
    getDepartments
  );
  const mutation = useMutation(updateUser, {
    onSuccess: ({
      data: {
        data: { avatar, firstName, lastName },
      },
    }) => {
      if (avatar) {
        const parsedUserData = { ...user };
        if (parsedUserData.data) {
          parsedUserData.data.avatar = avatar;
          parsedUserData.data.firstname = firstName;
          parsedUserData.data.lastname = lastName;
          parsedUserData.data.name = `${firstName}${' '}${lastName}`;
          setUser(parsedUserData);
        }
      }

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
  let formDefaultData = {};

  if (initialData) {
    initialData.password = '';
    initialData.confirmPassword = '';

    if (initialData.joiningDate) {
      initialData.joiningDate = parseDate(initialData.joiningDate);
    }
    if (initialData.dob) {
      initialData.dob = parseDate(initialData.dob);
    }
    initialData.locationId = initialData?.location?.id;
    initialData.departmentId = initialData?.department?.id;

    if (!initialData.role) {
      initialData.role = userRole;
    }
  } else if (userRole === ROLES.USER) {
    formDefaultData = { password: '' }; // User can only edit his password and avatar in profile
  } else if (userRole === ROLES.ADMIN) {
    formDefaultData = {
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
      role: userRole,
    };

    formDefaultData.isProfilePicAttached = false;
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
              initialData={initialData || formDefaultData}
              onHandleSubmit={handleSubmit}
              onCreateLocation={handleCreateLocation}
              onCreateDepartment={handleCreateDepartment}
              formType="edit"
              initialDialogData={defaultDialogData}
              editRole={userRole}
              isThisMyProfile
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
