import React from 'react'
import useSWR from 'swr'
import DashboardLayout from '../../../../components/layouts/DashboardLayout'
import ReadyMadeTable from '../../../../components/ReactTable/ReadyMadeTable'
import DashboardTitle from '../../../../components/shared/DashboardTitle'
import FetchError from '../../../../components/shared/FetchError'
import FullWidthReactLoader from '../../../../components/shared/FullWidthReactLoader'
import { ModifiedUserData } from '../../../../utils/randomTypes'
import withAdminAuth from '../../../../utils/withAdminAuth'
import { AdminInstallmentTableHeader } from '../../installments'

interface LoanInstallmentsProps {
  user: ModifiedUserData
  loanId: string
}

const LoanInstallments: React.FC<LoanInstallmentsProps> = ({ user, loanId }) => {
  const { data, mutate, error } = useSWR(`/admin/user/loan-installments/${loanId}`)
  if (error) {
    return <FetchError user={user} />
  }
  return (
    <DashboardLayout data={user} title={`Loan Installments`}>
      <DashboardTitle title={`User Loan Installments`} backButton />
      {data ? (
        <ReadyMadeTable
          title={`All Installments For Loan ${data.id}`}
          data={data.installments}
          pagination
          isValidating={!data}
          header={AdminInstallmentTableHeader}
          emptyMessage="No LoanInstallments Found"
          mutateData={() => mutate()}
        />
      ) : (
        <FullWidthReactLoader />
      )}
    </DashboardLayout>
  )
}

export default LoanInstallments

export const getServerSideProps = withAdminAuth(async (context) => {
  const { user, query } = context

  const loanId: any = query.loan

  return {
    props: { user, loanId }
  }
})
