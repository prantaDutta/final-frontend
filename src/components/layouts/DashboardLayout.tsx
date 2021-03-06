import { NextSeo } from 'next-seo'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { useSessionStorage } from '../../hooks/useSessionStorage'
import { mainNav, openSidebar } from '../../states/dashboardStates'
import { authenticatedUserData } from '../../states/userStates'
import { ModifiedUserData } from '../../utils/randomTypes'
import Sidebar from '.././dashboard/Sidebar'
import DashboardNav from '../dashboard/DashboardNav'
import SvgIcon from '../shared/SvgIcon'

interface DashboardLayoutProps {
  data: ModifiedUserData
  title?: string
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ data, children, title }) => {
  const router = useRouter()
  const [, setUserData] = useRecoilState(authenticatedUserData)

  const [mounted, setMounted] = useState(false)

  const [verifyWarning, setVerifyWarning] = useSessionStorage('verify-warning', 'verified')

  useEffect(() => {
    setUserData(data)
    setMounted(true)
    if (data.verified === 'verified' || verifyWarning === 'verified') {
      setVerifyWarning('verified')
    } else {
      setVerifyWarning('unverified')
    }
  }, [])

  const [showSidebar, setSidebar] = useRecoilState(openSidebar)
  const [showMainNav, setMainNav] = useRecoilState(mainNav)

  return (
    <>
      <NextSeo title={title} titleTemplate={`%s | Grayscale`} />
      <div className={`md:hidden flex justify-between`}>
        <button
          onClick={() => setSidebar(!showSidebar)}
          className="p-3 text-primary hover:bg-primary hover:text-white focus:outline-none focus:ring-0"
        >
          <SvgIcon d={`M4 6h16M4 12h16M4 18h16`} />
        </button>
        <div className="cursor-pointer py-2">
          {/* <Link href="/"> */}
          <Image
            src={`/new-logo.png`}
            alt="Icon"
            width="50"
            height="30"
            // layout="responsive"
            className=""
          />
          {/* </Link> */}
        </div>
        <button
          className="p-3 text-primary hover:bg-primary hover:text-white focus:outline-none focus:ring-0"
          onClick={() => setMainNav(!showMainNav)}
        >
          <SvgIcon
            d={`M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z`}
          />
        </button>
      </div>
      <div className={`md:grid md:grid-cols-5 relative`} onClick={() => setSidebar(false)}>
        <div className="hidden md:block">
          <Sidebar role={data?.role} />
        </div>
        <div className="md:hidden">
          <Sidebar role={data?.role} />
        </div>
        <div className={`col-span-4 bg-gray-300 min-h-screen`}>
          <DashboardNav />
          {mounted && verifyWarning === 'unverified' && (
            <div className={`flex justify-center items-center text-center mt-2`}>
              <button
                type="button"
                className="px-4 py-2 mt-5 md:mt-0 rounded-lg bg-primary flex items-center focus:outline-none focus:ring-0"
              >
                <span className="text-white font-semibold" onClick={() => router.push('/verify')}>
                  Please Verify Your Account Now{' '}
                </span>
                <span className="text-red px-4" onClick={() => setVerifyWarning('verified')}>
                  <SvgIcon d="M6 18L18 6M6 6l12 12" classNames="w-4 h-4" />
                </span>
              </button>
            </div>
          )}
          <div className={`grid grid-cols-3 gap-8 mx-5 md:mx-16  ${showSidebar ? 'opacity-30 z-0' : 'z-30'}`}>
            <div className="col-start-1 col-span-4">
              <div className="text-gray-900 md:px-5 pt-4 md:py-5">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DashboardLayout
