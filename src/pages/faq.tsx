import { withIronSession } from 'next-iron-session'
import React, { useState } from 'react'
import ShowSections from '../components/faq/ShowSections'
import Layout from '../components/layouts/Layout'
import { NEXT_IRON_SESSION_CONFIG } from '../utils/constants'
import { redirectToPage } from '../utils/functions'
import { ModifiedUserData } from '../utils/randomTypes'

interface faqProps {
  user: ModifiedUserData
}

const faqSections = ['borrower', 'lender', 'about us', 'how it works']

const faq: React.FC<faqProps> = ({ user }) => {
  const [active, setActive] = useState('borrower')
  return (
    <Layout data={user} title={`FAQs`}>
      <div className="my-2 mx-auto max-w-lg">
        <h2 className="px-4 py-2 font-bold text-2xl text-center text-primary">
          FREQUENTLY ASKED QUESTION
        </h2>
        <div className="flex justify-between my-5">
          {faqSections.map((section) => {
            return (
              <button
                onClick={() => setActive(section)}
                className={`px-4 py-2 mx-2 font-semibold text-lg rounded-md capitalize transition-css focus:outline-none focus:ring-0 ${
                  active === section
                    ? 'bg-primary text-white'
                    : 'text-primary hover:bg-primary hover:text-white'
                }`}
                key={section}
              >
                {section}
              </button>
            )
          })}
        </div>
      </div>
      <div className="my-5 mx-auto max-w-xl text-gray-600">
        <ShowSections active={active} />
      </div>
    </Layout>
  )
}

export const getServerSideProps = withIronSession(async ({ req, res }) => {
  const user = req.session.get('user')
  if (user) {
    await redirectToPage(req, res, '/dashboard')
  }

  return {
    props: {},
  }
}, NEXT_IRON_SESSION_CONFIG)

export default faq
