import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useRecoilState } from 'recoil'
import { object } from 'yup'
import yup from '../../lib/yup'
import { verificationFormValues, verificationStep } from '../../states/verificationStates'
import { BorrowerTypes } from '../../utils/constantsArray'
import { PapersVerificationFormValues } from '../../utils/randomTypes'
import InputSelectField from '../ReactHookForm/InputSelectField'
import NextPreviousButton from './NextPreviousButton'

interface PapersProps {}

const Papers: React.FC<PapersProps> = ({}) => {
  const [verificationValues, setValues] = useRecoilState(verificationFormValues)
  const { register, handleSubmit, errors } = useForm<PapersVerificationFormValues>({
    resolver: yupResolver(
      object({
        borrowerType: yup.mixed().oneOf(['salaried', 'self'], 'You have to select a type').required('Required')
      })
    ),
    mode: 'onTouched',
    reValidateMode: 'onBlur'
  })
  const [step, setStep] = useRecoilState(verificationStep)

  const onSubmit = async (values: PapersVerificationFormValues) => {
    const { borrowerType } = values
    setValues({ ...verificationValues!, borrowerType })
    setStep(step + 1)
  }
  return (
    <div className="pb-3 px-2 md:px-0 mt-10">
      <main className="bg-white max-w-full mx-auto p-4 md:p-8 my-5 rounded-lg shadow-2xl">
        <section>
          <h3 className="font-bold text-2xl">Select Borrower Type</h3>
        </section>
        <form className="mt-5" onSubmit={handleSubmit(onSubmit)}>
          <InputSelectField
            defaultValue={verificationValues?.borrowerType}
            name="borrowerType"
            label="Select Borrower Type"
            error={errors.borrowerType?.message}
            register={register}
            options={BorrowerTypes}
          />
          <NextPreviousButton nextDisabled={errors ? false : true} />
        </form>
      </main>
    </div>
  )
}

export default Papers
