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

interface UserInstallmentsProps {
  user: ModifiedUserData
  userId: string
}

const UserInstallments: React.FC<UserInstallmentsProps> = ({ user, userId }) => {
  const { data, mutate, error } = useSWR(`/admin/user/user-installments/${userId}`)
  if (error) {
    return <FetchError user={user} />
  }
  return (
    <DashboardLayout data={user} title={`User Installments`}>
      <DashboardTitle title={`User Installments`} backButton />
      {data ? (
        <ReadyMadeTable
          title={`All Installments By ${data.name}`}
          data={data.installments}
          pagination
          isValidating={!data}
          header={AdminInstallmentTableHeader}
          emptyMessage="No Installments Found"
          mutateData={() => mutate()}
        />
      ) : (
        <FullWidthReactLoader />
      )}
    </DashboardLayout>
  )
}

export default UserInstallments

export const getServerSideProps = withAdminAuth(async (context) => {
  const { user, query } = context

  const userId: any = query.user

  return {
    props: { user, userId }
  }
})
