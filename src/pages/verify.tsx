import { NextPageContext } from "next";
import { withIronSession } from "next-iron-session";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import DashboardLayout from "../components/layouts/DashboardLayout";
import Contact from "../components/verify/Contact";
import Images from "../components/verify/Images";
import Papers from "../components/verify/Papers";
import Personal from "../components/verify/Personal";
import StepperIcons, {
  borrowerIcons,
  lenderIcons,
} from "../components/verify/StepperIcons";
import { authenticatedUserData } from "../states/userStates";
import { verificationStep } from "../states/verificationStates";
import { NEXT_IRON_SESSION_CONFIG } from "../utils/constants";
import { redirectToLogin } from "../utils/functions";
import { ModifiedUserData } from "../utils/randomTypes";

interface showVerifyComponentProps {
  step: number;
  role: string;
}

const ShowVerifyComponent: React.FC<showVerifyComponentProps> = ({
  step,
  role,
}) => {
  switch (step) {
    case 0:
      return <Personal />;
    case 1:
      return <Contact />;
    case 2:
      return role === "lender" ? <Images /> : <Papers />;
    case 3:
      return <Images />;
    default:
      return <></>;
  }
};

interface verifyProps {
  user: ModifiedUserData;
}

const Verify: React.FC<verifyProps> = ({ user }) => {
  const router = useRouter();
  const [step] = useRecoilState(verificationStep);
  const [userData, changeUserData] = useRecoilState(authenticatedUserData);
  const { role, verified } = user;
  const icons = role === "lender" ? lenderIcons : borrowerIcons;
  useEffect(() => changeUserData(user), [userData]);
  return (
    <DashboardLayout data={user}>
      <div className="p-5">
        <p className=" font-medium md:font-2xl text-xl md:text-4xl text-center">
          Account Verification
        </p>
        {verified !== "no" ? (
          <div className="mt-6">
            <p className="text-xl font-semibold">
              {verified === "yes"
                ? "Your Account is already Verified"
                : "Your Account Verification is Pending"}
            </p>
            <div className="flex">
              <button
                className="my-6 mr-6 btn bg-primary text-white p-3 w-1/4 block"
                onClick={() => router.push("/dashboard")}
              >
                Go to Dashboard
              </button>
              <button
                className="m-6 btn bg-primary text-white p-3 w-1/4 block"
                onClick={() => router.back()}
              >
                Go Back
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-center mb-4 p-4">
              {icons.map((item, index) => (
                <StepperIcons
                  key={index}
                  index={index}
                  item={item}
                  len={icons.length}
                  isDone={step > index}
                />
              ))}
            </div>
            <ShowVerifyComponent role={role} step={step} />
          </>
        )}
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

export default Verify;
