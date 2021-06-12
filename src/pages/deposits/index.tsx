import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { Cell, Column } from 'react-table'
import { useRecoilState } from 'recoil'
import useSWR from 'swr'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import ReadyMadeTable from '../../components/ReactTable/ReadyMadeTable'
import DashboardTitle from '../../components/shared/DashboardTitle'
import FetchError from '../../components/shared/FetchError'
import FlexibleSelectButton from '../../components/shared/FlexibleSelectButton'
import FullWidthReactLoader from '../../components/shared/FullWidthReactLoader'
import { userDepositsStatusPageState } from '../../states/dropdownStates'
import { ModifiedUserData } from '../../utils/randomTypes'
import withAuth from '../../utils/withAuth'
import { selectTransactionStatusTypes } from '../admin/transactions'

interface dashboardProps {
  user: ModifiedUserData
}

const Deposits: React.FC<dashboardProps> = ({ user }) => {
  const router = useRouter()
  const [depositStatus, setDepositStatus] = useRecoilState(userDepositsStatusPageState)
  const { data, mutate, error } = useSWR(`/user/get-all-deposits/` + depositStatus)
  if (error) {
    return <FetchError user={user} />
  }
  return (
    <DashboardLayout data={user} title={`Deposits`}>
      <div className="flex justify-between my-2">
        <DashboardTitle backButton={false} title="Deposit Money" />
        <FlexibleSelectButton
          selectValue={depositStatus}
          setSelectValue={setDepositStatus}
          selectArray={selectTransactionStatusTypes}
          isValidating={!data}
        />
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
    accessor: 'transaction Id'
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
