import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { useRecoilState } from 'recoil'
import { openSidebar } from '../../states/dashboardStates'
import { adminSidebarLinks, sideBarLinks } from '../../utils/constantsArray'
import SvgIcon from '../shared/SvgIcon'
interface SidebarProps {
  role?: string
}

const Sidebar: React.FC<SidebarProps> = ({ role }) => {
  const router = useRouter()
  let links = sideBarLinks
  if (role === 'admin') {
    links = adminSidebarLinks
  }
  const [openSidebarValue, setSidebarValue] = useRecoilState(openSidebar)
  return (
    <div
      className={`md:block md:col-span-1 bg-gray-100 text-gray-600 min-h-full absolute md:relative top-0 left-0 ${
        openSidebarValue ? 'block z-30' : 'hidden'
      }`}
    >
      <div className="hidden md:block cursor-pointer py-3" onClick={() => router.push('/')}>
        <Image
          src={`/new-logo.png`}
          alt="Icon"
          width="231"
          height="100"
          layout="responsive"
          className="object-contain"
        />
      </div>
      <div className="flex-col uppercase">
        {links.map((link) => {
          return (
            <div
              className={`p-3 font-semibold text-base my-4 cursor-pointer border-l-4 border-solid hover:bg-primary hover:border-blue-400 hover:text-gray-100 ${
                router.pathname.includes(link.href) ? 'bg-primary border-blue-400 text-gray-100' : 'border-transparent'
              } transition duration-500 ease-in-out`}
              key={link.label}
            >
              <Link href={link.href} key={link.label}>
                <div onClick={() => setSidebarValue(false)} className="flex items-center">
                  <SvgIcon classNames="w-5 h-5 inline-block mx-3" d={link.svgD} />
                  <span>{link.label}</span>
                </div>
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Sidebar
