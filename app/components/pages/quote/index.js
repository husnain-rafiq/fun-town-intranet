import { Box, Button } from '@material-ui/core';
import { TextArea } from 'components';
import { Form, Formik } from 'formik';
import React, { memo } from 'react';
import { string, object } from 'yup';
import { H5 } from '../../typography';

function Quote({ value, handleSubmit }) {
  const initialValues = {
    quote: value,
  };
  const quoteSchema = object().shape({
    quote: string()
      .required()
      .noWhitespace()
      .typeError('* This field cannot contain only blankspaces'),
  });

  return (
    <>
      <H5>Quote</H5>

      <Formik
        initialValues={initialValues}
        validationSchema={quoteSchema}
        onSubmit={(values) => handleSubmit(values)}
      >
        <Form>
          <Box mt={4} width={[1, 1 / 1.3, 1 / 2]}>
            <TextArea name="quote" variant="outlined" />
          </Box>
          <Box
            mt={4}
            width={[1, 1 / 1.3, 1 / 2]}
            display="flex"
            justifyContent="flex-end"
          >
            <Button color="secondary" variant="contained" type="submit">
              Publish
            </Button>
          </Box>
        </Form>
      </Formik>
    </>
  );
}

export default memo(Quote);
