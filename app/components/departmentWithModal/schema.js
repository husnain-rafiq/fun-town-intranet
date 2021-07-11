import { string, object } from 'yup';

export const validationSchema = object().shape({
  name: string()
    .required('*Department Name is Required')
    .noWhitespace()
    .typeError('* This field cannot contain only blankspaces'),
});
