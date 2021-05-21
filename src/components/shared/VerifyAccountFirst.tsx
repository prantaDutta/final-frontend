import React from 'react'
import { useRouter } from 'next/router'

const VerifyAccountFirst = ({}) => {
  const router = useRouter()
  return (
    <div className="mt-6">
      <p className="text-xl font-semibold">Sorry, Please Verify Your Account First.</p>

      <div className="flex">
        <button
          className="my-6 mr-6 btn bg-primary text-white p-3 w-1/4 block"
          onClick={() => router.push('/dashboard')}
        >
          Go to Dashboard
        </button>
        <button className="m-6 btn bg-primary text-white p-3 w-1/4 block" onClick={() => router.push('/verify')}>
          Verify
        </button>
      </div>
    </div>
  )
}

export default VerifyAccountFirst
