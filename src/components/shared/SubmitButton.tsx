import React from "react";
import ReactLoader from "./ReactLoader";

interface SubmitButtonProps {
  submitting: boolean;
  title: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ submitting, title }) => {
  return (
    <div className="mt-6">
      <button
        className="bg-primary text-gray-100 p-3 w-full rounded-full tracking-wider
                                font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-primaryAccent
                                shadow-lg uppercase transition-css"
      >
        {submitting ? <ReactLoader /> : title}
      </button>
    </div>
  );
};

export default SubmitButton;
