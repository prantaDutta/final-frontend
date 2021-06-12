import { yupResolver } from '@hookform/resolvers/yup'
import { withIronSession } from 'next-iron-session'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import Layout from '../components/layouts/Layout'
import InputTextField from '../components/ReactHookForm/InputTextField'
import SubmitButton from '../components/shared/SubmitButton'
import Yup from '../lib/yup'
import { laravelApi } from '../utils/api'
import { NEXT_IRON_SESSION_CONFIG } from '../utils/constants'
import { ModifiedUserData } from '../utils/randomTypes'
import { notify } from '../utils/toasts'

interface ForgotPasswordProps {
  user: ModifiedUserData
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ user }) => {
  const router = useRouter()
  const { register, handleSubmit, errors } = useForm<{ email: string }>({
    resolver: yupResolver(
      Yup.object({
        email: Yup.string().email('Invalid email').required('Required')
      })
    )
  })
  const [submitting, setSubmitting] = useState<boolean>(false)
  const onSubmit = async (values: { password: string }) => {
    setSubmitting(true)
    await laravelApi(true).get('/sanctum/csrf-cookie')
    try {
      await laravelApi().post('/forgot-password', values)
      notify(`Please Check your email inbox`, {
        type: 'success'
      })
      return router.push('/')
    } catch (e) {
      notify(e?.response?.data.error || 'Something Went Wrong', {
        type: 'success'
      })
    }
    setSubmitting(false)
  }
  return (
    <Layout data={user} title={`Forgot Password`}>
      <div className="pb-3 px-2 md:px-0">
        <main className="bg-white max-w-lg mx-auto p-4 md:p-8 my-5 rounded-lg shadow-2xl">
          <section>
            <h3 className="font-bold text-2xl">We will send you a link in your email</h3>
            <p className="text-gray-600 text-xl font-semibold pt-2">If that email exists in our database</p>
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
              <SubmitButton submitting={submitting} title="Send Me an Email" />
            </div>
          </form>
        </main>
      </div>
    </Layout>
  )
}

export const getServerSideProps = withIronSession(async ({ req }) => {
  const user = req.session.get('user')
  if (!user) {
    return { props: {} }
  }
  return {
    props: { user }
  }
}, NEXT_IRON_SESSION_CONFIG)

export default ForgotPassword
