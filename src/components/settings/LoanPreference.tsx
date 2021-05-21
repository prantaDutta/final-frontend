import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRecoilState } from 'recoil'
import useSWR from 'swr'
import { loanPreferenceExpand } from '../../states/settingsStates'
import { SelectOptionsTypes } from '../../utils/randomTypes'
import InputSelectField from '../ReactHookForm/InputSelectField'
import SaveCancelButton from './SaveCancelButton'
import SettingsName from './SettingsName'

interface LoanPreferenceProps {}

type LoanPreferenceFormProps = {
  maximumDistributedAmount: string
}

const LoanPreference: React.FC<LoanPreferenceProps> = ({}) => {
  const [expand] = useRecoilState(loanPreferenceExpand)
  const [showPreferenceField, setPreferenceField] = useState(false)
  const { data, mutate } = useSWR(`/user/get-loan-preferences`)
  const { register, errors, watch } = useForm<LoanPreferenceFormProps>({})

  return (
    <>
      <SettingsName
        expand={expand}
        title={`Loan Preference`}
        current={`loanPreference`}
        svgD={`M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z`}
      />

      {expand && (
        <div className="mt-5 px-8 md:px-12 py-4 rounded-xl border-2 border-gray-500">
          <div className="py-2">
            {showPreferenceField ? (
              <form className="bg-white w-full mx-auto p-4 md:p-8 mt-5 rounded-lg shadow-2xl">
                <InputSelectField
                  name="maximumDistributedAmount"
                  defaultValue={data ? data.loanPreference.maximumDistributedAmount : ''}
                  label="Change Maximum Distributed Amount"
                  error={errors.maximumDistributedAmount?.message}
                  options={generatingMaximumDistributedAmounts()}
                  register={register}
                />

                <SaveCancelButton
                  setField={setPreferenceField}
                  submitUrl={`/user/save-loan-preferences`}
                  postData={{
                    maximumDistributedAmount: watch('maximumDistributedAmount')
                  }}
                  toastMsg={`Loan Preference Updated`}
                  mutate={mutate}
                />
              </form>
            ) : (
              <button onClick={() => setPreferenceField(!showPreferenceField)} className="edit-btn">
                Change Maximum Distributed Amount
              </button>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default LoanPreference

export const generatingMaximumDistributedAmounts = () => {
  let arr: SelectOptionsTypes[] = []
  let rand = 500
  for (let i = 0; i < 10; i++) {
    arr.push({
      value: rand,
      title: rand
    })
    rand += 500
  }
  return arr
}
