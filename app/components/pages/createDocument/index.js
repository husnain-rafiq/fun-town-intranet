import React, { memo, useRef } from 'react';
import { Formik, Form } from 'formik';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import ClearIcon from '@material-ui/icons/Clear';
import AttachFileOutlinedIcon from '@material-ui/icons/AttachFileOutlined';
import SaveIcon from '@material-ui/icons/Save';
import PropTypes from 'prop-types';
import { Tooltip } from '@material-ui/core';
import Add from '@material-ui/icons/Add';
import { Input, WrapInCard, TextArea } from '../../index';
import WrapInBreadcrumbs from '../../layout/wrapInBreadcrumbs';
import { BodyTextLarge, H4, ButtonText } from '../../typography';
import DepartmentWithModel from '../../departmentWithModal';
import { useStyles } from './style';
import { validationSchema } from './validationSchema';

export function CreateDocumentPage({ initialValues, id, onHandleSubmit }) {
  const documentFile = useRef(null);
  const classes = useStyles();
  const handleUploadDocument = () => {
    documentFile.current.click();
  };
  const handleCaptureDocument = (files = [], setFieldValue) => {
    if (files.length) {
      setFieldValue('file', files[0]);
    }
  };
  return (
    <WrapInBreadcrumbs>
      <WrapInCard>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onHandleSubmit}
        >
          {({ values, setFieldValue }) => (
            <Form>
              <Box display="flex" ml={5}>
                <Box pt={15} width={[1, '65%', '50%', '33.9%']}>
                  <Box display="flex">
                    <H4>{id ? 'Update' : 'Submit'} New Document</H4>
                  </Box>
                  <Box mt={10}>
                    <DepartmentWithModel
                      name="departmentId"
                      label="Department"
                    />
                  </Box>
                  <Box mt={10}>
                    <input
                      type="file"
                      ref={documentFile}
                      onChange={({ target }) =>
                        handleCaptureDocument(target.files, setFieldValue)
                      }
                      hidden
                    />
                    <Box
                      display="flex"
                      alignItems="center"
                      flexDirection={['column', 'row']}
                      className={classes.documentUpload}
                      onClick={handleUploadDocument}
                      border="1px solid black"
                      px={4}
                      py={3}
                    >
                      <Tooltip title="Select Document">
                        <Button
                          color="secondary"
                          variant="contained"
                          startIcon={<Add fontSize="small" />}
                        >
                          <ButtonText>Upload Document</ButtonText>
                        </Button>
                      </Tooltip>
                      <Tooltip title={values.file.name || 'Select Document'}>
                        <Box mx={4} width={[1, '30%', '45%']}>
                          <BodyTextLarge
                            fontWeight="fontWeightMedium"
                            color="grey"
                            className={classes.fileName}
                          >
                            {values.file.name || 'No file chosen'}
                          </BodyTextLarge>
                        </Box>
                      </Tooltip>
                    </Box>
                  </Box>
                  <Box mt={10}>
                    <Input
                      OutlinedInputPlaceholder="File Name"
                      name="name"
                      variant="outlined"
                      Icon={AttachFileOutlinedIcon}
                      appendIcon
                    />
                  </Box>
                  <Box mt={10}>
                    <TextArea name="description" />
                  </Box>
                  <Box my={15} display="flex" flexWrap="wrap">
                    <Box my={[2, 0]}>
                      <Button
                        variant="contained"
                        color="secondary"
                        type="submit"
                        startIcon={<SaveIcon />}
                      >
                        {id ? 'Update' : 'Submit'}
                      </Button>
                    </Box>
                    <Box
                      ml={2}
                      my={[2, 0]}
                      display="flex"
                      justifyContent={['center', 'center', 'left']}
                    >
                      <Button startIcon={<ClearIcon />}>Cancel</Button>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Form>
          )}
        </Formik>
      </WrapInCard>
    </WrapInBreadcrumbs>
  );
}
CreateDocumentPage.propTypes = {
  initialValues: PropTypes.object,
  id: PropTypes.number,
};

export default memo(CreateDocumentPage);
