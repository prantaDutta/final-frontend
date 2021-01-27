import React, { useEffect } from "react";
import { NextPageContext } from "next";
import { applySession } from "next-iron-session";
import { redirectToLogin } from "../../utils/functions";
import { NEXT_IRON_SESSION_CONFIG } from "../../utils/constants";
import { useRecoilState } from "recoil";
import { authenticatedUserData } from "../../states/userStates";

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
      redirectToLogin(context?.req, context?.res);
      return { props: {} };
    }
    return {
      props: { user },
    };
  };

  return AuthComponent;
}
