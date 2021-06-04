import { Menu, Transition } from '@headlessui/react'
import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/router'
import React, { Fragment, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import useSWR from 'swr'
import { authStatus } from '../../states/authStates'
import { mainNav } from '../../states/dashboardStates'
import { newLoanFormValues } from '../../states/newLoanState'
import { authenticatedUserData } from '../../states/userStates'
import { verificationFormValues } from '../../states/verificationStates'
import { laravelApi } from '../../utils/api'
import { logout } from '../../utils/auth'
import FloatingNotification from '../shared/FloatingNotifications'
import SvgIcon from '../shared/SvgIcon'

interface MainContentNavProps {}

const DashboardNav: React.FC<MainContentNavProps> = ({}) => {
  const [startLoggingOut, setLoggingOut] = useState<boolean>(false)
  const router = useRouter()
  const [, toggleAuth] = useRecoilState(authStatus)
  const userData = useRecoilValue(authenticatedUserData)
  const [, setVerifyData] = useRecoilState(verificationFormValues)
  const [, setNewLoanFormValues] = useRecoilState(newLoanFormValues)
  // for balance reload animation
  const [balanceAnimate, setBalanceAnimate] = useState(false)
  const [dueAnimate, setDueAnimate] = useState(false)
  const { data, mutate: NotifyMutate } = useSWR(`/user/dashboard-notifications`)
  // if (!isProduction) console.log("data: ", data);
  const [showNotificationsDiv, setNotificationsDiv] = useState<boolean>(false)

  // Fetch current balance
  const { data: balanceData, mutate } = useSWR(`/user/balance`)
  const [showMainNav] = useRecoilState(mainNav)

  // Fetch monthly due
  const { data: dueData, mutate: dueMutate } = useSWR(`/user/due-balance`)

  return (
    <>
      <div className={`hidden md:flex justify-end items-center bg-gray-200 pr-4`}>
        {userData?.role !== 'admin' && (
          <div className="flex items-center cursor-pointer p-4">
            <div>
              <SvgIcon
                classNames="w-6 h-6 mx-2"
                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
              />
            </div>

            <div>
              <h4>Available Balance: </h4>
              <h4 className="font-bold">
                <div className="flex">
                  <p>Tk. {balanceData ? parseFloat(balanceData.balance).toFixed(2) : (0).toFixed(2)}</p>
                  <button
                    className="pl-4 focus:outline-none focus:ring-0"
                    onClick={async () => {
                      setBalanceAnimate(true)
                      setTimeout(() => {
                        setBalanceAnimate(false)
                      }, 1000)
                      await mutate()
                    }}
                  >
                    <SvgIcon
                      classNames={`w-4 h-4 ${balanceAnimate && 'animate-spin'}`}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </button>
                </div>
              </h4>
            </div>
          </div>
        )}

        {userData?.role === 'borrower' && (
          <div className="flex items-center cursor-pointer p-4">
            <div>
              <SvgIcon
                classNames="w-6 h-6 mx-2"
                d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016zM12 9v2m0 4h.01"
              />
            </div>

            <div>
              <h4>Monthly Due: </h4>
              <h4 className="font-bold">
                <div className="flex">
                  <p>Tk. {dueData ? parseFloat(dueData?.amount).toFixed(2) : (0).toFixed(2)}</p>
                  <button
                    className="pl-4 focus:outline-none focus:ring-0"
                    onClick={async () => {
                      setDueAnimate(true)
                      setTimeout(() => {
                        setDueAnimate(false)
                      }, 1000)
                      await dueMutate()
                    }}
                  >
                    <SvgIcon
                      classNames={`w-4 h-4 ${dueAnimate && 'animate-spin'}`}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </button>
                </div>
              </h4>
            </div>
          </div>
        )}

        <div className="flex items-center cursor-pointer p-4 hover:bg-gray-300 rounded">
          <div>
            <SvgIcon
              classNames="w-6 h-6 mx-2"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </div>
          <div>
            <h4 className="">Welcome, </h4>
            <h4 className="font-bold">{userData?.name}</h4>
          </div>
        </div>
        
        <Menu as="div" className="relative inline-block p-4">
          <Menu.Button className="relative block border-2 border-transparent text-gray-800 rounded-full hover:text-gray-400 focus:outline-none focus:text-gray-500 transition duration-150 ease-in-out">
            <span
              onClick={async () => {
                setNotificationsDiv(!showNotificationsDiv)
                if (showNotificationsDiv) {
                  let notificationIds: any[] = []
                  data.notifications.map((notification: any) => {
                    notificationIds.push(notification.id)
                  })
                  try {
                    await laravelApi().post('/user/mark-three-as-notified', {
                      notificationIds
                    })
                  } catch (e) {
                    console.log('Problem Marking Notifications as read')
                  }
                  await NotifyMutate()
                }
              }}
            >
              <SvgIcon
                classNames="h-6 w-6"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </span>
          </Menu.Button>
          {data?.count > 0 && (
            <div className="bg-primary text-white text-xs font-bold rounded-full px-1.5 py-0.5 absolute z-10 top-0 left-1/2 mt-1">
              <span>{data?.count}</span>
            </div>
          )}
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 w-96 mt-5 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="px-1 py-1">
                <Menu.Item>{({ active }) => <FloatingNotification data={data} />}</Menu.Item>
              </div>
              {/* ... */}
            </Menu.Items>
          </Transition>
        </Menu>

        <div className="p-4 focus:outline-none focus:ring-1 focus:ring-primary">
          <button
            className="p-2 cursor-pointer rounded border-solid border-2 border-primary hover:bg-primaryAccent hover:text-white hover:border-0 active:bg-primaryAccent focus:outline-none focus:ring-0"
            disabled={startLoggingOut}
            onClick={async () => {
              setLoggingOut(true)
              toggleAuth(false)
              setVerifyData(null)
              setNewLoanFormValues(null)
              await logout()
              return router.push('/')
            }}
          >
            Log Out
          </button>
        </div>
      </div>
      <AnimatePresence>
        {showMainNav && (
          <motion.div
            initial={{ x: '-100vw' }}
            animate={{ x: 0 }}
            transition={{ type: 'tween', duration: 0.5 }}
            exit={{ x: '-100vw' }}
            className="lg:hidden bg-gray-200"
          >
            <div className="">
              <button className="px-4 py-1 border-b-2 border-gray-300 w-full font-semibold text-right">
                Welcome, {userData?.name}
              </button>
              {userData.role !== 'admin' && (
                <button className="px-4 py-1 border-b-2 border-gray-300 w-full font-semibold text-right">
                  Balance: Tk. {balanceData ? parseFloat(balanceData.balance).toFixed(2) : (0).toFixed(2)}
                </button>
              )}
              {userData.role === 'borrower' && (
                <button className="px-4 py-1 border-b-2 border-gray-300 w-full font-semibold text-right">
                  Balance: Tk. {dueData ? parseFloat(dueData?.amount).toFixed(2) : (0).toFixed(2)}
                </button>
              )}
              <button
                onClick={() => router.push('/notifications')}
                className="px-4 py-1 border-b-2 border-gray-300 w-full font-semibold text-right"
              >
                {data?.count} New Notifications
              </button>
              <button
                onClick={async () => {
                  setLoggingOut(true)
                  toggleAuth(false)
                  setVerifyData(null)
                  setNewLoanFormValues(null)
                  await logout()
                  return router.push('/')
                }}
                className="px-4 py-1 border-b-2 border-gray-300 w-full font-bold text-right text-primary"
              >
                Log Out
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default DashboardNav
