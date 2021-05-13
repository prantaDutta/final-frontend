import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { authStatus } from '../../states/authStates'
import { newLoanFormValues } from '../../states/newLoanState'
import { authenticatedUserData } from '../../states/userStates'
import { verificationFormValues } from '../../states/verificationStates'
import { logout } from '../../utils/auth'
import { linkArray } from '../../utils/randomTypes'

export const links: linkArray[] = [
  { href: '/', label: 'Home' },
  // { href: "/about", label: "About" },
  { href: '/contact', label: 'Contact' },
  { href: '/faq', label: 'FAQ' },
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/#', label: 'Log Out' },
  { href: '/login', label: 'Log In' },
  { href: '/register', label: 'Register' },
]

// d attribute value of hamburger menu and cross sign
const menu = ['M4 6h16M4 12h16M4 18h16', 'M6 18L18 6M6 6l12 12']

export interface NavItemsProps {
  links: linkArray[]
}

export default function Nav() {
  const router = useRouter()
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false)
  const [auth, toggleAuth] = useRecoilState(authStatus)
  const userData = useRecoilValue(authenticatedUserData)
  const [, setVerifyData] = useRecoilState(verificationFormValues)
  const [, setNewLoanFormValues] = useRecoilState(newLoanFormValues)

  // rendering each nav items
  const NavItems: React.FC<NavItemsProps> = ({ links }) => {
    return (
      <>
        {links.map((link, index) => {
          // not rendering item 5 & 6 when authenticated
          if (auth && (index === 5 || index === 6)) return null
          // not rendering item 3 & 4 when not authenticated
          else if (!auth && (index === 3 || index === 4)) return null
          else if (link.label === 'Dashboard') {
            if (userData?.role === 'admin') link.href = '/admin/dashboard'
            return (
              <Link href={link.href} key={link.label}>
                <a
                  key={link.label}
                  className={`text-gray-600 block font-semibold md:text-lg text-base px-2 py-1 hover:text-primary hover:border-primary border-b-2 border-transparent ${
                    index === 0 ? '' : 'mt-1 md:mt-0 md:ml-2'
                  } transition-css`}
                >
                  {link.label}
                </a>
              </Link>
            )
          } else if (link.label === 'Log Out')
            return (
              <Link href={link.href} key={link.label}>
                <a
                  key={link.label}
                  onClick={async () => {
                    toggleAuth(false)
                    setVerifyData(null)
                    setNewLoanFormValues(null)
                    try {
                      await logout()
                    } catch (e) {
                      console.log('Problem Logging out from nav')
                    }
                    return router.push('/')
                  }}
                  className={`text-gray-600 block font-semibold md:text-lg text-base px-2 py-1 hover:text-primary hover:border-primary border-b-2 border-transparent ${
                    index === 0 ? '' : 'mt-1 md:mt-0 md:ml-2'
                  } transition-css`}
                >
                  {link.label}
                </a>
              </Link>
            )
          else
            return (
              <Link href={link.href} key={link.label}>
                <a
                  key={link.label}
                  className={`text-gray-600 block font-semibold md:text-lg text-base px-2 py-1 hover:text-primary hover:border-primary border-b-2 border-transparent ${
                    index === 0 ? '' : 'mt-1 md:mt-0 md:ml-2'
                  } transition-css`}
                >
                  {link.label}
                </a>
              </Link>
            )
        })}
      </>
    )
  }

  return (
    <div className="font-bold md:flex md:justify-between md:items-center md:px-4 md:py-3 md:mt-1">
      <div className="flex items-center justify-between px-4 py-3 md:p-0">
        <div className="tracking-widest md:text-lg text-base font-semibold uppercase md:ml-10 ">
          <Link href={`/`}>
            <span className="text-transparent bg-gradient-to-l bg-clip-text from-gray-300 via-gray-800 to-gray-300 cursor-pointer">
              GrayScale
            </span>
          </Link>
        </div>
        <div className="md:hidden">
          <button
            type="button"
            onClick={() => setIsDrawerOpen(!isDrawerOpen)}
            className={`md:hidden block text-gray-600 hover:text-gray-900 focus:text-gray-900 focus:outline-none`}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={`${isDrawerOpen ? `${menu[1]}` : `${menu[0]}`}`}
              ></path>
            </svg>
          </button>
        </div>
      </div>

      <div
        className={`${
          isDrawerOpen ? 'block' : 'hidden'
        } px-2 pt-2 pb-4 uppercase md:flex md:p-0 lg:mr-8 md:ml-5`}
      >
        {/* Rendering every nav items from links array */}
        <NavItems links={links} />
      </div>
    </div>
  )
}
