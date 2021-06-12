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
import { userWithdrawalsStatusPageState } from '../../states/dropdownStates'
import { isProduction } from '../../utils/constants'
import { ModifiedUserData } from '../../utils/randomTypes'
import withAuth from '../../utils/withAuth'
import { selectTransactionStatusTypes } from '../admin/transactions'

interface dashboardProps {
  user: ModifiedUserData
}

const Withdrawals: React.FC<dashboardProps> = ({ user }) => {
  const router = useRouter()
  const [withdrawalStatus, setWithdrawalsStatus] = useRecoilState(userWithdrawalsStatusPageState)
  const { data, mutate, error } = useSWR(`/user/get-all-withdrawals/` + withdrawalStatus)
  if (data && !isProduction) console.log('data: ', data)

  if (error) {
    return <FetchError user={user} />
  }
  return (
    <DashboardLayout data={user} title={`Withdrawals`}>
      <div className="flex justify-between my-2">
        <DashboardTitle backButton={false} title="Withdraw Money" />
        <FlexibleSelectButton
          selectValue={withdrawalStatus}
          setSelectValue={setWithdrawalsStatus}
          selectArray={selectTransactionStatusTypes}
          isValidating={!data}
        />
        <button onClick={() => router.push('/withdrawals/withdraw-now')} className="primary-btn">
          Withdraw Money
        </button>
      </div>

      {data ? (
        <ReadyMadeTable
          title="Latest Withdrawals"
          data={data.transactions}
          isValidating={!data}
          header={withdrawalsTableHeader}
          pagination
          emptyMessage="You have never Withdrawn any Money"
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

export default Withdrawals

export const withdrawalsTableHeader: Column[] = [
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
  {
    Header: 'Action',
    accessor: 'id',
    Cell: ({ value }: Cell) => (
      <Link href={`/withdrawals/${value}`}>
        <span className="btn bg-primary text-white px-3 py-2">Check</span>
      </Link>
    )
  }
]
