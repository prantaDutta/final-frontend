import React from 'react'
import { Cell, Column } from 'react-table'
import useSWR, { trigger } from 'swr'
import DashboardLayout from '../../../components/layouts/DashboardLayout'
import ReadyMadeTable from '../../../components/ReactTable/ReadyMadeTable'
import DashboardTitle from '../../../components/shared/DashboardTitle'
import FetchError from '../../../components/shared/FetchError'
import FullWidthReactLoader from '../../../components/shared/FullWidthReactLoader'
import { laravelApi } from '../../../utils/api'
import { ModifiedUserData } from '../../../utils/randomTypes'
import withAuth from '../../../utils/withAuth'

interface NotificationsProps {
  user: ModifiedUserData
}

const Notifications: React.FC<NotificationsProps> = ({ user }) => {
  const { data, mutate, error } = useSWR(`/user/get-all-notifications`)
  if (error) {
    return <FetchError user={user} />
  }
  return (
    <DashboardLayout data={user} title={`All Notifications`}>
      <DashboardTitle title="Notifications" />

      {data ? (
        <ReadyMadeTable
          title="Latest Notifications"
          data={data.notifications}
          isValidating={!data}
          header={NotificationsTableHeader}
          pagination
          emptyMessage="You don't have any Notifications"
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

export default Notifications

export const NotificationsTableHeader: Column[] = [
  {
    Header: 'Notification',
    accessor: 'data.msg'
  },
  {
    Header: 'Created At',
    accessor: 'diffForHumans'
  },
  {
    Header: 'Action',
    accessor: 'id',
    Cell: ({ value }: Cell) => (
      <svg
        onClick={async () => {
          await laravelApi().post(`/user/delete-single-notification/${value}`)
          await trigger('/user/get-all-notifications')
        }}
        className="w-6 h-6 inline mt-0.5 text-red-600 cursor-pointer"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
        />
      </svg>
    )
  }
]
