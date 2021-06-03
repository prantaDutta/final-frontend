import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRecoilState } from 'recoil'
import useSWR from 'swr'
import { borrowerLoanPreferenceExpand } from '../../states/settingsStates'
import InputSelectField from '../ReactHookForm/InputSelectField'
import SaveCancelButton from './SaveCancelButton'
import SettingsName from './SettingsName'

interface LoanPreferenceProps {}

type LoanPreferenceFormProps = {
  autoPayments: string
}

const LoanPreferenceForBorrower: React.FC<LoanPreferenceProps> = ({}) => {
  const [expand] = useRecoilState(borrowerLoanPreferenceExpand)
  const [showPreferenceField, setPreferenceField] = useState(false)
  const { data, mutate } = useSWR(`/user/get-loan-preferences`)
  const { register, errors, watch } = useForm<LoanPreferenceFormProps>()

  return (
    <>
      <SettingsName
        expand={expand}
        title={`Loan Preference`}
        current={`borrowerLoanPreference`}
        svgD={`M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z`}
      />

      {expand && (
        <div className="mt-5 px-8 md:px-12 py-4 rounded-xl border-2 border-gray-500">
          <div className="py-2">
            {showPreferenceField ? (
              <form className="bg-white w-full mx-auto p-4 md:p-8 mt-5 rounded-lg shadow-2xl">
                <InputSelectField
                  name="autoPayments"
                  defaultValue={data ? data.loanPreference.autoPayments : 'no'}
                  label="Auto Payments"
                  error={errors.autoPayments?.message}
                  options={[
                    {
                      title: 'Pay the due installments Automatically',
                      value: 'yes'
                    },
                    {
                      title: 'I will pay the installments manually',
                      value: 'no'
                    }
                  ]}
                  register={register}
                />

                <SaveCancelButton
                  setField={setPreferenceField}
                  submitUrl={`/user/save-loan-preferences`}
                  postData={{
                    autoPayments: watch('autoPayments')
                  }}
                  toastMsg={`Loan Preference Updated`}
                  mutate={mutate}
                />
              </form>
            ) : (
              <button onClick={() => setPreferenceField(!showPreferenceField)} className="edit-btn">
                Enable/ Disable Auto Payments
              </button>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default LoanPreferenceForBorrower
