/* eslint-disable */
import * as yup from 'yup';

export const signUpSchema = (passwordValue) => yup.object().shape({
  name: yup
    .string()
    .min(3, 'errorsTexts.errorValidateMax20Min3')
    .max(20, 'errorsTexts.errorValidateMax20Min3')
    .required('errorsTexts.errorValidateRequiredField'),
  password: yup
    .string()
    .min(6, 'errorsTexts.errorValidateMin6')
    .required('errorsTexts.errorValidateRequiredField'),
  confirmedPassword: yup
    .string()
    .oneOf(passwordValue, 'errorsTexts.errorValidateSamePasswords')
    .required('errorsTexts.errorValidateRequiredField')
    .min(6, 'errorsTexts.errorValidateMin6'),
});
