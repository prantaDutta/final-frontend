import ReactLoader from "./ReactLoader";
import React from "react";

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
      className="bg-primary p-3 w-1/4 rounded-full tracking-wide
                  font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-primaryAccent
                  shadow-lg transition-css"
    >
      {isValidating ? (
        <ReactLoader />
      ) : (
        <select
          value={selectValue}
          className="bg-transparent font-semibold text-white"
          onChange={(e) => setSelectValue(e.target.value as any)}
        >
          {selectArray.map((values: any) => {
            return (
              <option
                className="bg-transparent font-semibold text-gray-600"
                value={values.value}
                key={values.value}
              >
                {values.title}
              </option>
            );
          })}
          {/*<option*/}
          {/*  className="bg-transparent font-semibold text-gray-600"*/}
          {/*  value="all"*/}
          {/*>*/}
          {/*  All*/}
          {/*</option>*/}
          {/*<option*/}
          {/*  className="bg-transparent font-semibold text-gray-600"*/}
          {/*  value="deposit"*/}
          {/*>*/}
          {/*  Deposits*/}
          {/*</option>*/}
          {/*<option*/}
          {/*  className="bg-transparent font-semibold text-gray-600"*/}
          {/*  selected*/}
          {/*  value="withdraw"*/}
          {/*>*/}
          {/*  Withdraw*/}
          {/*</option>*/}
        </select>
      )}
    </button>
  );
};

export default FlexibleSelectButton;
