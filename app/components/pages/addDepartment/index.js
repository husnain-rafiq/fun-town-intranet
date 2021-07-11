import { Box, Button } from '@material-ui/core';
import React, { memo } from 'react';
import SaveIcon from '@material-ui/icons/Save';
import { Form, Formik } from 'formik';
import { string, object } from 'yup';
import ClearIcon from '@material-ui/icons/Clear';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import BusinessIcon from '@material-ui/icons/Business';
import WrapInBreadcrumbs from '../../layout/wrapInBreadcrumbs';
import WrapInCard from '../../layout/wrapInCard';
import { Input } from '../../index';
import { H5 } from '../../typography';

const departmentSchema = object().shape({
  name: string().required('*Department Required'),
});

export function AddDepartmentPage({ onHandleSubmit, id, initialValues }) {
  const history = useHistory();
  return (
    <WrapInBreadcrumbs>
      <WrapInCard mb={8}>
        <Box ml={3}>
          <Box my={7}>
            <H5> {id ? 'Update' : 'Create'} Department </H5>
          </Box>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={departmentSchema}
            onSubmit={(values) => {
              onHandleSubmit(values);
            }}
          >
            {() => (
              <Form>
                <Box display="flex" flexDirection="column" pb={10}>
                  <Box width={[1, 1, 1 / 2, 1 / 3]} my={5}>
                    <Input
                      variant="outlined"
                      OutlinedInputPlaceholder="Department*"
                      name="name"
                      appendIcon
                      Icon={BusinessIcon}
                      IconClickable
                    />
                  </Box>
                </Box>
                <Box display="flex">
                  <Box mb={5}>
                    <Button
                      type="submit"
                      color="secondary"
                      variant="contained"
                      startIcon={<SaveIcon />}
                    >
                      {id ? 'Update' : 'Create'}
                    </Button>
                  </Box>
                  <Box ml={2}>
                    <Button
                      startIcon={<ClearIcon />}
                      onClick={() => history.goBack()}
                    >
                      Cancel
                    </Button>
                  </Box>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </WrapInCard>
    </WrapInBreadcrumbs>
  );
}

AddDepartmentPage.propTypes = {
  initialValues: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }),
};
AddDepartmentPage.defaultProps = {
  initialValues: {
    name: '',
  },
};

export default memo(AddDepartmentPage);
