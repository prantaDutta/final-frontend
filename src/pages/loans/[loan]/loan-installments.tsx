import Link from 'next/link'
import React from 'react'
import { Cell, Column } from 'react-table'
import useSWR from 'swr'
import DashboardLayout from '../../../components/layouts/DashboardLayout'
import ReadyMadeTable from '../../../components/ReactTable/ReadyMadeTable'
import DashboardTitle from '../../../components/shared/DashboardTitle'
import FetchError from '../../../components/shared/FetchError'
import FullWidthReactLoader from '../../../components/shared/FullWidthReactLoader'
import { formatDate } from '../../../utils/functions'
import { ModifiedUserData } from '../../../utils/randomTypes'
import withAuth from '../../../utils/withAuth'

interface LoanInstallmentsProps {
  user: ModifiedUserData
  loanId: string
}

const LoanInstallments: React.FC<LoanInstallmentsProps> = ({ user, loanId }) => {
  const { data, mutate, error } = useSWR(`/user/loans/loan-installments/${loanId}`)
  if (error) {
    return <FetchError user={user} />
  }
  return (
    <DashboardLayout data={user} title={`Loan Installment Details`}>
      <DashboardTitle title={`User Loan Installments`} backButton />
      {data ? (
        <ReadyMadeTable
          title={`All Installments From Loan ${data.id}`}
          data={data.installments}
          pagination
          isValidating={!data}
          header={UserInstallmentTableHeader}
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

export const getServerSideProps = withAuth(async (context) => {
  const { user, query } = context

  const loanId: any = query.loan

  return {
    props: { user, loanId }
  }
})

export const UserInstallmentTableHeader: Column[] = [
  {
    Header: 'Amount',
    accessor: 'amount'
  },
  {
    Header: 'Status',
    accessor: 'status'
  },
  {
    Header: 'Penalty Amount',
    accessor: 'penalty Amount'
  },
  {
    Header: 'Total Amount',
    accessor: 'total Amount'
  },
  {
    Header: 'Due Date',
    accessor: 'due Date',
    Cell: ({ value }: Cell) => formatDate(value, 'MMM D, YYYY')
  },
  {
    Header: 'Action',
    accessor: 'id',
    Cell: ({ value }: Cell) => (
      <Link href={`/installments/${value}`}>
        <span className="btn bg-primary text-white px-3 py-2">Check</span>
      </Link>
    )
  }
]
