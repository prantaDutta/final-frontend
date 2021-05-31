import React from 'react'
import useSWR from 'swr'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import DashboardTitle from '../../components/shared/DashboardTitle'
import FetchError from '../../components/shared/FetchError'
import FullWidthReactLoader from '../../components/shared/FullWidthReactLoader'
import PDFComponent from '../../components/shared/PDFComponent'
import ShowDetailsInATableWithLinks from '../../components/shared/ShowDetailsInATableWithLinks'
import { objectToArrayAndExclude } from '../../utils/functions'
import { ModifiedUserData } from '../../utils/randomTypes'
import withAuth from '../../utils/withAuth'
import ErrorPage from '../404'

interface DepositProps {
  user: ModifiedUserData
  depositId: string
}

const Deposit: React.FC<DepositProps> = ({ user, depositId }) => {
  if (!depositId) return <ErrorPage />

  const { data, error } = useSWR(`/user/get-single-transaction/deposit/${depositId}`)

  if (error) {
    return <FetchError user={user} />
  }
  let dataArray = []
  if (data) {
    dataArray = [...objectToArrayAndExclude(data.transaction, ['id']), ...objectToArrayAndExclude(data.details, ['id'])]
  }
  return (
    <DashboardLayout data={user} title={`Deposit Details`}>
      <DashboardTitle title={`Deposit Details`} backButton />

      {data ? (
        <>
          <ShowDetailsInATableWithLinks title="Deposit Data" dataArray={dataArray} />
          <PDFComponent data={dataArray} />
        </>
      ) : (
        <FullWidthReactLoader />
      )}
    </DashboardLayout>
  )
}

export const getServerSideProps = withAuth(async (context) => {
  const { user, query } = context
  const depositId: string = query.deposit
  return { props: { user, depositId } }
})

export default Deposit
