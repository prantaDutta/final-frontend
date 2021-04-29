import React from "react";

interface DashboardBubbleProps {
  title: string;
  shorterTitle: string;
}

const DashboardBubble: React.FC<DashboardBubbleProps> = ({
  title,
  shorterTitle,
}) => {
  return (
    <div className="h-28 p-4 mr-4 bg-primary text-gray-100 rounded-3xl text-left cursor-pointer hover:bg-gray-200 hover:text-primary transition-css">
      <div className="pl-2">
        <h4 className="text-lg md:text-lg font-semibold sm:py-1">{title}</h4>
        <p className="text-sm md:text-lg font-medium md:font-semibold sm:py-1">
          {shorterTitle}
        </p>
      </div>
    </div>
  );
};

export default DashboardBubble;
