import React, { InputHTMLAttributes, useState } from "react";
import { RefReturn } from "../../utils/randomTypes";

type InputPasswordFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  component?: string;
  error?: string | undefined | null;
  register?: () => RefReturn;
  halfWidth?: boolean;
};

const InputPasswordField: React.FC<InputPasswordFieldProps> = ({
  error,
  label,
  halfWidth,
  register,
  ...props
}) => {
  const [eye, toggleEye] = useState<boolean>(false);
  return (
    <div className={`mt-6 px-4 ${halfWidth ? "w-1/2" : "w-full"}`}>
      {/*  h-24 add this class to reduce page shifting */}
      <label className="text-md font-bold text-gray-700 tracking-wide">
        {label}
      </label>

      <div className="flex">
        <input
          type={!eye ? "password" : "text"}
          className={`w-full bg-transparent text-md text-gray-500 font-semibold py-2 border-b focus:outline-none ${
            error
              ? "border-red-600 focus:border-red-600"
              : "border-gray-300 focus:border-indigo-500"
          }`}
          {...props}
          ref={register}
        />
        <button
          type="button"
          className="focus:outline-none focus:ring-0"
          onClick={() => toggleEye(!eye)}
        >
          {eye ? (
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          ) : (
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
              />
            </svg>
          )}
        </button>
      </div>

      <p className="text-red pt-2 font-semibold text-sm italic">
        {error ? error : " "}
      </p>
    </div>
  );
};

export default InputPasswordField;
