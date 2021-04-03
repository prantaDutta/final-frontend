import { useRouter } from "next/router";
import React from "react";

interface DashboardTitleProps {
  title: string;
  backButton?: boolean;
}

const DashboardTitle: React.FC<DashboardTitleProps> = ({
  title,
  backButton = true,
}) => {
  const router = useRouter();
  return (
    <div className="flex items-center">
      {backButton && (
        <button
          onClick={() => router.back()}
          className="flex items-center px-4 py-2 bg-primaryAccent text-white rounded-xl mr-4 focus:ring-0 focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"
            />
          </svg>
          <p className="mx-2">Back</p>
        </button>
      )}
      <h1 className="text-3xl font-bold">{title}</h1>
    </div>
  );
};

export default DashboardTitle;
