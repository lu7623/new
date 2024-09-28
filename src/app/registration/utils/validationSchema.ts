import * as yup from 'yup';

const getCharacterValidationError = (str: string) => {
  return `Your password must have at least 1 ${str} character`;
};

export const schema = yup.object().shape({
  firstName: yup
    .string()
    .required('Please enter your name')
    .test('firstUppercase', 'First letter of first name should be uppercase', function (name: string) {
      return !!name.trim().slice(0, 1).match(/[A-Z]/)?.length;
    }),
  lastName: yup
    .string()
    .required('Please enter your name')
    .test('firstUppercase', 'First letter of last name should be uppercase', function (name: string) {
      return !!name.trim().slice(0, 1).match(/[A-Z]/)?.length;
    }),

  email: yup.string().email('Invalid email').required('Please enter your email'),
  password: yup
    .string()
    .required('Please enter your password')
    .matches(/[0-9]/, getCharacterValidationError('digit'))
    .matches(/[a-z]/, getCharacterValidationError('lowercase'))
    .matches(/[A-Z]/, getCharacterValidationError('special charcter'))
    .matches(/[\W|_/g]/, getCharacterValidationError('special caracter')),
  confirm: yup
    .string()
    .required('Please re-type to confirm')
    .oneOf([yup.ref('password')], 'Passwords does not match, please re-type to confirm'),
  gender: yup.string().required('Please select your gender').oneOf(['male', 'female', 'other']),
  country: yup.string().required('Please select your country'),
  file: yup
    .mixed<FileList>()
    .test('fileType', 'Invalid file type, please choose png or jpg.', (value) => {
      if (value && value[0]) {
        const file = value![0];

        return value && (file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg');
      }
    })
    .test('fileSize', 'File is too large', (value) => {
      if (value && value[0]) {
        const file = value![0];

        return value && file.size <= 2000000;
      }
    }),
  street: yup.string().required('Please enter street'),
  city: yup.string().required('Please enter your city'),
  postalCode: yup.string().required('Please enter postal code'),
  accept: yup
    .bool()
    .required('You have to accept terms and conditions to coninue')
    .oneOf([true], 'You must accept the terms and conditions'),
});
