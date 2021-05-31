import { useRouter } from 'next/router'
import React from 'react'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'
import useSWR from 'swr'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import DashboardTitle from '../../components/shared/DashboardTitle'
import FetchError from '../../components/shared/FetchError'
import FullWidthReactLoader from '../../components/shared/FullWidthReactLoader'
import ShowDetailsInATableWithLinks from '../../components/shared/ShowDetailsInATableWithLinks'
import { laravelApi } from '../../utils/api'
import { objectToArrayAndExclude } from '../../utils/functions'
import { ModifiedUserData } from '../../utils/randomTypes'
import { notify } from '../../utils/toasts'
import withAuth from '../../utils/withAuth'
import ErrorPage from '../404'

interface InstallmentProps {
  user: ModifiedUserData
  installmentId: string
}

const Installment: React.FC<InstallmentProps> = ({ user, installmentId }) => {
  if (!installmentId) return <ErrorPage />

  const router = useRouter()
  const { data, error } = useSWR(`/user/get-single-installment/${installmentId}`)

  if (error) {
    setTimeout(() => {
      return <FetchError user={user} />
    }, 5000)
  }

  const handlePay = async () => {
    try {
      const { data: SomeData } = await laravelApi().post('/user/pay-installment', {
        amount: data?.installment.totalAmount,
        id: data?.installment.id
      })
      console.log('Successfully Paid', SomeData)
      notify('Paid Successfully', {
        type: 'success'
      })
      return router.push('/installments')
    } catch (e) {
      console.log(e)
      notify(e?.response?.data?.error || 'Something Went Wrong', {
        type: 'error'
      })
    }
  }

  const submit = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui bg-primary px-16 py-8 text-white rounded-lg">
            <h1 className="font-bold text-2xl my-2">Are you sure?</h1>
            <p className="text-xl font-semibold my-5">
              You are paying {data?.installment['total Amount']} Tk. as installment
            </p>
            <div className="flex justify-between">
              <button
                className="px-4 py-2 rounded-lg bg-white text-primary font-bold focus:outline-none focus:ring-1 focus:ring-bg-gray-300 hover:text-white hover:bg-primaryAccent transition-css"
                onClick={onClose}
              >
                No
              </button>
              <button
                className="px-4 py-2 rounded-lg bg-white text-primary font-bold focus:outline-none focus:ring-1 focus:ring-bg-gray-300 hover:text-white hover:bg-primaryAccent transition-css"
                onClick={async () => {
                  await handlePay()
                  onClose()
                }}
              >
                Yes, Pay
              </button>
            </div>
          </div>
        )
      }
    })
  }
  return (
    <DashboardLayout data={user} title={`Installment Details`}>
      <div className="flex justify-between">
        <DashboardTitle title={`Installment Details`} />
        {data && data.installment.status !== 'paid' && user.role === 'borrower' && (
          <div>
            <button className="container edit-btn" onClick={submit}>
              Pay Now
            </button>
          </div>
        )}
      </div>
      {data ? (
        <>
          <ShowDetailsInATableWithLinks
            title="Installment Data"
            dataArray={objectToArrayAndExclude(data.installment, ['id'])}
          />
          <ShowDetailsInATableWithLinks
            title="Loan Data"
            dataArray={objectToArrayAndExclude(data.loan, ['id'])}
            urlArray={[`/loans/${data.loan.id}`]}
          />
        </>
      ) : (
        <FullWidthReactLoader />
      )}
    </DashboardLayout>
  )
}

export const getServerSideProps = withAuth(async (context) => {
  const { user, query } = context
  const installmentId: string = query.installment
  return { props: { user, installmentId } }
})

export default Installment
