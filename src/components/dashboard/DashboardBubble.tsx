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
    <div className="p-4 mr-4 bg-primary text-gray-200 rounded-3xl text-left cursor-pointer hover:bg-gray-200 hover:text-primary">
      <div className="pl-2">
        <h4 className="text-2xl font-semibold py-1">{title}</h4>
        <p className="text-base font-medium py-1">{shorterTitle}</p>
      </div>
    </div>
  );
};

export default DashboardBubble;
