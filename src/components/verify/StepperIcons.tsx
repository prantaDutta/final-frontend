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
      "M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76",
    label: "Address",
  },
  {
    svgD:
      "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z",
    label: "Images",
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
      "M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76",
    label: "Address",
  },
  {
    svgD:
      "M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13",
    label: "Papers",
  },
  {
    svgD:
      "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z",
    label: "Images",
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
      <div className="flex items-center text-white relative z-0">
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
        <div className="absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase text-primary font-bold">
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
