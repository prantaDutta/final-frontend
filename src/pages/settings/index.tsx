import React from 'react'
import useSWR from 'swr'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import Account from '../../components/settings/Account'
import LoanPreferenceForBorrower from '../../components/settings/LoanPreferenceForBorrower'
import LoanPreferenceForLender from '../../components/settings/LoanPreferenceForLender'
import Personal from '../../components/settings/Personal'
import Security from '../../components/settings/Security'
import DashboardTitle from '../../components/shared/DashboardTitle'
import FetchError from '../../components/shared/FetchError'
import FullWidthReactLoader from '../../components/shared/FullWidthReactLoader'
import { ModifiedUserData } from '../../utils/randomTypes'
import withAuth from '../../utils/withAuth'

interface SettingsProps {
  user: ModifiedUserData
}

const Settings: React.FC<SettingsProps> = ({ user }) => {
  const { data, mutate, error } = useSWR(`/user/`)
  if (error) {
    return <FetchError user={user} />
  }
  return (
    <DashboardLayout data={user} title={`Settings`}>
      <DashboardTitle backButton={false} title="Settings" />
      {data ? (
        <>
          <Personal data={data} mutate={mutate} />
          <Account data={data} mutate={mutate} />
          <Security data={data} mutate={mutate} />
          {user.role === 'lender' && <LoanPreferenceForLender />}
          {user.role === 'borrower' && <LoanPreferenceForBorrower />}
        </>
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

export default Settings
