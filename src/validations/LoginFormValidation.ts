import Yup from '../lib/yup'

export const loginValidationSchema = Yup.object({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(6, 'Password should be atleast six letters').required('Required')
})
