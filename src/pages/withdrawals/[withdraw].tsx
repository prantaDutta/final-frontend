import React from 'react'
import useSWR from 'swr'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import DashboardTitle from '../../components/shared/DashboardTitle'
import FetchError from '../../components/shared/FetchError'
import FullWidthReactLoader from '../../components/shared/FullWidthReactLoader'
import ShowDetailsInATableWithLinks from '../../components/shared/ShowDetailsInATableWithLinks'
import { objectToArrayAndExclude } from '../../utils/functions'
import { ModifiedUserData } from '../../utils/randomTypes'
import withAuth from '../../utils/withAuth'
import ErrorPage from '../404'

interface withdrawProps {
  user: ModifiedUserData
  withdrawId: string
}

const withdraw: React.FC<withdrawProps> = ({ user, withdrawId }) => {
  if (!withdrawId) return <ErrorPage />
  const { data, error } = useSWR(`/user/get-single-transaction/withdraw/${withdrawId}`)

  if (error) {
    return <FetchError user={user} />
  }

  return (
    <DashboardLayout data={user} title={`Withdrawal Details`}>
      <DashboardTitle title={`Withdrawal Details`} backButton />

      {data ? (
        <ShowDetailsInATableWithLinks
          title="Withdrawal Data"
          dataArray={[
            ...objectToArrayAndExclude(data.transaction, ['id']),
            ...objectToArrayAndExclude(data.details, ['id'])
          ]}
        />
      ) : (
        <FullWidthReactLoader />
      )}
    </DashboardLayout>
  )
}

export const getServerSideProps = withAuth(async (context) => {
  const { user, query } = context
  const withdrawId: string = query.withdraw
  return { props: { user, withdrawId } }
})

export default withdraw
