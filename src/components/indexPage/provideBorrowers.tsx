import IndexPageSection from './IndexPageSection'
import SvgIcon from '../shared/SvgIcon'
import React from 'react'

interface provideBorrowersProps {}

const ProvideBorrowers: React.FC<provideBorrowersProps> = ({}) => {
  return (
    <IndexPageSection title="Our Borrowers Can">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {borrowers &&
          borrowers.map((borrower) => {
            return (
              <div
                className="bg-gray-200 text-gray-700 shadow-md p-3 md:p-5 mt-10 text-center cursor-pointer rounded-md hover:shadow-2xl transition-css"
                key={borrower.title}
              >
                <div className="flex justify-center items-center mb-3 md:mb-4">
                  <SvgIcon classNames="w-12 h-12 inline-block text-primary" d={borrower.d} />
                </div>
                <p className="font-semibold text-2xl">{borrower.title}</p>
                <p className="font-normal text-lg mt-5">{borrower.content}</p>
              </div>
            )
          })}
      </div>
    </IndexPageSection>
  )
}

const borrowers = [
  {
    title: 'Get a Low Rate',
    content: 'Get a loan with a low, fixed rate that never goes up. Check your rate online instantly.',
    d: 'M15 13l-3 3m0 0l-3-3m3 3V8m0 13a9 9 0 110-18 9 9 0 010 18z'
  },
  {
    title: 'Pay at Your Own Pace',
    content: 'Pay off your loan with fixed 3 or 5-year* terms, and a budget-friendly, single monthly payment.',
    d: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
  },
  {
    title: 'Diversified Investment',
    content: 'Save money with no pre-payment penalties.',
    d: 'M11 11V9a2 2 0 00-2-2m2 4v4a2 2 0 104 0v-1m-4-3H9m2 0h4m6 1a9 9 0 11-18 0 9 9 0 0118 0z'
  },
  {
    title: 'Diversified Investment 2',
    content: 'Save money with no pre-payment penalties.',
    d: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
  }
]

export default ProvideBorrowers
