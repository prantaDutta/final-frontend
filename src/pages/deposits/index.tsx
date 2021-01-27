import { NextPageContext } from "next";
import { withIronSession } from "next-iron-session";
import React from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { LARAVEL_URL, NEXT_IRON_SESSION_CONFIG } from "../../utils/constants";
import { redirectToLogin } from "../../utils/functions";
import { ModifiedUserData } from "../../utils/randomTypes";
import DashboardTitle from "../../components/shared/DashboardTitle";

interface dashboardProps {
  user: ModifiedUserData;
}

// export interface DepositFormValues {
//   name: string;
//   email: string;
//   phone: number;
//   address: string;
//   amount: number;
// }

const dashboard: React.FC<dashboardProps> = ({ user }) => {
  const onClick = async (/* values: DepositFormValues */) => {
    try {
      window.location.replace(`${LARAVEL_URL}/api/user/deposit`);
    } catch (e) {
      console.log(e.response);
    }
  };
  return (
    <DashboardLayout data={user}>
      <div className="flex justify-between">
        <DashboardTitle title="Deposit Money" />
        <button
          onClick={onClick}
          className="bg-primary text-white p-3 w-1/3 rounded-full tracking-wide
                  font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-primaryAccent
                  shadow-lg transition-css"
        >
          Deposit Money
        </button>
      </div>
    </DashboardLayout>
  );
};

export const getServerSideProps = withIronSession(
  async (context: NextPageContext) => {
    const user = (context.req as any).session.get("user");
    if (!user) {
      redirectToLogin(context?.req, context?.res);
      return { props: {} };
    }

    return {
      props: { user },
    };
  },
  NEXT_IRON_SESSION_CONFIG
);

export default dashboard;
