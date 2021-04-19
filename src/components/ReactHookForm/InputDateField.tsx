import React, { InputHTMLAttributes } from "react";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import { Control, Controller } from "react-hook-form";

type InputDateFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string | undefined | null;
  control: Control;
  name: string;
  halfWidth?: boolean;
  defaultValue:
    | string
    | Date
    | (string & Date)
    | (number & Date)
    | (readonly string[] & string)
    | (readonly string[] & Date);
};

const InputDateField: React.FC<InputDateFieldProps> = ({
  error,
  label,
  control,
  name,
  halfWidth,
  defaultValue,
}) => {
  return (
    <div className={`mt-6 px-4 ${halfWidth ? "md:w-1/2" : "w-full"}`}>
      <label className="text-md font-bold text-gray-700 tracking-wide">
        {label}
      </label>
      <div className="customDatePickerWidth">
        <Controller
          render={({ value, onChange }) => (
            <DayPickerInput
              value={value}
              onDayChange={(selectedDay) => onChange(selectedDay)}
              classNames={{
                container: `w-full text-md text-gray-500 font-semibold py-2 border-b focus:outline-none ${
                  error
                    ? "border-red-600 focus:border-red-600"
                    : "border-gray-300 focus:border-indigo-500"
                }`,
                overlayWrapper: "absolute bg-white",
                overlay: "",
              }}
            />
          )}
          name={name}
          control={control}
          defaultValue={defaultValue}
        />
      </div>

      <p className="text-red-600 pt-2 font-semibold text-sm italic">
        {error ? error : " "}
      </p>
    </div>
  );
};

export default InputDateField;
