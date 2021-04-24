import React from "react";
import ReactLoader from "./ReactLoader";
import SvgIcon from "./SvgIcon";

interface FlexibleSelectButtonProps {
  isValidating?: boolean;
  selectValue: string | number;
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
      className="bg-primary my-3 md:my-0 px-1 md:px-3 py1.5 md:py-2 md:w-1/3 rounded-lg tracking-wide bg-transparent
                  font-semibold font-display focus:outline-none focus:shadow-outline focus:ring-1 focus:ring-transparent hover:bg-primaryAccent
                  shadow-lg transition-css"
    >
      {isValidating ? (
        <ReactLoader />
      ) : (
        <div className="flex justify-center">
          <select
            value={selectValue}
            className="bg-transparent w-full text-sm md:text-base md:font-semibold text-white capitalize focus:outline-none focus:shadow-outline focus:ring-1 focus:ring-transparent"
            onChange={(e) => setSelectValue(e.target.value as any)}
          >
            {selectArray.map((values: any) => {
              return (
                <option
                  className="bg-transparent text-sm md:text-base md:font-semibold text-left text-gray-600 w-full"
                  value={values.value}
                  key={values.value}
                >
                  {values.title}
                </option>
              );
            })}
          </select>
          <SvgIcon
            classNames="w-6 h-6 text-white"
            d="M8 9l4-4 4 4m0 6l-4 4-4-4"
          />
        </div>
      )}
    </button>
  );
};

export default FlexibleSelectButton;
