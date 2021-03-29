import React from "react";
import ReactLoader from "./ReactLoader";

interface FlexibleSelectButtonProps {
  isValidating?: boolean;
  selectValue: string;
  setSelectValue: React.Dispatch<React.SetStateAction<any>>;
  selectArray: {}[];
}

const FlexibleSelectButton: React.FC<FlexibleSelectButtonProps> = ({
  isValidating = false,
  selectArray,
  selectValue,
  setSelectValue,
}) => {
  return (
    <button
      className="bg-primary p-3 w-1/4 rounded-full tracking-wide bg-transparent
                  font-semibold font-display focus:outline-none focus:shadow-outline focus:ring-1 focus:ring-transparent hover:bg-primaryAccent
                  shadow-lg transition-css"
    >
      {isValidating ? (
        <ReactLoader />
      ) : (
        <div className="flex justify-center">
          <select
            value={selectValue}
            className="bg-transparent w-full font-semibold text-white capitalize focus:outline-none focus:shadow-outline focus:ring-1 focus:ring-transparent"
            onChange={(e) => setSelectValue(e.target.value as any)}
          >
            {selectArray.map((values: any) => {
              return (
                <option
                  className="bg-transparent font-semibold text-gray-600 w-full"
                  value={values.value}
                  key={values.value}
                >
                  {values.title}
                </option>
              );
            })}
          </select>
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 9l4-4 4 4m0 6l-4 4-4-4"
            />
          </svg>
        </div>
      )}
    </button>
  );
};

export default FlexibleSelectButton;
