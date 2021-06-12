import Link from 'next/link'
import React from 'react'
import { useRecoilValue } from 'recoil'
import { shouldNotify } from '../../states/userStates'
import { notify } from '../../utils/toasts'
import DashboardTitle from '../shared/DashboardTitle'
import FullWidthReactLoader from '../shared/FullWidthReactLoader'
import DashboardBubble from './DashboardBubble'

interface DashboardContentProps {
  data?: any
}

const AdminDashboardContent: React.FC<DashboardContentProps> = ({ data }) => {
  const shouldNotifyValue = useRecoilValue(shouldNotify)
  if (data && shouldNotifyValue) {
    if (data.verifications > 0) {
      notify(`You have ${data.verifications} Verifications Requests`, {
        type: 'info',
        toastId: 'dashboard-verifications'
      })
    }
  }
  return (
    <div>
      <DashboardTitle backButton={false} title="Dashboard" />

      {data ? (
        <div className="grid grid-cols-2">
          <Link href={`/admin/users`}>
            <div className="mt-5">
              <DashboardBubble title="Pending Requests" shorterTitle={`${data.verifications} Request(s)`} />
            </div>
          </Link>

          <Link href={`/admin/loans`}>
            <div className="mt-5">
              <DashboardBubble title="Loan Requests" shorterTitle={`${data.loans} Loan(s)`} />
            </div>
          </Link>

          <Link href={`/admin/transactions`}>
            <div className="mt-5">
              <DashboardBubble title="Withdrawal Requests" shorterTitle={`${data.withdrawals} Withdrawal(s)`} />
            </div>
          </Link>
        </div>
      ) : (
        <FullWidthReactLoader />
      )}
    </div>
  )
}

export default AdminDashboardContent
