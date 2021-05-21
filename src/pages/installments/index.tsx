import Link from 'next/link'
import React, { useState } from 'react'
import { Cell, Column } from 'react-table'
import useSWR from 'swr'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import ReadyMadeTable from '../../components/ReactTable/ReadyMadeTable'
import DashboardTitle from '../../components/shared/DashboardTitle'
import FetchError from '../../components/shared/FetchError'
import FlexibleSelectButton from '../../components/shared/FlexibleSelectButton'
import FullWidthReactLoader from '../../components/shared/FullWidthReactLoader'
import { formatDate } from '../../utils/functions'
import { ModifiedUserData } from '../../utils/randomTypes'
import withAuth from '../../utils/withAuth'
import { installmentStatusSelectTypes } from '../admin/loans'

interface indexProps {
  user: ModifiedUserData
}

const index: React.FC<indexProps> = ({ user }) => {
  const [installmentStatus, setInstallmentStatus] = useState<'due' | 'unpaid' | 'paid' | 'all'>('all')
  const { data, mutate, error } = useSWR(`/user/get-all-installments/${installmentStatus}`)
  if (error) {
    return <FetchError user={user} />
  }
  return (
    <DashboardLayout data={user} title={`Installments`}>
      <div className="flex justify-between my-2">
        <DashboardTitle backButton={false} title="Current Installments" />
        <FlexibleSelectButton
          selectValue={installmentStatus}
          setSelectValue={setInstallmentStatus}
          selectArray={installmentStatusSelectTypes}
          isValidating={!data}
        />
      </div>
      <div className="mt-5">
        {data ? (
          <ReadyMadeTable
            title={`${installmentStatus} Installments`}
            data={data.installments}
            isValidating={!data}
            header={InstallmentTableHeader}
            pagination
            emptyMessage="No User Found"
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

export default index

export const InstallmentTableHeader: Column[] = [
  // {
  //   Header: "Installment Id",
  //   accessor: "uniqueInstallmentId",
  // },
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
    accessor: 'penaltyAmount'
  },
  {
    Header: 'Total Amount',
    accessor: 'totalAmount'
  },
  {
    Header: 'Due Date',
    accessor: 'dueDate',
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
