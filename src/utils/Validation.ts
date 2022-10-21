import * as yup from 'yup';

export const globalValidationScheme = yup.object().shape({
  name: yup.string().min(1).required('Name is required'),
});
