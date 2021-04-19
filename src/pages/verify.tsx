import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import DashboardLayout from "../components/layouts/DashboardLayout";
import Address from "../components/verify/Address";
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
import { ModifiedUserData } from "../utils/randomTypes";
import withAuth from "../utils/withAuth";

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
      return <Address />;
    case 3:
      return role === "lender" ? <Images /> : <Papers />;
    case 4:
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
      <div className="p-2 md:p-5">
        <p className=" font-medium md:font-2xl text-xl md:text-4xl text-center">
          Account Verification
        </p>
        {verified !== "unverified" ? (
          <div className="mt-6">
            <p className="text-xl font-semibold">
              {verified === "verified"
                ? "Your Account is already Verified"
                : "Your Account Verification is Pending"}
            </p>
            <div className="md:flex my-2">
              <button
                className="my-2 md:my-5 mr-5 px-4 py-2 rounded-lg bg-primary text-white"
                onClick={() => router.push("/dashboard")}
              >
                Go to Dashboard
              </button>
              <button
                className="my-2 md:my-5 mr-5 px-4 py-2 rounded-lg bg-primary text-white"
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

export const getServerSideProps = withAuth(async (context) => {
  const { user } = context;
  return { props: { user } };
});

export default Verify;
