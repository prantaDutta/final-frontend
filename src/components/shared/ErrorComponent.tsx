import { useRouter } from 'next/router'
import React from 'react'

interface ErrorComponentProps {
  code: number
  errorMsg: string
  description: string
}

const ErrorComponent: React.FC<ErrorComponentProps> = ({ code, errorMsg, description }) => {
  const router = useRouter()
  return (
    <div className="bg-gray-200 h-8vh">
      <div className="w-9/12 m-auto py-2 sm:py-8 md:py-16 flex items-center justify-center">
        <div className="shadow overflow-hidden sm:rounded-lg pb-4 md:pb-8">
          <div className="border-t border-gray-200 text-center pt-4 md:pt-8">
            <h1 className="text-7xl md:text-9xl font-bold text-primary">
              <span className={`bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500`}>
                {code}
              </span>
            </h1>
            <h1 className="text-4xl md:text-6xl font-semibold py-4 md:py-8">{errorMsg}</h1>
            <p className="text-sm md:text-2xl pb-8 px-6 md:px-12 font-semibold">{description}</p>
            <button
              onClick={() => router.push('/')}
              className="text-white font-semibold px-6 py-3 rounded-md mr-6 bg-gradient-to-r from-primary to-primaryAccent hover:from-green-400 hover:to-blue-500 focus:outline-none"
            >
              Go HOME
            </button>
            <button
              onClick={() => router.reload()}
              className="text-white font-semibold px-6 py-3 rounded-md bg-gradient-to-r from-red-400 to-red-500 hover:from-purple-400 hover:via-pink-500 hover:to-red-500"
            >
              Reload
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ErrorComponent
