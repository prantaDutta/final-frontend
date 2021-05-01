import { ThreeDots } from "@agney/react-loading";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import useSWR, { mutate } from "swr";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import InputSelectField from "../../components/ReactHookForm/InputSelectField";
import InputTextField from "../../components/ReactHookForm/InputTextField";
import DashboardTitle from "../../components/shared/DashboardTitle";
import ReactLoader from "../../components/shared/ReactLoader";
import VerifyAccountFirst from "../../components/shared/VerifyAccountFirst";
import Yup from "../../lib/yup";
import { newLoanFormValues } from "../../states/newLoanState";
import { laravelApi } from "../../utils/api";
import { calculateSimpleInterest } from "../../utils/calculatingInterests";
import { isProduction } from "../../utils/constants";
import { numberTypes } from "../../utils/constantsArray";
import { formatTwoDecimalPlaces } from "../../utils/functions";
import { ModifiedUserData } from "../../utils/randomTypes";
import { notify } from "../../utils/toasts";
import withAuth from "../../utils/withAuth";
import FetchError from "../../components/shared/FetchError";

interface newLoanProps {
  user: ModifiedUserData;
}

export interface NewLoanFormValues {
  amount: number;
  interestRate: number;
  loanDuration: number;
  monthlyInstallment: number;
}

