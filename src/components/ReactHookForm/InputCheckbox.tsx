import React, { InputHTMLAttributes } from 'react'
import { RefReturn } from '../../utils/randomTypes'

type InputCheckboxProps = InputHTMLAttributes<HTMLInputElement> & {
  component?: string
  error?: string | undefined | null
  register?: () => RefReturn
  halfWidth?: boolean
  checkboxValue: string | number
  showLabel?: boolean
  label?: string
}

const InputCheckbox: React.FC<InputCheckboxProps> = ({
  error,
  halfWidth,
  register,
  checkboxValue,
  label,
  showLabel = true,
  ...props
}) => {
  return (
    <div className={`mt-6 px-4 ${halfWidth ? 'w-1/2' : 'w-full'}`}>
      {/*  h-24 add this class to reduce page shifting */}
      {showLabel && <label className="text-md font-bold text-gray-700 tracking-wide">{label}</label>}

      <div className="flex items-center gap-4 my-1">
        <input
          className={`bg-transparent text-md text-gray-500 font-semibold py-2 border-b focus:outline-none ${
            error ? 'border-red-600 focus:border-red-600' : 'border-gray-300 focus:border-indigo-500'
          }`}
          {...props}
          type="checkbox"
          ref={register}
        />
        <p className="font-semibold">{checkboxValue}</p>
      </div>

      <p className="text-red-600 pt-2 font-semibold text-sm italic">{error ? error : ' '}</p>
    </div>
  )
}

export default InputCheckbox
