import { useRouter } from 'next/router'
import React from 'react'
import SvgIcon from './SvgIcon'

interface DashboardTitleProps {
  title: string
  backButton?: boolean
}

const DashboardTitle: React.FC<DashboardTitleProps> = ({ title, backButton = true }) => {
  const router = useRouter()
  return (
    <div className="flex items-center">
      {backButton && (
        <button
          onClick={() => router.back()}
          className="flex items-center px-1 md:px-4 py-0.5 md:py-2 bg-primaryAccent text-white rounded-md md:rounded-xl mr-2 md:mr-4 focus:ring-0 focus:outline-none"
        >
          <SvgIcon classNames="h-4 w-4 md:h-6 md:w-6" d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z" />
          <p className="hidden md:block mx-2">Back</p>
        </button>
      )}
      <h1 className="text-xl md:text-3xl font-semibold md:font-bold">{title}</h1>
    </div>
  )
}

export default DashboardTitle
