import * as Yup from 'yup';

const loginSchema = Yup.object().shape({
  email: Yup.string().required('validations.email.required'),
  password: Yup.string().required('validations.password.required'),
});

export default loginSchema;
