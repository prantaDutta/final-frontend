import { NextPageContext } from "next";
import { applySession } from "next-iron-session";
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { authenticatedUserData } from "../../states/userStates";
import { NEXT_IRON_SESSION_CONFIG } from "../../utils/constants";
import { redirectToPage } from "../../utils/functions";

export default function WithAuth(Component: React.FC<any>) {
  const AuthComponent = (props: any) => {
    const [, setUserData] = useRecoilState(authenticatedUserData);
    useEffect(() => setUserData(props.props.user), []);
    return <Component {...props} />;
  };

  AuthComponent.getInitialProps = async (context: NextPageContext) => {
    await applySession(context?.req, context?.res, NEXT_IRON_SESSION_CONFIG);
    const user = (context.req as any).session.get("user");
    if (!user) {
      redirectToPage(context?.req, context?.res, "/login");
      return { props: {} };
    }
    return {
      props: { user },
    };
  };

  return AuthComponent;
}
