import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { trigger } from 'swr'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import InputTextField from '../../components/ReactHookForm/InputTextField'
import DashboardTitle from '../../components/shared/DashboardTitle'
import SubmitButton from '../../components/shared/SubmitButton'
import VerifyAccountFirst from '../../components/shared/VerifyAccountFirst'
import useLocalStorage from '../../hooks/useLocalStorage'
import Yup from '../../lib/yup'
import { laravelApi } from '../../utils/api'
import { LARAVEL_URL } from '../../utils/constants'
import { ModifiedUserData } from '../../utils/randomTypes'
import { notify } from '../../utils/toasts'
import withAuth from '../../utils/withAuth'

interface WithdrawNowProps {
  user: ModifiedUserData
}

type WithdrawNowValues = {
  amount: number
}

const WithdrawNow: React.FC<WithdrawNowProps> = ({ user }) => {
  const router = useRouter()
  // setting up localstorage
  const [lastWithdrawnAmount, setLastWithdrawalAmount] = useLocalStorage<number | string | null>(
    'lastWithdrawnAmount',
    null
  )
  const [submitting, setSubmitting] = useState<boolean>(false)

  const { register, handleSubmit, errors } = useForm<WithdrawNowValues>({
    mode: 'onChange',
    resolver: yupResolver(
      Yup.object({
        amount: Yup.number()
          .typeError('Amount must be a number')
          .min(999.99, 'Minimum Withdrawal Amount is 1,000tk')
          .max(50000, 'Maximum Amount is 50,000tk')
          .required('Required')
      })
    )
  })

  // This function opens a popup for user to Withdraw money
  const openPopUp = async (amount: number) => {
    setSubmitting(true)
    try {
      const winObj = window.open(
        `${LARAVEL_URL}/api/user/withdraw?amount=${amount}`,
        'Withdraw Money',
        'width=800,height=800,status=0,toolbar=0'
      )
      const loop = setInterval(async function () {
        if (winObj?.closed) {
          clearInterval(loop)
          await trigger('/user/balance')
          await trigger('/user/get-all-withdrawals')
          return router.push('/withdrawals')
        }
      }, 1000)
    } catch (e) {
      console.log(e.response)
    }
    setSubmitting(false)
  }

  // This function executes after user presses the submit button
  const onSubmit = async (values: WithdrawNowValues) => {
    try {
      await laravelApi().get(`/user/check-before-withdrawal/${values.amount}`)

      setLastWithdrawalAmount(values.amount)
      return openPopUp(values.amount)
    } catch (e) {
      notify(e?.response?.data?.error || 'Sorry, Something Went Wrong. Please Try Again', {
        type: 'error'
      })
    }
  }
  return (
    <DashboardLayout data={user} title={`Withdraw Now`}>
      <DashboardTitle title="Withdraw Now" />
      <main className="bg-white w-full mx-auto p-4 md:p-8 my-5 rounded-lg shadow-2xl">
        <section>
          <h3 className="font-bold text-2xl">Enter Withdrawal Amount</h3>
        </section>
        {user.verified === 'verified' ? (
          <form className="mt-10" onSubmit={handleSubmit(onSubmit)}>
            <div className="px-4">
              <InputTextField
                name="amount"
                label="Withdraw Amount"
                defaultValue={lastWithdrawnAmount ? lastWithdrawnAmount : undefined}
                error={errors.amount?.message}
                placeholder="Enter a amount between 1,000-50,000 tk"
                register={register}
              />
            </div>
            <SubmitButton submitting={submitting} title="Withdraw" />
          </form>
        ) : (
          <VerifyAccountFirst />
        )}
      </main>
    </DashboardLayout>
  )
}

export const getServerSideProps = withAuth(async (context) => {
  const { user } = context
  return { props: { user } }
})

export default WithdrawNow
