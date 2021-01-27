import { ThreeDots } from "@agney/react-loading";
import { useRecoilState, useRecoilValue } from "recoil";
import { authenticatedUserData } from "../../states/userStates";
import {
  verificationStep,
  verificationSubmitting,
} from "../../states/verificationStates";
import ReactLoader from "../shared/ReactLoader";

interface NextPreviousButtonProps {
  nextDisabled: boolean;
}

const NextPreviousButton: React.FC<NextPreviousButtonProps> = ({
  nextDisabled,
}) => {
  const [step, setStep] = useRecoilState(verificationStep);
  const submitting = useRecoilValue(verificationSubmitting);
  const userData = useRecoilValue(authenticatedUserData);
  const isLastStep = () => {
    if (userData?.role === "lender") return step === 2;
    else if (userData?.role === "borrower") return step === 3;
    return false;
  };
  return (
    <div
      className={`flex ${step > 0 ? "justify-between" : "justify-end"} mt-8`}
    >
      {step > 0 && (
        <button
          type="button"
          onClick={() => setStep(step - 1)}
          className="bg-primary text-gray-100 p-3 w-1/3 rounded-full tracking-wide
          font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-primaryAccent
          shadow-lg transition-css"
        >
          Previous
        </button>
      )}
      <button
        type="submit"
        disabled={nextDisabled}
        className="bg-primary text-gray-100 p-3 w-1/3 rounded-full tracking-wide
        font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-primaryAccent
        shadow-lg transition-css disabled:opacity-50"
      >
        {isLastStep() ? (
          submitting ? (
            <ReactLoader component={<ThreeDots width={50} />} />
          ) : (
            "Submit"
          )
        ) : (
          "Next"
        )}
      </button>
    </div>
  );
};

export default NextPreviousButton;
