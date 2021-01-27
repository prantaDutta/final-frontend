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
    }
  }, [userData]);

  return (
    <div>
      <Nav />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
