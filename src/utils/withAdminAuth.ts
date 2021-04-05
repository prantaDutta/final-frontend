import { NextPageContext } from "next";
import { Handler } from "next-iron-session";
import withSession from "../lib/session";
import { ModifiedUserData } from "./randomTypes";

function _withAdminAuth(handler: any) {
  return async (context: NextPageContext) => {
    const { req } = context;
    const user: ModifiedUserData = (req as any).session.get("user");
    if (!user || user.role !== "admin") {
      return {
        redirect: {
          permanent: false,
          destination: "/login",
        },
        props: {},
      };
    }

    const newCtx = {
      ...context,
      user,
    };

    return handler(newCtx);
  };
}

export default function withAdminAuth(handler: Handler) {
  return withSession(_withAdminAuth(handler));
}
