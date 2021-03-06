import React, { useState } from 'react'
import { trigger } from 'swr'
import { laravelApi } from '../../utils/api'
import { notify } from '../../utils/toasts'
import FullWidthReactLoader from '../shared/FullWidthReactLoader'

interface SaveCancelButtonProps {
  setField: React.Dispatch<React.SetStateAction<boolean>>
  submitUrl: string
  postData: {}
  toastMsg: string
  mutate: (data?: any, shouldRevalidate?: boolean) => Promise<any>
  disabled?: boolean
}

const SaveCancelButton: React.FC<SaveCancelButtonProps> = ({
  setField,
  submitUrl,
  postData,
  toastMsg,
  mutate,
  disabled = false
}) => {
  const [isSubmitting, setSubmitting] = useState<boolean>(false)
  return isSubmitting ? (
    <FullWidthReactLoader />
  ) : (
    <div className="flex justify-between md:justify-end my-4">
      <button
        onClick={() => setField(false)}
        className="mx-2 bg-red-700 text-white w-1/3 md:w-1/5 py-2 rounded-lg font-semibold focus:ring-1 focus:outline-none focus:ring-primary"
      >
        Cancel
      </button>
      <button
        type="button"
        disabled={disabled}
        onClick={async () => {
          setSubmitting(true)
          try {
            await laravelApi().post(submitUrl, postData)
            await mutate()
            notify(toastMsg, {
              type: 'success'
            })
            setField(false)
          } catch (e) {
            console.log(e.response)
            notify("Something's Wrong, Please Try Again", {
              type: 'warning'
            })
          }
          setSubmitting(false)
          await trigger('/user')
          // await mutate("/user/contact-verified");
        }}
        className={`md:ml-2 bg-primary text-white w-1/3 md:w-1/5 rounded-lg font-semibold focus:ring-1 focus:outline-none focus:ring-primaryAccent disabled:opacity-50 ${
          disabled && 'cursor-not-allowed'
        }`}
      >
        Save
      </button>
    </div>
  )
}

export default SaveCancelButton
