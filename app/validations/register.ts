import { object, ref, string } from 'yup';

const validationsRegister = object().shape({
  firstName: string().required('validations.first_name.required'),
  lastName: string().required('validations.last_name.required'),
  phone: string().required('validations.phone.required'),
  email: string()
    .email('validations.email.format')
    .required('validations.email.required'),
  password: string().required('validations.password.required'),
  confirmPassword: string()
    .oneOf([ref('password')], 'validations.confirm_password.not_matching')
    .required('validations.confirm_password.required'),
});

export default validationsRegister;
