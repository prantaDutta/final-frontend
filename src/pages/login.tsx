import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'
import { withIronSession } from 'next-iron-session'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRecoilState } from 'recoil'
import Layout from '../components/layouts/Layout'
import InputPasswordField from '../components/ReactHookForm/InputPasswordField'
import InputTextField from '../components/ReactHookForm/InputTextField'
import SubmitButton from '../components/shared/SubmitButton'
import { authStatus } from '../states/authStates'
import { authenticatedUserData } from '../states/userStates'
import { laravelApi } from '../utils/api'
import { isProduction, NEXT_IRON_SESSION_CONFIG } from '../utils/constants'
import { redirectToPage } from '../utils/functions'
import { LoginFormValues, ModifiedUserData } from '../utils/randomTypes'
import { notify } from '../utils/toasts'
import { loginValidationSchema } from '../validations/LoginFormValidation'

interface login2Props {
  user: ModifiedUserData
}

const Login: React.FC<login2Props> = ({ user }) => {
  const [submitting, setSubmitting] = useState<boolean>(false)
  const { register, handleSubmit, errors, setError } = useForm<LoginFormValues>({
    resolver: yupResolver(loginValidationSchema),
    mode: 'onTouched',
    reValidateMode: 'onBlur'
  })
  const router = useRouter()
  const [, toggleAuth] = useRecoilState(authStatus)
  const [, setUserData] = useRecoilState(authenticatedUserData)

  const onSubmit = async (values: LoginFormValues) => {
    setSubmitting(true)

    await laravelApi(true).get('/sanctum/csrf-cookie')
    try {
      const {
        data: { data }
      } = await laravelApi().post('/login', values)
      if (!isProduction) console.log(data)
      toggleAuth(true)
      setUserData(data)
      await axios.post('/api/set-login-cookie', { data })
      notify(`Welcome back, ${data.name}`, {
        type: 'success'
      })
      if (!data.mobileNoVerified) return router.push('/verify-mobile-no')
      if (data.role === 'admin') return router.push('/admin/dashboard')
      return router.push('/dashboard')
    } catch (e) {
      if (!isProduction) console.log(e.response)
      notify('Invalid Credentials', {
        type: 'error'
      })
      setError('email', {
        type: 'manual',
        message: 'Invalid Credentials'
      })
    }
    setSubmitting(false)
  }
  return (
    <Layout data={user} title={`Log In to Your Account`}>
      <div className="pb-3 px-2 md:px-0">
        <main className="bg-white max-w-lg mx-auto p-4 md:p-8 my-5 rounded-lg shadow-2xl">
          <section>
            <h3 className="font-bold text-2xl">Welcome Back to GrayScale</h3>
            <p className="text-gray-600 pt-2">Log In to Your Account</p>
          </section>
          <form className="mt-10" onSubmit={handleSubmit(onSubmit)}>
            <InputTextField
              type="email"
              name="email"
              label="Email Address"
              error={errors.email?.message}
              placeholder="youremail@email.com"
              register={register}
            />
            <div className="mt-6">
              <InputPasswordField
                name="password"
                label="Password"
                error={errors.password?.message}
                placeholder="Enter Your Password"
                register={register}
              />
            </div>

            <div className="mt-6">
              <div className="text-right mb-4">
                <a
                  className="text-sm font-display font-semibold text-primary hover:text-primaryAccent
                                        cursor-pointer"
                >
                  Forgot Password?
                </a>
              </div>
              <SubmitButton submitting={submitting} title="Log In" />
            </div>
          </form>
          <div className="mt-6 text-sm font-display font-semibold text-gray-700 text-center">
            Don't have an account ?{' '}
            <Link href={`/register`}>
              <a className="cursor-pointer text-primary hover:text-primaryAccent">Sign Up</a>
            </Link>
          </div>
        </main>
      </div>
    </Layout>
  )
}

export const getServerSideProps = withIronSession(async ({ req, res }) => {
  const user = req.session.get('user')
  if (user) {
    await redirectToPage(req, res, '/dashboard')
  }

  return {
    props: {}
  }
}, NEXT_IRON_SESSION_CONFIG)

export default Login
