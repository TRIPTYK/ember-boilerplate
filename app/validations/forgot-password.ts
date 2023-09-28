import * as Yup from 'yup';

const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string().required('validations.email.required'),
});

export default forgotPasswordSchema;
