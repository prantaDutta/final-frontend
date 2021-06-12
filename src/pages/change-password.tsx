import { yupResolver } from '@hookform/resolvers/yup'
import { NextPageContext } from 'next'
import { withIronSession } from 'next-iron-session'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import Layout from '../components/layouts/Layout'
import InputPasswordField from '../components/ReactHookForm/InputPasswordField'
import SubmitButton from '../components/shared/SubmitButton'
import Yup from '../lib/yup'
import { laravelApi } from '../utils/api'
import { NEXT_IRON_SESSION_CONFIG } from '../utils/constants'
import { ModifiedUserData } from '../utils/randomTypes'
import { notify } from '../utils/toasts'
import ErrorPage from './404'

interface ChangePasswordProps {
  user: ModifiedUserData
}

const ChangePassword: React.FC<ChangePasswordProps> = ({ user }) => {
  const router = useRouter()
  const { email, token } = router.query

  if (!email || !token) {
    return <ErrorPage />
  }
  const { register, handleSubmit, errors } = useForm<{ password: string; confirmPassword: string }>({
    resolver: yupResolver(
      Yup.object({
        password: Yup.string().min(6, 'Password should be at least six letters').required('Required'),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref('password')], 'Passwords must match')
          .required('Required')
      })
    ),
    reValidateMode: 'onChange'
  })
  const [submitting, setSubmitting] = useState<boolean>(false)
  const onSubmit = async (values: { password: string }) => {
    setSubmitting(true)
    await laravelApi(true).get('/sanctum/csrf-cookie')
    try {
      console.log(values)
      await laravelApi().post('/verify-forgot-password', {
        password: values.password,
        email,
        token
      })
      notify(`Password Changed Successfully`, {
        type: 'success'
      })
      return router.push('/login')
    } catch (e) {
      notify(e?.response?.data.error || 'Something Went Wrong', {
        type: 'error'
      })
    }
    setSubmitting(false)
  }
  return (
    <Layout data={user} title={`Forgot Password`}>
      <div className="pb-3 px-2 md:px-0">
        <main className="bg-white max-w-lg mx-auto p-4 md:p-8 my-5 rounded-lg shadow-2xl">
          <section>
            <h3 className="font-bold text-2xl">Change Your Password</h3>
          </section>
          <form className="mt-10" onSubmit={handleSubmit(onSubmit)}>
            <InputPasswordField
              name="password"
              label="Password"
              error={errors.password?.message}
              placeholder="Enter Your Password"
              register={register}
            />

            <InputPasswordField
              name="confirmPassword"
              label="Confirm Password"
              error={errors.confirmPassword?.message}
              placeholder="Confirm Your Password"
              register={register}
            />

            <div className="mt-6">
              <SubmitButton submitting={submitting} title="Change Password" />
            </div>
          </form>
        </main>
      </div>
    </Layout>
  )
}

export const getServerSideProps = withIronSession(async ({ req }: NextPageContext) => {
  const user = (req as any).session.get('user')
  if (!user) {
    return { props: {} }
  }
  return {
    props: { user }
  }
}, NEXT_IRON_SESSION_CONFIG)

export default ChangePassword
