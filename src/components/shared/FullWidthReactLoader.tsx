import ReactLoader from "./ReactLoader";
import React, { ReactElement } from "react";

interface props {
  component?: ReactElement;
}

const FullWidthReactLoader: React.FC<props> = ({ component }) => {
  return (
    <button
      className="bg-transparent text-primary p-3 w-full tracking-wide
                  font-semibold font-display focus:outline-none focus:shadow-outline
                  shadow-lg transition-css"
    >
      <ReactLoader component={component} />
    </button>
  );
};

export default FullWidthReactLoader;
