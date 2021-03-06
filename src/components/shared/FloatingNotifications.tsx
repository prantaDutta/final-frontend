import { useRouter } from 'next/router'
import React from 'react'
import SvgIcon from './SvgIcon'

interface FloatingNotificationsProps {
  data: any
}

const FloatingNotification: React.FC<FloatingNotificationsProps> = ({ data }) => {
  const router = useRouter()
  return (
    <div className={`rounded-lg shadow-xl`}>
      {data.notifications.length > 0 ? (
        data.notifications.map((notification: any, i: number) => {
          return (
            <div key={i} className={`py-1 ${notification.readAt ? 'bg-white' : 'bg-gray-100'}`}>
              <div className="flex justify-start items-center px-4 text-gray-800 text-sm font-bold">
                {notification.readAt ? (
                  <SvgIcon
                    classNames="w-6 h-6 inline mt-0.5 text-primary cursor-pointer"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                ) : (
                  <SvgIcon
                    classNames="w-6 h-6 inline mt-0.5 text-primary cursor-pointer"
                    d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                  />
                )}
                <div className="p-2 mr-2 flex-grow text-center">
                  <h4 key={i} className="whitespace-nowrap">
                    {notification.data.msg}
                  </h4>
                  <p className="text-primary">{notification.diffForHumans}</p>
                </div>
                <SvgIcon
                  classNames="w-6 h-6 inline mt-0.5 text-red-600 cursor-pointer"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </div>
              {i < data.notifications.length - 1 && <hr />}
              {i === data.notifications.length - 1 && (
                <p onClick={() => router.push('/settings/notifications')} className="edit-btn text-center m-2">
                  All Notifications
                </p>
              )}
            </div>
          )
        })
      ) : (
        <>
          <div className="flex justify-start items-center px-4 py-2 text-gray-800 text-sm font-bold">
            <SvgIcon classNames="w-6 h-6 inline mt-0.5 text-primary cursor-pointer" d="M5 13l4 4L19 7" />
            <div className="p-2 mr-2">
              <h4 className="whitespace-nowrap">No New Notifications</h4>
            </div>
            <SvgIcon classNames="w-6 h-6 inline mt-0.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </div>
          <p onClick={() => router.push('/settings/notifications')} className="edit-btn text-center m-2">
            All Notifications
          </p>
        </>
      )}
    </div>
  )
}

export default FloatingNotification
