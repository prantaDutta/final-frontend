import React from 'react'

interface SettingsTextFieldProps {
  label: string
  placeholder?: string
  setStateValue: React.Dispatch<React.SetStateAction<string>>
}

const SettingsTextField: React.FC<SettingsTextFieldProps> = ({ label, placeholder, setStateValue }) => {
  return (
    <>
      <label className="font-bold block w-full bg-transparent mt-2">{label}</label>
      <input
        placeholder={placeholder}
        className="w-full bg-white font-semibold pl-5 my-2 rounded-lg py-2 border-b border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
        onChange={(e) => setStateValue(e.target.value)}
      />
    </>
  )
}

export default SettingsTextField
