import * as Yup from 'yup';

const formsRegisterSchema = Yup.object().shape({
  firstName: Yup.string().required('validations.firstName.required'),
  lastName: Yup.string().required('validations.lastName.required'),
  phone: Yup.string().required('validations.phone.required'),
  email: Yup.string()
    .email('validations.email.format')
    .required('validations.email.required'),
  password: Yup.string().required('validations.password.required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'validations.confirm_password.not_matching')
    .required('validations.confirm_password.required'),
});

export default formsRegisterSchema;
