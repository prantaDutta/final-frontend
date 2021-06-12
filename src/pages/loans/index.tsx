import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { Cell } from 'react-table'
import { useRecoilState } from 'recoil'
import useSWR from 'swr'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import ReadyMadeTable from '../../components/ReactTable/ReadyMadeTable'
import DashboardTitle from '../../components/shared/DashboardTitle'
import FetchError from '../../components/shared/FetchError'
import FlexibleSelectButton from '../../components/shared/FlexibleSelectButton'
import FullWidthReactLoader from '../../components/shared/FullWidthReactLoader'
import { userLoansPageState } from '../../states/dropdownStates'
import { ModifiedUserData } from '../../utils/randomTypes'
import withAuth from '../../utils/withAuth'
import { loanModeSelectTypes } from '../admin/loans'

interface currentLoansProps {
  user: ModifiedUserData
}

const currentLoans: React.FC<currentLoansProps> = ({ user }) => {
  const router = useRouter()
  const [loanType, setLoanType] = useRecoilState(userLoansPageState)
  const { data, mutate, error } = useSWR(`/user/loans/${loanType}`)
  if (error) {
    return <FetchError user={user} />
  }
  return (
    <DashboardLayout data={user} title={`All Loans`}>
      <div className="md:flex justify-between">
        <DashboardTitle backButton={false} title="Current Loans" />
        <div className="md:w-1/2 flex justify-between my-2">
          <FlexibleSelectButton
            selectValue={loanType}
            setSelectValue={setLoanType}
            selectArray={loanModeSelectTypes}
            isValidating={!data}
          />
          {user.role === 'borrower' && (
            <button onClick={() => router.push('/loans/new-loan')} className="primary-btn">
              New Loan
            </button>
          )}
        </div>
      </div>
      <div className="mt-5">
        {data ? (
          <ReadyMadeTable
            title={`${loanType} Loans`}
            data={data.loans}
            isValidating={!data}
            header={UserLoansTableHeader}
            pagination
            emptyMessage="No Loans Found"
            mutateData={() => mutate()}
          />
        ) : (
          <FullWidthReactLoader />
        )}
      </div>
    </DashboardLayout>
  )
}

export const getServerSideProps = withAuth(async (context) => {
  const { user } = context
  return { props: { user } }
})

export default currentLoans

export const UserLoansTableHeader = [
  {
    Header: 'Amount',
    accessor: 'amount'
  },
  // {
  //   Header: "Monthly Installment",
  //   accessor: "monthlyInstallment",
  // },
  {
    Header: 'Interest Rate (%)',
    accessor: 'interest Rate (%)'
  },
  {
    Header: 'Loan Duration (Months)',
    accessor: 'loan Duration (Months)'
  },
  {
    Header: 'Monthly Installment',
    accessor: 'monthly Installment'
  },
  {
    Header: 'Loan Mode',
    accessor: 'loan Mode'
  },
  {
    Header: 'Action',
    accessor: 'id',
    Cell: ({ value }: Cell) => (
      <Link href={`/loans/${value}`}>
        <span className="btn bg-primary text-white px-3 py-2">Check</span>
      </Link>
    )
  }
]
