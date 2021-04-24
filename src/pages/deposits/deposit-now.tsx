import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { trigger } from "swr";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import InputTextField from "../../components/ReactHookForm/InputTextField";
import DashboardTitle from "../../components/shared/DashboardTitle";
import SubmitButton from "../../components/shared/SubmitButton";
import useLocalStorage from "../../hooks/useLocalStorage";
import Yup from "../../lib/yup";
import { laravelApi } from "../../utils/api";
import { LARAVEL_URL } from "../../utils/constants";
import { ModifiedUserData } from "../../utils/randomTypes";
import { notify } from "../../utils/toasts";
import withAuth from "../../utils/withAuth";

interface DepositNowProps {
  user: ModifiedUserData;
}

type DepositNowValues = {
  amount: number;
  maximumDistributedAmount: number;
};

const DepositNow: React.FC<DepositNowProps> = ({ user }) => {
  const router = useRouter();
  // setting up localstorage
  const [lastDepositedAmount, setLastDepositedAmount] = useLocalStorage<
    number | string | null
  >("lastDepositedAmount", null);
  const [
    lastMaximumDistributedAmount,
    setLastMaximumDistributedAmount,
  ] = useLocalStorage<number | string | null>(
    "lastMaximumDistributedAmount",
    null
  );
  // const [, setUserData] = useRecoilState(authenticatedUserData);
  const [submitting, setSubmitting] = useState<boolean>(false);

  const {
    register,
    watch,
    handleSubmit,
    errors,
    setValue,
  } = useForm<DepositNowValues>({
    mode: "onChange",
    resolver: yupResolver(
      Yup.object({
        amount: Yup.number()
          .typeError("Amount must be a number")
          .min(999.99, "Minimum Deposit Amount is 1,000tk")
          .max(50000, "Maximum Amount is 50,000tk")
          .required("Required"),
        maximumDistributedAmount: Yup.number()
          .typeError("Maximum Distributed Amount must be a number")
          .min(500, "Sorry, Maximum Distributed Amount must be over 500tk")
          .max(
            Yup.ref("amount") as any,
            `Sorry, Amount Exceeds Deposited Amount`
          )
          .test(
            "divisor-of-500",
            "Amount Must be a multiplier of 500",
            function (value) {
              if (value && value >= 500) return value % 500 == 0;
              return false;
            }
          )
          .required("Required"),
      })
    ),
  });

  // This function opens a popup for user to deposit money
  const openPopUp = async () => {
    setSubmitting(true);
    try {
      const winObj = window.open(
        `${LARAVEL_URL}/api/user/deposit?amount=${watchAmount}`,
        "Deposit Money",
        "width=800,height=800,status=0,toolbar=0"
      );
      const loop = setInterval(async function () {
        if (winObj?.closed) {
          clearInterval(loop);
          // const {
          //   data: { user },
          // } = await laravelApi().get("/user");
          // console.log("returned data: ", user);
          // setUserData(user);
          // await axios.post("/api/set-login-cookie", { data: user });
          await trigger("/user/balance");
          await trigger("/user/get-all-deposits");
          return router.push("/deposits");
        }
      }, 1000);
    } catch (e) {
      console.log(e.response);
    }
    setSubmitting(false);
  };

  // This function executes after user presses the submit button
  const onSubmit = async (values: DepositNowValues) => {
    const maximumDistributedAmount = values.maximumDistributedAmount;
    setLastDepositedAmount(values.amount);
    setLastMaximumDistributedAmount(maximumDistributedAmount);
    console.log("values: ", values);

    try {
      await laravelApi().post("/user/save-loan-preferences", {
        maximumDistributedAmount,
      });
    } catch (e) {
      notify("Please Select At least One Distributed Amount", {
        type: "error",
        toastId: "distributed-amount",
      });
    }
    return openPopUp();
  };
  let watchAmount = watch("amount");
  let temp: number;

  useEffect(() => {
    if (watchAmount && lastMaximumDistributedAmount !== watchAmount) {
      if (watchAmount >= 1000) {
        temp = watchAmount / 2;
      } else if (watchAmount <= 500) {
        temp = 500;
      }
      setValue("maximumDistributedAmount", temp);
    }
  }, [watchAmount]);

  return (
    <DashboardLayout data={user} title={`Deposit Now`}>
      <DashboardTitle title="Deposit Now" />
      <main className="bg-white w-full mx-auto p-4 md:p-8 my-5 rounded-lg shadow-2xl">
        <section>
          <h3 className="font-bold text-2xl">Deposit And Start Earning</h3>
        </section>
        {user.verified === "verified" ? (
          <form className="mt-10" onSubmit={handleSubmit(onSubmit)}>
            <div className="px-4">
              <InputTextField
                name="amount"
                label="Deposit Amount"
                defaultValue={
                  lastDepositedAmount ? lastDepositedAmount : undefined
                }
                error={errors.amount?.message}
                placeholder="Enter a amount between 1,000-50,000 tk"
                register={register}
              />
            </div>
            <div className="px-4">
              <InputTextField
                name="maximumDistributedAmount"
                label="Maximum Distributed Amount"
                defaultValue={
                  lastMaximumDistributedAmount
                    ? lastMaximumDistributedAmount
                    : undefined
                }
                error={errors.maximumDistributedAmount?.message}
                placeholder="Enter the Maximum Distributed Amount"
                register={register}
              />
            </div>

            <SubmitButton submitting={submitting} title="Deposit" />
          </form>
        ) : (
          <div className="mt-6">
            <p className="text-xl font-semibold">
              Sorry, Please Verify Your Account First.
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
                onClick={() => router.push("/verify")}
              >
                Verify
              </button>
            </div>
          </div>
        )}
      </main>
    </DashboardLayout>
  );
};

export const getServerSideProps = withAuth(async (context) => {
  const { user } = context;
  return { props: { user } };
});

export default DepositNow;
