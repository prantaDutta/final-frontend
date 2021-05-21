import Link from 'next/link'
import React, { useState } from 'react'
import { Cell, Column } from 'react-table'
import useSWR from 'swr'
import DashboardLayout from '../../../components/layouts/DashboardLayout'
import ReadyMadeTable from '../../../components/ReactTable/ReadyMadeTable'
import DashboardTitle from '../../../components/shared/DashboardTitle'
import FetchError from '../../../components/shared/FetchError'
import FlexibleSelectButton from '../../../components/shared/FlexibleSelectButton'
import FullWidthReactLoader from '../../../components/shared/FullWidthReactLoader'
import { formatDate } from '../../../utils/functions'
import { ModifiedUserData, SelectOptionsTypes } from '../../../utils/randomTypes'
import withAdminAuth from '../../../utils/withAdminAuth'

interface VerificationRequestsProps {
  user: ModifiedUserData
}

const WithdrawalRequests: React.FC<VerificationRequestsProps> = ({ user }) => {
  const [transactionType, setType] = useState<'deposit' | 'withdraw' | 'all'>('withdraw')
  const [transactionStatus, setStatus] = useState<'Pending' | 'Completed' | 'Failed' | 'Canceled' | 'all'>('Pending')
  const { data, mutate, error } = useSWR(`/admin/transactions/${transactionType}/${transactionStatus}`)
  if (error) {
    return <FetchError user={user} />
  }
  return (
    <DashboardLayout data={user} title={`Transactions`}>
      <div className="flex justify-between">
        <DashboardTitle backButton={false} title="Transactions" />
        <FlexibleSelectButton
          selectValue={transactionType}
          setSelectValue={setType}
          selectArray={selectTransactionType}
          isValidating={!data}
        />
        <FlexibleSelectButton
          selectValue={transactionStatus}
          setSelectValue={setStatus}
          selectArray={selectTransactionStatusTypes}
          isValidating={!data}
        />
      </div>
      {data ? (
        <ReadyMadeTable
          title={`Transactions (${transactionType})`}
          data={data.requests}
          isValidating={!data}
          header={AdminTransactionsTableHeader}
          pagination
          emptyMessage="You Don't have new Withdrawal Requests"
          mutateData={() => mutate()}
        />
      ) : (
        <FullWidthReactLoader />
      )}
    </DashboardLayout>
  )
}

export const getServerSideProps = withAdminAuth(async (context) => {
  const { user } = context
  return { props: { user } }
})

export default WithdrawalRequests

export const AdminTransactionsTableHeader: Column[] = [
  {
    Header: 'Name',
    accessor: 'name'
  },
  {
    Header: 'Amount',
    accessor: 'amount'
  },
  {
    Header: 'Transaction Type',
    accessor: 'transactionType'
  },
  {
    Header: 'Status',
    accessor: 'status'
  },
  {
    Header: 'Created At',
    accessor: 'createdAt',
    Cell: ({ value }: Cell) => formatDate(value, 'MMM D, YYYY h:mm A')
  },
  {
    Header: 'Action',
    accessor: 'id',
    Cell: ({ value }: Cell) => (
      <Link href={`/admin/transactions/${value}`}>
        <span className="check">Check</span>
      </Link>
    )
  }
]

export const selectTransactionType: SelectOptionsTypes[] = [
  {
    title: 'All',
    value: 'all'
  },
  {
    title: 'Deposits',
    value: 'deposit'
  },
  {
    title: 'Withdrawals',
    value: 'withdraw'
  }
]

export const selectTransactionStatusTypes: SelectOptionsTypes[] = [
  {
    title: 'All',
    value: 'all'
  },
  {
    title: 'Completed',
    value: 'Completed'
  },
  {
    title: 'Failed',
    value: 'Failed'
  },
  {
    title: 'Canceled',
    value: 'Canceled'
  },
  {
    title: 'Pending',
    value: 'Pending'
  }
]
