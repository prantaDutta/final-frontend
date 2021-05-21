import IndexPageSection from './IndexPageSection'
import SvgIcon from '../shared/SvgIcon'
import React from 'react'

interface mobileAppProps {}

const MobileApp: React.FC<mobileAppProps> = ({}) => {
  return (
    <IndexPageSection title="Our Brand New Mobile App">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-5">
        <div className="col-span-1 lg:col-span-1 text-left pl-0 md:pl-16 pt-8 md:pt-10">
          <img alt={`Android App Image`} src="/android-screen.png" className="h-full w-full object-fit" />
        </div>
        <div className="col-span-1 md:col-span-1 lg:col-span-2 text-left md:pl-32 pt-4 md:pt-10">
          <div>
            <h4 className="font-medium md:font-xl text-xl sm:text-2xl text-center">
              A convenient option - Manage investments over mobile effortlessly with Investor 2.0
            </h4>
          </div>

          <div className="hidden lg:block">
            {features &&
              features.map((f) => {
                return (
                  <div className="flex mt-4" key={f.title}>
                    <SvgIcon d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                    <p className="ml-8">{f.title}</p>
                  </div>
                )
              })}
          </div>

          <div className="flex items-center justify-center p-0 md:p-2 py-0 md:py-2 my-0 md:my-3">
            {/* <div className="flex-col md:flex"> */}
            <div className="mx-1.5 md:mx-2">
              <img
                className="w-full h-full rounded-full object-fit"
                src="/google-play-badge.png"
                alt="Google Play Badge"
              />
            </div>
            <div className="mx-1.5 md:mx-2">
              <img className="w-full h-full rounded-full object-fit" src="/app-store-badge.png" alt="App Store Badge" />
            </div>
            {/* </div> */}
          </div>
        </div>
      </div>
    </IndexPageSection>
  )
}

const features = [
  {
    title: 'Brand New UI- Revamped dashboards, portfolio and invest pages'
  },
  {
    title: 'Bulk and Auto-Invest- Invest in multiple loan profiles while making utmost utilisation of your funds'
  },
  {
    title: 'UPI Enabled- Add funds instantly using UPI'
  },
  {
    title: 'Live Return Calculator and XIRR report with many more exciting features, click here to know more'
  }
]

export default MobileApp
