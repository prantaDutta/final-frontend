import React from "react";

interface svgIconsProps {
  svgD: string;
  label: string;
}

export const lenderIcons: svgIconsProps[] = [
  {
    svgD: "M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z",
    label: "Personal",
  },
  {
    svgD:
      "M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z",
    label: "Contact",
  },
  {
    svgD:
      "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4",
    label: "Confirm",
  },
];

export const borrowerIcons: svgIconsProps[] = [
  {
    svgD: "M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z",
    label: "Personal",
  },
  {
    svgD:
      "M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z",
    label: "Contact",
  },
  {
    svgD:
      "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
    label: "Papers",
  },
  {
    svgD:
      "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4",
    label: "Confirm",
  },
];

interface stepperIconsProps {
  item: svgIconsProps;
  index: number;
  isDone?: boolean;
  len: number;
}

const StepperIcons: React.FC<stepperIconsProps> = ({
  item,
  index,
  isDone,
  len,
}) => {
  return (
    <>
      <div className="flex items-center text-white relative">
        <div className="rounded-full flex justify-center items-center transition duration-500 ease-in-out h-12 w-12 py-3 border-2 border-primary">
          {isDone ? (
            <svg
              className="w-6 h-6 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={item.svgD}
              />
            </svg>
          )}
        </div>
        <div className="absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase text-primary">
          {item.label}
        </div>
      </div>
      {index !== len - 1 ? (
        <div className="flex-auto border-t-2 transition duration-500 ease-in-out border-primary" />
      ) : null}
    </>
  );
};

export default StepperIcons;
