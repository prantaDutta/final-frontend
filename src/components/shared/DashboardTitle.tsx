import React from "react";

interface DashboardTitleProps {
  title: string;
}

const DashboardTitle: React.FC<DashboardTitleProps> = ({ title }) => (
  <h1 className="text-3xl font-bold">{title}</h1>
);

export default DashboardTitle;
