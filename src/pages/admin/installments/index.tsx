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
import { ModifiedUserData } from '../../../utils/randomTypes'
import withAdminAuth from '../../../utils/withAdminAuth'
import { installmentStatusSelectTypes } from '../loans'

interface InstallmentsProps {
  user: ModifiedUserData
}

const Installments: React.FC<InstallmentsProps> = ({ user }) => {
  const [installmentStatus, setInstallmentStatus] = useState<'due' | 'unpaid' | 'paid' | 'all'>('all')
  const { data, mutate, error } = useSWR(`/admin/installments/${installmentStatus}`)
  if (error) {
    return <FetchError user={user} />
  }
  return (
    <DashboardLayout data={user} title={`Installments`}>
      <div className="flex justify-between">
        <DashboardTitle backButton={false} title="Installments" />
        <FlexibleSelectButton
          selectValue={installmentStatus}
          setSelectValue={setInstallmentStatus}
          selectArray={installmentStatusSelectTypes}
          isValidating={!data}
        />
      </div>
      {data ? (
        <ReadyMadeTable
          title={`${installmentStatus} Installments`}
          data={data.installments}
          isValidating={!data}
          header={AdminInstallmentTableHeader}
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

export default Installments

export const AdminInstallmentTableHeader: Column[] = [
  //   {
  //     Header: "Installment Id",
  //     accessor: "uniqueInstallmentId",
  //   },
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
      <Link href={`/admin/installments/${value}`}>
        <span className="check">Check</span>
      </Link>
    )
  }
]
