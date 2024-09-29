import * as yup from 'yup';

const getCharacterValidationError = (str: string) => {
  return `Your password must have at least 1 ${str}`;
};

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .required('Please enter your email')
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email'),
  password: yup
    .string()
    .required('Please enter your password')
    .matches(/[0-9]/, getCharacterValidationError('digit'))
    .matches(/[A-Za-z\^\u0000-\u007F]/, getCharacterValidationError('letter'))
    .matches(/[\W|_/g]/, getCharacterValidationError('special caracter'))
    .min(8, 'Password should be at least 8 charcters long'),
});
