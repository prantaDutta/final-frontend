import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { authenticatedUserData } from "../../states/userStates";
import { ModifiedUserData } from "../../utils/randomTypes";
import MainContentNav from ".././dashboard/DashboardNav";
import Sidebar from ".././dashboard/Sidebar";

interface DashboardLayoutProps {
  data: ModifiedUserData;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  data,
  children,
}) => {
  const [, setUserData] = useRecoilState(authenticatedUserData);

  useEffect(() => setUserData(data), []);
  return (
    <div className="grid grid-cols-5 h-screen">
      <Sidebar role={data?.role} />
      <div className="col-span-4 bg-gray-300">
        <MainContentNav />
        <div className="grid grid-cols-3 gap-8 mx-16">
          <div className="col-start-1 col-span-4">
            <div className="text-gray-900 p-5">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
