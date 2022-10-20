import * as yup from 'yup';

export const globalValidationScheme = yup.object().shape({
  name: yup.string().required('Name is required'),
});
