import React, { useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { ModifiedUserData } from "../../utils/randomTypes";
import DashboardTitle from "../../components/shared/DashboardTitle";
import { useForm } from "react-hook-form";
import InputTextField from "../../components/ReactHookForm/InputTextField";
import InputSelectField from "../../components/ReactHookForm/InputSelectField";
import { withdrawalMethodsTypes } from "../../utils/constantsArray";
import { withIronSession } from "next-iron-session";
import { NextPageContext } from "next";
import { redirectToLogin } from "../../utils/functions";
import { isProduction, NEXT_IRON_SESSION_CONFIG } from "../../utils/constants";
import { yupResolver } from "@hookform/resolvers/yup";
import Yup from "../../lib/yup";
import ReactLoader from "../../components/shared/ReactLoader";
import { laravelApi } from "../../utils/api";
import { trigger } from "swr";
import { useRouter } from "next/router";

interface withdrawProps {
  user: ModifiedUserData;
}

export type withdrawFormTypes = {
  amount: number;
  method: string;
  trxID: string;
  password: string;
};

export const withdrawalMethodsArray: [string, string, string, string] = [
  "bkash",
  "rocket",
  "ucash",
  "nogod",
];

const Withdraw: React.FC<withdrawProps> = ({ user }) => {
  const router = useRouter();
  const [isSubmitting, setSubmitting] = useState<boolean>();
  const { register, handleSubmit, errors } = useForm<withdrawFormTypes>({
    resolver: yupResolver(
      Yup.object({
        amount: Yup.number()
          .typeError("Amount must be a number")
          .min(999.99, "Minimum Withdrawal Amount is 1000tk")
          .test(
            "Insufficient Amount",
            "Oops, You don't have that much",
            (value) => value! <= user?.balance
          )
          .required("Required"),
        method: Yup.string()
          .oneOf(withdrawalMethodsArray, "Invalid Payment Method Type")
          .required("Required"),
        password: Yup.string()
          .min(6, "Password should be at least six characters")
          .required("Required"),
        trxID: Yup.string()
          .min(10, "TrxID should be at least ten characters")
          .max(30, "Password should be less than thirty letters")
          .required("Required"),
      })
    ),
  });
  const submitHandler = async (values: withdrawFormTypes) => {
    setSubmitting(true);
    const { data } = await laravelApi().post("/user/withdraw", {
      values,
      id: user?.id,
    });
    if (!isProduction) console.log("values", data);
    await trigger(`/user/get-all-withdrawals`);
    return router.push("/withdrawals");
  };
  return (
    <DashboardLayout data={user}>
      <DashboardTitle title="Withdraw Now" />
      {user?.verified !== "yes" ? (
        <main className="bg-white w-full mx-auto p-4 md:p-8 mt-5 rounded-lg shadow-2xl">
          <div className="mb-3 px-2 py-4 bg-gray-300 text-black rounded-lg">
            <p className="text-lg font-semibold">
              *** Withdrawal Amount will be transferred to your Verified Mobile
              Number.
            </p>
          </div>
          <p className="pt-2 text-xl font-semibold">Enter the following Data</p>
          <form onSubmit={handleSubmit(submitHandler)}>
            <InputTextField
              name="amount"
              label="Withdrawal Amount"
              error={errors.amount?.message}
              placeholder="Enter Amount (Min. 1000)"
              register={register}
            />

            <InputSelectField
              name="method"
              label="Select Withdrawal Method"
              error={errors.method?.message}
              options={withdrawalMethodsTypes()}
              register={register}
            />

            <InputTextField
              name="trxID"
              label="Transaction Number / TrxID"
              error={errors.trxID?.message}
              placeholder="Enter TrxID"
              register={register}
            />

            <InputTextField
              name="password"
              label="Your Password"
              error={errors.password?.message}
              placeholder="Enter Your Password"
              type="password"
              register={register}
            />

            <button
              type="submit"
              className="mt-5 bg-primary tracking-widest uppercase text-gray-100 p-3 w-full rounded-full tracking-wide
                                font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-primaryAccent
                                shadow-lg transition-css"
            >
              {isSubmitting ? <ReactLoader /> : "Withdraw"}
            </button>
          </form>
        </main>
      ) : (
        <div className="my-5">
          <p className="font-semibold font-2xl">
            Sorry, You need to verify your account to request withdrawals.
          </p>
        </div>
      )}
    </DashboardLayout>
  );
};

export const getServerSideProps = withIronSession(
  async (context: NextPageContext) => {
    const user = (context.req as any).session.get("user");
    if (!user) {
      await redirectToLogin(context?.req, context?.res);
      return { props: {} };
    }

    return {
      props: { user },
    };
  },
  NEXT_IRON_SESSION_CONFIG
);

export default Withdraw;
