import { withIronSession } from 'next-iron-session'
import Layout from '../components/layouts/Layout'
import { NEXT_IRON_SESSION_CONFIG } from '../utils/constants'
import { ModifiedUserData } from '../utils/randomTypes'
import React from 'react'
import ErrorComponent from '../components/shared/ErrorComponent'

interface offlineProps {
  user: ModifiedUserData
  code?: number
  errorMsg?: string
  description?: string
}

const Offline: React.FC<offlineProps> = ({
  user,
  code = 503,
  errorMsg = 'Oops! You are Offline',
  description = 'Please check your internet connection and reload the page'
}) => {
  return (
    <Layout data={user} title={`Oops, You are Offline`}>
      <div className={``}>
        <ErrorComponent code={code} errorMsg={errorMsg} description={description} />
      </div>
    </Layout>
  )
}

export const getServerSideProps = withIronSession(async ({ req }) => {
  const user = req.session.get('user')
  if (!user) {
    return { props: {} }
  }

  return {
    props: { user }
  }
}, NEXT_IRON_SESSION_CONFIG)

export default Offline
