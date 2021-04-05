import React, { useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { authStatus } from "../../states/authStates";
import { authenticatedUserData } from "../../states/userStates";
import { ModifiedUserData } from "../../utils/randomTypes";
import Footer from ".././shared/footer";
import Nav from ".././shared/nav";

interface LayoutProps {
  data?: ModifiedUserData;
}

const Layout: React.FC<LayoutProps> = ({ children, data }) => {
  const [userData, setUserData] = useRecoilState(authenticatedUserData);
  const setAuth = useSetRecoilState(authStatus);

  useEffect(() => {
    if (data) {
      setAuth(true);
      setUserData(data);
    } else {
      setAuth(false);
      setUserData(null);
    }
  }, [userData]);

  return (
    <div className="flex flex-col min-h-screen">
      <Nav />
      <div className="flex-grow">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
