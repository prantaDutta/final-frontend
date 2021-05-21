import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { Cell, Column } from 'react-table'
import useSWR from 'swr'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import ReadyMadeTable from '../../components/ReactTable/ReadyMadeTable'
import DashboardTitle from '../../components/shared/DashboardTitle'
import FetchError from '../../components/shared/FetchError'
import FullWidthReactLoader from '../../components/shared/FullWidthReactLoader'
import { ModifiedUserData } from '../../utils/randomTypes'
import withAuth from '../../utils/withAuth'

interface dashboardProps {
  user: ModifiedUserData
}

const Deposits: React.FC<dashboardProps> = ({ user }) => {
  const router = useRouter()
  const { data, mutate, error } = useSWR(`/user/get-all-deposits`)
  if (error) {
    return <FetchError user={user} />
  }
  return (
    <DashboardLayout data={user} title={`Deposits`}>
      <div className="flex justify-between my-2">
        <DashboardTitle backButton={false} title="Deposit Money" />
        <button onClick={() => router.push('/deposits/deposit-now')} className="primary-btn">
          Deposit
        </button>
      </div>

      {data ? (
        <ReadyMadeTable
          title="Latest Deposits"
          data={data.transactions}
          isValidating={!data}
          header={DepositsTableHeader}
          pagination
          emptyMessage="You Never Deposited Any Money"
          mutateData={() => mutate()}
        />
      ) : (
        <FullWidthReactLoader />
      )}
    </DashboardLayout>
  )
}

export const getServerSideProps = withAuth(async (context) => {
  const { user } = context
  return { props: { user } }
})

export default Deposits

export const DepositsTableHeader: Column[] = [
  {
    Header: 'Transaction Id',
    accessor: 'transactionId'
  },
  {
    Header: 'Amount',
    accessor: 'amount'
  },
  {
    Header: 'Status',
    accessor: 'status'
  },
  // {
  //     Header: "Transaction Type",
  //     accessor: "transactionType",
  // },
  {
    Header: 'Action',
    accessor: 'id',
    Cell: ({ value }: Cell) => (
      <Link href={`/deposits/${value}`}>
        <span className="btn bg-primary text-white px-3 py-2">Check</span>
      </Link>
    )
  }
]
