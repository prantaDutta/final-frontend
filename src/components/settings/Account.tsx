import Link from 'next/link'
import React, { useState } from 'react'
import { useRecoilState } from 'recoil'
import { accountExpand } from '../../states/settingsStates'
import FullWidthReactLoader from '../shared/FullWidthReactLoader'
import SaveCancelButton from './SaveCancelButton'
import SettingsName from './SettingsName'

interface AccountProps {
  data: any
  mutate: (data?: any, shouldRevalidate?: boolean) => Promise<any>
}

const Account: React.FC<AccountProps> = ({ data, mutate }) => {
  const [expand] = useRecoilState(accountExpand)
  const [showCloseAccountField, setCloseAccountField] = useState<boolean>(false)
  const [password, setPassword] = useState<string>('')
  return (
    <>
      <SettingsName
        expand={expand}
        current="account"
        title={`Account Details`}
        svgD="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
      />
      {expand ? (
        data ? (
          <>
            <div className="mt-5 px-8 md:px-12 py-4 rounded-xl border-2 border-gray-500">
              {showCloseAccountField ? (
                <div className="">
                  <p className="text-sm md:text-lg font-semibold md:font-bold block w-full bg-transparent mt-5">
                    Close Account
                  </p>
                  <p className="text-base font-semibold mt-2">
                    Please Read Our
                    <Link href="https://google.com">
                      <span className="text-blue cursor-pointer font-bold"> Guidelines</span>
                    </Link>{' '}
                    on What happens to your account if you close it
                  </p>
                  <label className="text-sm md:text-lg font-semibold md:font-bold block w-full bg-transparent mt-2">
                    Your Password
                  </label>
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white font-semibold pl-5 my-2 rounded-lg py-2 border-b border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Enter Your Password"
                  />
                  <SaveCancelButton
                    setField={setCloseAccountField}
                    submitUrl={`/user/account/close`}
                    postData={{
                      password
                    }}
                    mutate={mutate}
                    toastMsg="Password Changed Successfully"
                  />
                </div>
              ) : (
                <div className="flex justify-between items-center">
                  <div>
                    <button className="text-sm md:text-lg font-semibold md:font-bold">Account Status</button>
                    <button className="ml-5 text-sm md:text-lg font-semibold md:font-bold text-gray-600 capitalize">
                      {data.user.verified}
                    </button>
                  </div>

                  <div className={`flex items-center`}>
                    <button
                      onClick={() => setCloseAccountField(true)}
                      className="rounded-lg font-semibold md:font-bold px-4 md:px-8 py-1.5 uppercase tracking-wide bg-primary text-white"
                    >
                      Close Account
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <FullWidthReactLoader />
        )
      ) : null}
    </>
  )
}

export default Account
