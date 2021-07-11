import { Box, Button } from '@material-ui/core';
import React, { memo, useState } from 'react';
import AddIcon from '@material-ui/icons/Add';
import { Input } from 'components';
import { Form, Formik } from 'formik';
import BusinessIcon from '@material-ui/icons/Business';
import PropTypes from 'prop-types';
import { useQuery } from 'react-query';
import Select from '../muiSelect';
import MuiDialog from '../muiDialog';
import { useCreateDepartment } from '../../hooks/departmentMutation';
import { keys } from '../../state/queryKeys';
import { getDepartments } from '../../state/queryFunctions';
import { useStyles } from './style';
import { validationSchema } from './schema';

function DepartmentWithModal({ selectedValue, initialValues, ...props }) {
  const { mutate } = useCreateDepartment();
  const { data: deparments } = useQuery(keys.department, getDepartments);

  const [open, setOpen] = useState(false);
  const handleDialogue = () => {
    setOpen(!open);
  };
  const handleSubmit = (values, { resetForm }) => {
    mutate(values);
    resetForm();
    setOpen(!open);
  };
  const options = deparments?.data.data.rows.map((val) => ({
    value: val.id,
    label: val.name,
  }));

  const classes = useStyles();
  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ submitForm }) => (
          <Form>
            <MuiDialog
              open={open}
              onClose={() => handleDialogue()}
              title="Create New Department"
              onSubmit={submitForm}
            >
              <Box
                width={[1, 1, 1 / 2]}
                py={5}
                className={classes.modalOverflow}
              >
                <Input
                  name="name"
                  OutlinedInputPlaceholder="*Department"
                  Icon={BusinessIcon}
                  appendIcon
                />
              </Box>
            </MuiDialog>
          </Form>
        )}
      </Formik>
      <Box mt={6}>
        <Select
          selectedValue={selectedValue}
          label="Department"
          options={options}
          {...props}
        />
        <Box className={classes.modelLink}>
          <Button startIcon={<AddIcon />} onClick={handleDialogue}>
            Create new department
          </Button>
        </Box>
      </Box>
    </>
  );
}

DepartmentWithModal.propTypes = {
  initialValues: PropTypes.object,
  selectedValue: PropTypes.string,
};
DepartmentWithModal.defaultProps = {
  initialValues: { name: '' },
};

export default memo(DepartmentWithModal);
