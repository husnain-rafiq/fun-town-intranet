import { object, string } from 'yup';

export const quoteSchema = object().shape({
  quote: string().required('*Required'),
});
