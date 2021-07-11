import { Box, Button, FormHelperText, IconButton } from '@material-ui/core';
import React, { memo } from 'react';
import SaveIcon from '@material-ui/icons/Save';
import { Form, Formik } from 'formik';
import { string, object, date, array } from 'yup';
import TitleOutlinedIcon from '@material-ui/icons/TitleOutlined';
import ClearIcon from '@material-ui/icons/Clear';
import PropTypes from 'prop-types';
import {
  KeyboardDateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import DeleteIcon from '@material-ui/icons/Delete';
import { useHistory } from 'react-router';
import WrapInBreadcrumbs from '../../layout/wrapInBreadcrumbs';
import WrapInCard from '../../layout/wrapInCard';
import { Input, TextArea, AutoComplete } from '../../index';
import { BodyTextLarge, H5 } from '../../typography';
import { useStyles } from './style';
import { useAuthContext } from '../../../context/authContext';
import { ROLES } from '../../../utils/constants';

const eventSchema = object().shape({
  title: string()
    .required('*Title Required')
    .noWhitespace()
    .typeError('* This field cannot contain only blankspaces'),
  startDate: date()
    .min(
      new Date().toLocaleString(),
      ({ min }) => `Start Date must be equal or greater to ${min}`
    )
    .required('*Start Date Required'),
  endDate: date()
    .when('startDate', (eventStartDate, schema) => {
      const startDate = new Date(eventStartDate);
      const dateMin = new Date(
        startDate.setTime(new Date(startDate).getTime() + 1000 * 60)
      );
      return schema.min(dateMin, 'End date should be greater than start date');
    })
    .required('*End Date Required'),
  description: string()
    .noWhitespace()
    .typeError('* This field cannot contain only blankspaces'),
  locationIds: array().required('*Location Required'),
});

export function CreateEventPage({
  onHandleSubmit,
  id,
  initialValues,
  pageTitle,
  onHandleDeleteEvent,
  locationData,
}) {
  const classes = useStyles();
  const history = useHistory();
  const {
    user: {
      data: { role },
    },
  } = useAuthContext();
  return (
    <WrapInBreadcrumbs>
      <WrapInCard mb={8}>
        <Box ml={3}>
          <Formik
            initialValues={initialValues}
            validationSchema={eventSchema}
            onSubmit={(values) => {
              onHandleSubmit(values);
            }}
          >
            {({ setFieldValue, values, errors, handleBlur, touched }) => (
              <Form>
                <Box
                  flexWrap="wrap"
                  flexDirection="row"
                  p={4}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Box width={[1, '70%']}>
                    <Box width={1} pt={5} flexWrap="wrap" display="flex" px={2}>
                      <Box
                        width={1}
                        pt={5}
                        flexWrap="wrap"
                        display="flex"
                        px={2}
                      >
                        <Box width={[1, '94%']} mt={10} px={3}>
                          <Box width={1} textAlign="center">
                            <H5> {pageTitle} Event </H5>
                          </Box>
                        </Box>
                        <Box
                          width={[1, '6%']}
                          mt={5}
                          px={3}
                          justifyContent="flex-end"
                        >
                          {role === ROLES.ADMIN && (
                            <Box mr={3}>
                              <IconButton onClick={onHandleDeleteEvent}>
                                <DeleteIcon color="error" />
                              </IconButton>
                            </Box>
                          )}
                        </Box>

                        <Box width={[1, 1 / 2]} mt={10} px={3}>
                          <Input
                            variant="outlined"
                            OutlinedInputPlaceholder="Title*"
                            name="title"
                            appendIcon
                            Icon={TitleOutlinedIcon}
                            IconClickable
                          />
                        </Box>
                        <Box width={[1, 1 / 2]} mt={10} px={3}>
                          <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDateTimePicker
                              id="startDate"
                              name="startDate"
                              label={
                                <BodyTextLarge className={classes.label}>
                                  Start Date*
                                </BodyTextLarge>
                              }
                              disablePast
                              inputVariant="outlined"
                              format="MM/dd/yyyy hh:mm  a"
                              fullWidth
                              showTodayButton
                              value={values.startDate}
                              InputProps={{ className: classes.dateColor }}
                              onBlur={handleBlur}
                              onChange={(value) => {
                                setFieldValue('startDate', value);
                              }}
                              error={errors.startDate && touched.startDate}
                              minDateMessage=""
                              KeyboardButtonProps={{ tabIndex: -1 }}
                            />
                          </MuiPickersUtilsProvider>
                          {errors.startDate && touched.startDate && (
                            <FormHelperText error>
                              {errors.startDate}
                            </FormHelperText>
                          )}
                        </Box>
                        <Box width={[1, 1 / 2]} mt={10} px={3}>
                          <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDateTimePicker
                              id="endDate"
                              name="endDate"
                              label={
                                <BodyTextLarge className={classes.label}>
                                  End Date*
                                </BodyTextLarge>
                              }
                              disablePast
                              inputVariant="outlined"
                              format="MM/dd/yyyy hh:mm  a"
                              fullWidth
                              showTodayButton
                              value={values.endDate}
                              onBlur={handleBlur}
                              InputProps={{ className: classes.dateColor }}
                              minDateMessage=""
                              error={errors.endDate && touched.endDate}
                              onChange={(value) => {
                                setFieldValue('endDate', value);
                              }}
                              KeyboardButtonProps={{ tabIndex: -1 }}
                            />
                          </MuiPickersUtilsProvider>
                          {errors.endDate && touched.endDate && (
                            <FormHelperText error>
                              {errors.endDate}
                            </FormHelperText>
                          )}
                        </Box>
                        <Box width={[1, 1 / 2]} mt={10} px={3}>
                          <AutoComplete
                            id="locationIds"
                            name="locationIds"
                            limitTags={2}
                            options={locationData}
                            defaultValue={values.locationIds}
                            getOptionLabel={(location) => location.name || ''}
                            getOptionSelected={(option, value) =>
                              option.id === value.id
                            }
                            onHandleChange={(e, value) => {
                              if (value) setFieldValue('locationIds', value);
                            }}
                            label="Location"
                            placeholder="Select Locations"
                          />
                        </Box>
                        <Box width={[1, 1 / 2]} mt={10} px={3}>
                          <TextArea name="description" />
                        </Box>
                      </Box>
                      <Box
                        display="flex"
                        flexWrap="wrap"
                        justifyContent="center"
                        width={1}
                        mt={10}
                      >
                        <Box mb={7}>
                          <Button
                            type="submit"
                            color="secondary"
                            variant="contained"
                            startIcon={<SaveIcon />}
                          >
                            {id ? 'Update' : 'Create'}
                          </Button>
                        </Box>
                        <Box mx={1}>
                          <Button
                            variant="text"
                            startIcon={<ClearIcon />}
                            onClick={() => history.goBack()}
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
        </Box>
      </WrapInCard>
    </WrapInBreadcrumbs>
  );
}

CreateEventPage.propTypes = {
  initialValues: PropTypes.object,
  pageTitle: PropTypes.string,
};
CreateEventPage.defaultProps = {
  initialValues: {
    title: '',
    startDate: new Date(),
    endDate: new Date(),
    description: '',
    location: '',
  },
};

export default memo(CreateEventPage);
