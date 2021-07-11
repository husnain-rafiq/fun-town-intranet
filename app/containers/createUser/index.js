/**
 *
 * CreateUser
 *
 */

import { WrapInCard } from 'components';
import CreateNewUser from 'components/pages/createUser';
import React, { memo } from 'react';
import { Helmet } from 'react-helmet';
import { useMutation, useQuery } from 'react-query';
import { useHistory } from 'react-router-dom';
import { createUser, getLocations, getDepartments } from 'state/queryFunctions';
import WrapInBreadcrumbs from '../../components/layout/wrapInBreadcrumbs';
import { navigateTo, Toast } from '../../utils/helper';
import { ROLES } from '../../utils/constants';
import { useAuthContext } from '../../context/authContext';
import { useCreateDepartment } from '../../hooks/departmentMutation';
import { useCreateLocation } from '../../hooks/locationMutation';
import { Loading } from '../../components/loading';
import { keys } from '../../state/queryKeys';

function CreateUser() {
  const history = useHistory();
  const {
    user: {
      data: { role },
    },
  } = useAuthContext();
  const { data: locations, isLocationLoading } = useQuery(
    keys.location,
    getLocations
  );
  const { data: deparments, isDepartmentLoading } = useQuery(
    keys.department,
    getDepartments
  );
  const mutation = useMutation(createUser, {
    onSuccess: () => {
      Toast({
        icon: 'success',
        title: `User Created Successfully`,
      });

      navigateTo(history, '/directory');
    },
    onError: ({
      response: {
        data: { message },
      },
    }) => {
      Toast({
        icon: 'error',
        title: message,
      });
    },
  });

  const locationOptions = locations?.data.data.rows.map((val) => ({
    value: val.id,
    label: val.name,
  }));
  const departmentOptions = deparments?.data.data.rows.map((val) => ({
    value: val.id,
    label: val.name,
  }));
  const handleSubmit = (payload) => {
    mutation.mutate(payload);
  };
  const locationMutation = useCreateLocation();
  const departmentMutation = useCreateDepartment();
  const handleCreateLocation = (payload) => {
    locationMutation.mutate(payload);
  };
  const handleCreateDepartment = (payload) => {
    departmentMutation.mutate(payload);
  };
  const defaultData = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    contactNo: '',
    extension: '',
    title: '',
    locationId: '',
    departmentId: '',
    joiningDate: null,
    dob: null,
    file: undefined,
    role: ROLES.USER,
  };
  const defaultDialogData = {
    location: '',
    department: '',
  };

  defaultData.isProfilePicAttached = false;
  defaultData.passwordRequired = true;

  const isLoading = () => {
    if (isLocationLoading || isDepartmentLoading) {
      return true;
    }
    return false;
  };

  return (
    <>
      <Helmet>
        <title>Create User</title>
        <meta name="ftrv create user" content="ftrv user creation screen" />
      </Helmet>

      <WrapInBreadcrumbs>
        <WrapInCard>
          {isLoading() ? (
            <Loading />
          ) : (
            <CreateNewUser
              initialData={defaultData}
              initialDialogData={defaultDialogData}
              mutation={mutation}
              onHandleSubmit={handleSubmit}
              formType="add"
              editRole={role}
              locationOptions={locationOptions}
              departmentOptions={departmentOptions}
              onCreateLocation={handleCreateLocation}
              onCreateDepartment={handleCreateDepartment}
            />
          )}
        </WrapInCard>
      </WrapInBreadcrumbs>
    </>
  );
}

export default memo(CreateUser);
