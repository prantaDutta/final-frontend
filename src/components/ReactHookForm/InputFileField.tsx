import React, { InputHTMLAttributes } from "react";
import { Control, Controller } from "react-hook-form";

type InputFileFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  component?: string;
  name: string;
  error?: string | undefined | null;
  control: Control;
};

const InputFileField: React.FC<InputFileFieldProps> = ({
  error,
  label,
  control,
  name,
  ...props
}) => {
  return (
    <div className="mt-6 px-4">
      <label className="text-md font-bold text-gray-700 tracking-wide">
        {label}
      </label>
      <Controller
        render={({ onChange }) => (
          <input
            type="file"
            onChange={(e) => onChange(Array.from(e.target.files!))}
            className={`w-full text-md text-gray-500 font-semibold py-2 border-b focus:outline-none ${
              error
                ? "border-red-600 focus:border-red-600"
                : "border-gray-300 focus:border-indigo-500"
            }`}
            {...props}
          />
        )}
        name={name}
        control={control}
        defaultValue={""}
      />

      <p className="text-red pt-2 font-semibold text-sm italic">
        {error ? error : " "}
      </p>
    </div>
  );
};

export default InputFileField;
