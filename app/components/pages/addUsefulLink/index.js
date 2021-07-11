import { Box, Button } from '@material-ui/core';
import React, { memo } from 'react';
import SaveIcon from '@material-ui/icons/Save';
import { Form, Formik } from 'formik';
import { string, object, number } from 'yup';
import LinkOutlinedIcon from '@material-ui/icons/LinkOutlined';
import PersonOutlinedIcon from '@material-ui/icons/PersonOutlined';
import ClearIcon from '@material-ui/icons/Clear';
import PropTypes from 'prop-types';
import { useParams } from 'react-router';
import WrapInBreadcrumbs from '../../layout/wrapInBreadcrumbs/index';
import WrapInCard from '../../layout/wrapInCard';
import { Input, Select } from '../../index';
import { H5 } from '../../typography';
import { navigateTo } from '../../../utils/helper';

const useFulLinksSchema = object().shape({
  name: string()
    .noWhitespace()
    .required()
    .typeError('* This field cannot contain only blankspaces'),
  url: string()
    .matches(
      /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
      'Enter correct URL'
    )
    .required('*URL Required'),
  categoryId: number().required().typeError('*Category Required'),
});

export function AddUsefulLinkPage({
  onHandleSubmit,
  initialValues,
  history,
  options,
}) {
  const { categoryId, id } = useParams();
  return (
    <WrapInBreadcrumbs>
      <WrapInCard mb={8}>
        <Box ml={3}>
          <Box my={7}>
            <H5> {id ? 'Update' : 'Create'} Useful Link </H5>
          </Box>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={useFulLinksSchema}
            onSubmit={(values) => {
              onHandleSubmit(values);
            }}
          >
            {({ values }) => (
              <Form>
                <Box>
                  <Box display="flex" flexDirection="column" pb={10}>
                    <Box width={[1, 1 / 3]} mt={5}>
                      <Input
                        variant="outlined"
                        OutlinedInputPlaceholder="Name*"
                        name="name"
                        appendIcon
                        Icon={PersonOutlinedIcon}
                        IconClickable
                      />
                    </Box>
                    <Box width={[1, 1 / 3]} mt={5}>
                      <Input
                        OutlinedInputPlaceholder="Url*"
                        name="url"
                        variant="outlined"
                        appendIcon
                        Icon={LinkOutlinedIcon}
                        IconClickable
                      />
                    </Box>
                    <Box width={[1, 1 / 3]} mt={5}>
                      <Select
                        name="categoryId"
                        label="Category"
                        selectedValue={values.categoryId}
                        options={options}
                      />
                    </Box>
                  </Box>
                  <Box display="flex">
                    <Box mb={5}>
                      <Button
                        type="submit"
                        color="secondary"
                        variant="contained"
                        fullWidth={false}
                        startIcon={<SaveIcon />}
                      >
                        {id ? 'Update' : 'Create'}
                      </Button>
                    </Box>
                    <Box ml={2}>
                      <Button
                        variant="text"
                        fullWidth={false}
                        startIcon={<ClearIcon />}
                        onClick={() => {
                          navigateTo(
                            history,
                            `/link-categories/useful-links/${categoryId}`
                          );
                        }}
                      >
                        Cancel
                      </Button>
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

export default memo(AddUsefulLinkPage);

AddUsefulLinkPage.propTypes = {
  initialValues: PropTypes.object,
};
AddUsefulLinkPage.defaultProps = {
  initialValues: { name: '', url: '', categoryId: '' },
};