const NewLoan: React.FC<newLoanProps> = ({ user }) => {
  const router = useRouter();
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [complete, setComplete] = useState<boolean>(false);
  const [newFormState, setFormState] = useRecoilState(newLoanFormValues);
  const { register, handleSubmit, errors, watch } = useForm<NewLoanFormValues>({
    resolver: yupResolver(
      Yup.object({
        amount: Yup.number()
          .typeError("Amount must be a number")
          .min(999.99, "Minimum Loan Amount is 1000tk")
          .required("Required"),
        interestRate: Yup.mixed().notRequired(),
        loanDuration: Yup.number()
          .typeError("Loan Duration must be a number")
          .min(1, "Minimum Loan Duration is 1 Months")
          .max(18, "Maximum Loan Duration is 18 Months")
          .required("Required"),
        monthlyInstallment: Yup.number()
          .typeError("Loan Duration must be a number")
          .test(
            "checking monthly installment",
            "Something is Wrong",
            (value) =>
              value == modifiedMonthlyInstallment ||
              value == newFormState?.monthlyInstallment
          )
          .required("Required"),
      })
    ),
    mode: "onTouched",
    reValidateMode: "onChange",
  });
  const submitHandler = (values: NewLoanFormValues) => {
    // setFormValues(values);
    let modifiedInstallment = formatTwoDecimalPlaces(
      calculateSimpleInterest(+amount, +interestRate + 2, +loanDuration)
    );
    setFormState({
      ...values,
      modifiedMonthlyInstallment: +modifiedInstallment,
    });
    setComplete(true);
  };

  let modifiedMonthlyInstallment = 0;
  let amount = watch("amount");
  let interestRate = watch("interestRate");
  let loanDuration = watch("loanDuration");

  if (amount && loanDuration) {
    modifiedMonthlyInstallment = formatTwoDecimalPlaces(
      // calculateMonthlyInstallment(amount, interestRate, loanDuration)
      calculateSimpleInterest(+amount, +interestRate, +loanDuration)
    );
  }

  // Getting the default interest rate
  const [mounted, setMounted] = useState<boolean>(false);
  useEffect(() => setMounted(true), []);
  const { data , error} = useSWR(mounted ? `/user/get-default-interest-rate` : null);
  if (mounted && error || user.role !== 'borrower') {
    return <FetchError user={user}/>
  }
  return (
    <DashboardLayout data={user} title={`Apply For A New Loan`}>
      <DashboardTitle title="Apply For A New Loan" />

      {user.verified === "verified" ? (
        complete ? (
          <div className="px-4">
            <p className="text-2xl font-bold pl-5 mt-8">
              Thank You for Submitting.
            </p>
            <div className="p-5">
              <p className="text-xl font-bold mt-5">
                Loan Amount: {newFormState?.amount} Tk.
              </p>
              <p className="text-xl font-bold mt-5">
                Interest Rate: {newFormState?.interestRate}%
              </p>
              <p className="text-xl font-bold mt-5">
                Loan Duration: {newFormState?.loanDuration} Months
              </p>
              <p className="text-xl font-bold mt-5">
                Company Fees (2%){": "}
                {newFormState?.amount! * 0.02} Tk
              </p>

              <p className="text-xl font-bold mt-5">
                Monthly Installment With Fees:{" "}
                {formatTwoDecimalPlaces(
                  calculateSimpleInterest(
                    +newFormState?.amount!,
                    +newFormState?.interestRate! + 2,
                    +newFormState?.loanDuration!
                  )
                )}{" "}
                Tk.
              </p>
              <div className="mt-5">
                <button
                  onClick={() => setComplete(false)}
                  className="bg-primary text-white p-3 mr-3 w-1/4 rounded-full tracking-wide
                  font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-primaryAccent
                  shadow-lg transition-css"
                >
                  Take Me Back
                </button>
                <button
                  onClick={async () => {
                    // console.log(newFormState);
                    setSubmitting(true);
                    if (!isProduction)
                      console.log("Sending Values: ", newFormState);
                    try {
                      await laravelApi().post("/user/new-loan", {
                        values: newFormState,
                        id: user.id,
                      });
                      if (data) setFormState(null);
                      setSubmitting(false);
                      await mutate("/user/loans");
                      notify("Your Loan Request is Accepted", {
                        type: "success",
                      });
                      return router.push("/loans");
                    } catch (e) {
                      setSubmitting(false);
                      notify(
                        e?.response?.data?.error || "Something Went Wrong",
                        {
                          type: "error",
                        }
                      );
                    }
                  }}
                  className="bg-primary text-white p-3 w-1/4 rounded-full tracking-wide
                  font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-primaryAccent
                  shadow-lg transition-css"
                >
                  {submitting ? (
                    <ReactLoader component={<ThreeDots width="50" />} />
                  ) : (
                    "Proceed"
                  )}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <main className="bg-white w-full mx-auto p-4 md:p-8 mt-5 rounded-lg shadow-2xl">
            <p className="pt-2 pl-8 text-xl font-semibold">
              Enter the following Data
            </p>
            <form onSubmit={handleSubmit(submitHandler)}>
              <div className="flex px-4">
                <InputTextField
                  name="amount"
                  halfWidth
                  label="Your Loan Amount (1000-50000tk)"
                  defaultValue={newFormState ? newFormState.amount : undefined}
                  error={errors.amount?.message}
                  placeholder="Enter Amount (Min. 1000)"
                  register={register}
                />

                <InputTextField
                  name="interestRate"
                  halfWidth
                  value={data ? data.interestRate : 7}
                  label="Your Desired Interest Rate (in %)"
                  error={errors.interestRate?.message}
                  readOnly
                  register={register}
                />
              </div>
              <div className="flex px-4">
                <InputSelectField
                  halfWidth
                  name="loanDuration"
                  label="Loan Duration (In Months)"
                  defaultValue={
                    newFormState ? newFormState.loanDuration : undefined
                  }
                  error={errors.loanDuration?.message}
                  register={register}
                  options={numberTypes(1, 18)}
                />

                <InputTextField
                  halfWidth
                  name="monthlyInstallment"
                  label="Monthly Installment Rate"
                  error={errors.monthlyInstallment?.message}
                  register={register}
                  value={
                    modifiedMonthlyInstallment
                      ? modifiedMonthlyInstallment
                      : newFormState?.monthlyInstallment || ""
                  }
                  placeholder="This Field is not editable"
                  readOnly
                />
              </div>

              <button
                type="submit"
                className="mt-5 bg-primary tracking-widest uppercase text-gray-100 p-3 w-full rounded-full
                                font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-primaryAccent
                                shadow-lg transition-css"
              >
                Submit
              </button>
            </form>
          </main>
        )
      ) : (
        <VerifyAccountFirst />
      )}
    </DashboardLayout>
  );
};

export const getServerSideProps = withAuth(async (context) => {
  const { user } = context;
  return { props: { user } };
});

export default NewLoan;
