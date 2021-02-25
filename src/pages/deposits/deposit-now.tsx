import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { withIronSession } from "next-iron-session";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { trigger } from "swr";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import InputTextField from "../../components/ReactHookForm/InputTextField";
import DashboardTitle from "../../components/shared/DashboardTitle";
import SubmitButton from "../../components/shared/SubmitButton";
import useLocalStorage from "../../hooks/useLocalStorage";
import Yup from "../../lib/yup";
import { authenticatedUserData } from "../../states/userStates";
import { laravelApi } from "../../utils/api";
import {
  isProduction,
  LARAVEL_URL,
  NEXT_IRON_SESSION_CONFIG,
} from "../../utils/constants";
import { redirectToPage, removeDuplicatesArray } from "../../utils/functions";
import { ModifiedUserData } from "../../utils/randomTypes";
import { notify } from "../../utils/toasts";

interface DepositNowProps {
  user: ModifiedUserData;
}

type singleDistributed = {
  value: number;
  selected: boolean;
};

type DepositNowValues = {
  amount: number;
};

const DepositNow: React.FC<DepositNowProps> = ({ user }) => {
  const router = useRouter();
  // This is to re render the component
  const [reRender, setReRender] = useState(false);
  useEffect(() => {}, [reRender]);
  // setting up localstorage
  const [distributedLenderArray, setDistributedLenderArray] = useLocalStorage<
    singleDistributed[]
  >("distributedLenderArray", []);

  const [lastDepositedAmount, setLastDepositedAmount] = useLocalStorage<
    number | string | null
  >("lastDepositedAmount", null);
  const [, setUserData] = useRecoilState(authenticatedUserData);
  const [submitting, setSubmitting] = useState<boolean>(false);
  // This array will save the selected array
  const [distributedArray, setDistributedArray] = useState<singleDistributed[]>(
    distributedLenderArray ? distributedLenderArray : []
  );

  // this array will map the checkboxes
  // this will also merge with distributedLenderArray from localstorage
  const [tempDistributedArray, setTempDistributedArray] = useState<
    singleDistributed[]
  >(distributedLenderArray ? distributedLenderArray : []);

  const { register, watch, handleSubmit, errors } = useForm<DepositNowValues>({
    mode: "onBlur",
    resolver: yupResolver(
      Yup.object({
        amount: Yup.number()
          .typeError("Amount must be a number")
          .min(999.99, "Minimum Loan Amount is 1,000tk")
          .max(50000, "Maximum Amount is 50.000tk.")
          .required("Required"),
      })
    ),
  });

  // This function opens a popup for user to deposit money
  const openPopUp = async () => {
    setSubmitting(true);
    try {
      var winObj = window.open(
        `${LARAVEL_URL}/api/user/deposit?amount=${watchAmount}`,
        "Deposit Money",
        "width=800,height=800,status=0,toolbar=0"
      );
      var loop = setInterval(async function () {
        if (winObj?.closed) {
          clearInterval(loop);
          const {
            data: { user },
          } = await laravelApi().get("/user");
          console.log("returned data: ", user);
          setUserData(user);
          await axios.post("/api/set-user-cookie", { data: user });
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
    if (distributedArray.length > 0) {
      console.log("tempDistributedArray", tempDistributedArray);
      // Saving last deposited amount to the localstorage
      setLastDepositedAmount(values.amount);
      console.log("distributedLenderArray", distributedLenderArray);
      // this final array will be saved to the database
      let finalArray: number[] = [];
      distributedLenderArray.forEach((arr: singleDistributed) => {
        if (arr.selected) {
          finalArray.push(arr.value);
        }
      });
      if (!isProduction) console.log("final array: ", finalArray);
      if (finalArray.length > 0) {
        await laravelApi().post("/user/save-loan-preferences", {
          distributedArray: finalArray,
        });
        return openPopUp();
      }
    }
    notify("Please Select Atleast One Distributed Amount", {
      type: "error",
      toastId: "distributed-amount",
    });
  };
  let watchAmount = watch("amount");

  useEffect(() => {
    if (watchAmount > 500) {
      // maximum distributed amount is 5000
      if (watchAmount > 5000) watchAmount = 5000;
      let newArray: singleDistributed[] = [];
      for (let i = 1; i <= watchAmount / 500; i++) {
        newArray.push({
          value: i * 500,
          selected: false,
        });
      }
      // merging this array with the one in the localstorage
      const mergedArray = removeDuplicatesArray([
        ...distributedLenderArray,
        ...newArray,
      ]);
      // saving merged array to temp array to loop through it
      setTempDistributedArray(mergedArray);
    }
  }, [watchAmount]);

  return (
    <DashboardLayout data={user}>
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
                defaultValue={lastDepositedAmount ? lastDepositedAmount : 1000}
                error={errors.amount?.message}
                placeholder="Enter a amount between 1,000-50,000 tk"
                register={register}
              />
            </div>
            {watchAmount >= 500 && (
              <div className="px-8 w-full mt-6">
                <label className="text-md font-bold text-gray-700 tracking-wide">
                  Select Distributed Amount
                </label>
                <div className="flex flex-wrap items-center justify-start">
                  {tempDistributedArray.map((arr: any, i: number) => {
                    return (
                      <div
                        className="flex items-center gap-4 my-2 px-4"
                        key={i}
                      >
                        <input
                          name={`distributedArray[${i}]`}
                          value={arr.selected}
                          // checked={arr.selected}
                          className={`bg-transparent text-md text-gray-500 font-semibold py-2 border-b focus:outline-none border-red-600 focus:border-red-600"`}
                          type="checkbox"
                          ref={register}
                          defaultChecked={distributedLenderArray[i].selected}
                          // this onChange function sucks
                          // First we get the checked value
                          // then re-rendered the component to get the latest value
                          // then changed the distributed array
                          // then changed the lenderDistributedArray in the localstorage
                          onChange={(e) => {
                            tempDistributedArray[i].selected =
                              e.currentTarget.checked;
                            setReRender(!reRender);
                            setDistributedArray([
                              ...distributedArray,
                              tempDistributedArray[i],
                            ]);
                            setDistributedLenderArray([
                              ...distributedArray,
                              tempDistributedArray[i],
                            ]);
                          }}
                        />
                        <p className="font-semibold">{arr.value}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

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

export const getServerSideProps = withIronSession(async ({ req, res }) => {
  const user = req.session.get("user");
  if (!user) {
    await redirectToPage(req, res, "/login");
    return { props: {} };
  }

  return {
    props: { user },
  };
}, NEXT_IRON_SESSION_CONFIG);

export default DepositNow;
