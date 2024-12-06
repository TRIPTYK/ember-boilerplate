import { object, ref, string, number } from 'yup';

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
  status: string().required('validations.status.required'),
  birthDate: string().required('validations.birth_date.required'),
  category: string().required('validations.category.required'),
  gift: number().min(0, 'validations.gift.required'),
  cv: string().required('validations.cv.required'),
});

export default validationsRegister;
