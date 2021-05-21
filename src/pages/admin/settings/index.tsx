import React from 'react'
import useSWR from 'swr'
import DashboardLayout from '../../../components/layouts/DashboardLayout'
import Account from '../../../components/settings/Account'
import Administration from '../../../components/settings/Administration'
import Personal from '../../../components/settings/Personal'
import Security from '../../../components/settings/Security'
import DashboardTitle from '../../../components/shared/DashboardTitle'
import FetchError from '../../../components/shared/FetchError'
import FullWidthReactLoader from '../../../components/shared/FullWidthReactLoader'
import { ModifiedUserData } from '../../../utils/randomTypes'
import withAdminAuth from '../../../utils/withAdminAuth'

interface dashboardProps {
  user: ModifiedUserData
}

const Settings: React.FC<dashboardProps> = ({ user }) => {
  const { data, mutate, error } = useSWR(`/admin/`)
  if (error) {
    return <FetchError user={user} />
  }
  return (
    <DashboardLayout data={user} title={`Settings`}>
      <DashboardTitle backButton={false} title="Settings" />
      {data ? (
        <>
          <Personal mutate={mutate} data={data} />
          {user.role !== 'admin' && <Account data={data} mutate={mutate} />}
          <Security mutate={mutate} data={data} />
          <Administration />
        </>
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

export default Settings
