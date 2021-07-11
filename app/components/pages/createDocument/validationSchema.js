import { string, object } from 'yup';

export const validationSchema = object().shape({
  departmentId: string().required('*Department ID is Required'),
  file: string().required('*Document is Required'),
  name: string()
    .required('*File Name is Required')
    .noWhitespace()
    .typeError('* This field cannot contain only blankspaces'),
  description: string()
    .noWhitespace()
    .typeError('* This field cannot contain only blankspaces'),
});
