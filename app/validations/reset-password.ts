import * as Yup from 'yup';

const passwordRecoveryValidation = Yup.object().shape({
  password: Yup.string().required('validations.password.required'),
  confirmPassword: Yup.string()
    .required('validations.confirm_password.required')
    .oneOf([Yup.ref('password')], 'validations.confirm_password.not_matching'),
});

export default passwordRecoveryValidation;
