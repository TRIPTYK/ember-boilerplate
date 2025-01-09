import { object, ref, string, boolean, date, number, array } from 'yup';

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
  isFree: boolean(),
  period: array().of(date()).when('isFree', {
    is: true,
    then: (schema) => schema.required('validations.period.required').min(2, 'validations.period.required'),
    otherwise: (schema) => schema.notRequired(),
  }),
  time: date().when('isFree', {
    is: true,
    then: (schema) => schema.required('validations.time.required'),
    otherwise: (schema) => schema.notRequired(),
  }),
  status: string().required('validations.status.required'),
  birthDate: string().required('validations.birth_date.required'),
  gift: number().moreThan(0, 'validations.gift.required'),
  category: string().required('validations.category.required'),
  cv: string().required('validations.cv.required'),
});

export default validationsRegister;
