import { Box, Button, Hidden, FormLabel } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import TitleOutlinedIcon from '@material-ui/icons/TitleOutlined';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import { Field, Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import React, { memo } from 'react';
import { useHistory } from 'react-router-dom';
import NotificationImportantIcon from '@material-ui/icons/NotificationImportant';

import { string, object, date, ref } from 'yup';
import { ANNOUNCEMENT_STATUS, ROLES } from '../../../utils/constants';
import FormikRadioGroup from '../../muiRadioButtons';
import { H4 } from '../../typography';
import Select from '../../muiSelect';
import { useAuthContext } from '../../../context/authContext';
import { DatePicker, Input } from '../../index';
import { parseDate } from '../../../utils/functions';
import { navigateTo } from '../../../utils/helper';

const announcementSchema = object().shape({
  title: string()
    .required('*Title Required')
    .noWhitespace()
    .typeError('* This field cannot contain only blankspaces'),
  startTime: date().required('*Start Date Required'),
  endTime: date()
    .min(ref('startTime'), 'End date should be greater than start date')
    .required('*End Date Required'),
  description: string()
    .required('*Description Required')
    .noWhitespace()
    .typeError('* This field cannot contain only blankspaces'),
  priority: string().required('*Priority Required'),
});
function CreateAnnouncement({
  initialValues,
  onUpdateAnnouncement,
  formType = 'add',
}) {
  const options = [
    { value: 'high', label: 'High' },
    { value: 'medium', label: 'Medium' },
    { value: 'low', label: 'Low' },
  ];
  const statusOptions = Object.keys(ANNOUNCEMENT_STATUS).map(
    (val) => ANNOUNCEMENT_STATUS[val]
  );
  const {
    user: {
      data: { role },
    },
  } = useAuthContext();
  const history = useHistory();
  const formHeadings = {
    add: 'Create New Announcement',
    edit: 'Update Announcement Data',
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values) => {
          try {
            const data = values;
            data.startTime = parseDate(data.startTime);
            data.endTime = parseDate(data.endTime);
            await onUpdateAnnouncement(data);
          } catch (err) {
            // ...
          }
        }}
        validationSchema={announcementSchema}
      >
        {({ values }) => (
          <Form>
            <Box
              flexWrap="wrap"
              flexDirection="row"
              p={4}
              pr={[0, 36]}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Box width={[1, '70%']}>
                <Box width={1} pt={10} flexWrap="wrap" display="flex" px={2}>
                  <Box width={1} textAlign="center">
                    <H4>{formHeadings[formType]}</H4>
                  </Box>
                  <Box width={[1, 1 / 2]} mt={10} px={3}>
                    <Input
                      name="title"
                      variant="outlined"
                      OutlinedInputPlaceholder="*Title"
                      Icon={TitleOutlinedIcon}
                      appendIcon
                    />
                  </Box>
                  <Box width={[1, 1 / 2]} mt={10} px={3}>
                    <Input
                      name="description"
                      variant="outlined"
                      OutlinedInputPlaceholder="*Description"
                      Icon={DescriptionOutlinedIcon}
                      appendIcon
                    />
                  </Box>

                  <Box width={[1, 1 / 2]} mt={10} px={3}>
                    <DatePicker
                      disablePast
                      id="startTime"
                      name="startTime"
                      label="Start Date*"
                      disabled={role === ROLES.USER}
                    />
                  </Box>
                  <Box width={[1, 1 / 2]} mt={10} px={3}>
                    <DatePicker
                      id="endTime"
                      name="endTime"
                      label="End Date*"
                      disablePast
                      disabled={role === ROLES.USER}
                    />
                  </Box>

                  <Box width={[1, 1 / 2]} mt={10} px={3}>
                    <Select
                      name="status"
                      selectId="status"
                      labelId="status"
                      selectName="status"
                      formControlProps={{ variant: 'outlined' }}
                      label="Set Announcement State"
                      selectedValue={values.status}
                      options={statusOptions}
                    />
                  </Box>

                  <Box width={[1, 1 / 2]} mt={10} px={3}>
                    <FormLabel component="legend">Priority</FormLabel>
                    <Field
                      name="priority"
                      component={FormikRadioGroup}
                      options={options}
                    />
                  </Box>

                  <Hidden smDown>
                    <Box width={[1, 1 / 2]} mt={10} px={3}></Box>
                  </Hidden>
                  <Box
                    display="flex"
                    flexWrap="wrap"
                    justifyContent="center"
                    width={1}
                    mt={10}
                  >
                    <Box mb={7}>
                      <Button
                        variant="contained"
                        color="secondary"
                        type="submit"
                        startIcon={<NotificationImportantIcon />}
                      >
                        {`${formType === 'add' ? 'Create' : 'Update'}`}
                      </Button>
                    </Box>
                    <Box mx={1}>
                      <Button
                        onClick={() => navigateTo(history, '/announcement')}
                        startIcon={<ClearIcon fontSize="small" />}
                      >
                        Cancel
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Form>
        )}
      </Formik>
    </>
  );
}

CreateAnnouncement.propTypes = {
  initialValues: PropTypes.object,
};
CreateAnnouncement.defaultProps = {
  initialValues: {
    title: '',
    startTime: new Date(),
    endTime: new Date(),
    description: '',
    priority: '',
  },
};

export default memo(CreateAnnouncement);
