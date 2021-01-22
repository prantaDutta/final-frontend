import React, { InputHTMLAttributes } from "react";
import { RefReturn, SelectOptionsTypes } from "../../utils/randomTypes";

type InputSelectFieldProps = InputHTMLAttributes<HTMLSelectElement> & {
  label: string;
  component?: string;
  error: string | undefined | null;
  options: SelectOptionsTypes[];
  halfWidth?: boolean;
  register: () => RefReturn;
};

const InputSelectField: React.FC<InputSelectFieldProps> = ({
  error,
  label,
  register,
  halfWidth,
  options,
  ...props
}) => {
  return (
    <div className={`mt-6 px-4 ${halfWidth ? "w-1/2" : "w-full"}`}>
      <label className="text-md font-bold text-gray-700 tracking-wide">
        {label}
      </label>
      <select
        className={`w-full text-md text-gray-500 font-semibold py-2 border-b focus:outline-none ${
          error
            ? "border-red-600 focus:border-red-600"
            : "border-gray-300 focus:border-indigo-500"
        }`}
        {...props}
        ref={register}
      >
        <option value="Default">Choose One...</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.title}
          </option>
        ))}
      </select>

      <p className="text-red pt-2 font-semibold text-sm italic">
        {error ? error : " "}
      </p>
    </div>
  );
};

export default InputSelectField;
