import ReactLoader from "./ReactLoader";
import React, { ReactElement } from "react";

interface props {
  component?: ReactElement;
}

const FullWidthReactLoader: React.FC<props> = ({ component }) => {
  return (
    <button
      className="bg-primary text-black p-3 mt-5 w-full tracking-wide rounded-lg
                  font-semibold font-display shadow-lg"
    >
      <ReactLoader component={component} />
    </button>
  );
};

export default FullWidthReactLoader;
