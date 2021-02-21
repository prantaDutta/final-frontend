import { yupResolver } from "@hookform/resolvers/yup";
import { withIronSession } from "next-iron-session";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { object } from "yup";
import Layout from "../components/layouts/Layout";
import InputMobileNoField from "../components/ReactHookForm/InputMobileNoField";
import InputTextField from "../components/ReactHookForm/InputTextField";
import ReactLoader from "../components/shared/ReactLoader";
import yup from "../lib/yup";
import { laravelApi } from "../utils/api";
import { isProduction, NEXT_IRON_SESSION_CONFIG } from "../utils/constants";
import { redirectToPage } from "../utils/functions";
import { ModifiedUserData } from "../utils/randomTypes";
import { notify } from "../utils/toasts";

interface VerifyMobileNoProps {
  user: ModifiedUserData;
}

type VerifyMobileNoValues = {
  mobileNo: number;
  otp: number;
};

const VerifyMobileNo: React.FC<VerifyMobileNoProps> = ({ user }) => {
  const router = useRouter();
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [showOtpForm, setOtpForm] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    errors,
    watch,
    trigger,
  } = useForm<VerifyMobileNoValues>({
    resolver: yupResolver(
      object({
        mobileNo: showOtpForm
          ? yup.mixed().notRequired()
          : yup
              .number()
              .typeError("Mobile No. must be a number")
              .test(
                "len",
                "Mobile No must be 11 characters",
                (val) => val?.toString().length === 10
              )
              .required("Required"),
        otp: yup
          .number()
          .typeError("Mobile No. must be a number")
          .test(
            "len",
            "OTP must be 6 characters",
            (val) => val?.toString().length === 6
          )
          .required("Required"),
      })
    ),
  });
  const onSubmit = async (values: VerifyMobileNoValues) => {
    setSubmitting(true);
    try {
      const { data } = await laravelApi().post("/user/verify-mobile-no", {
        otp: values.otp,
      });
      if (!isProduction) console.log("data", data);
      notify(`Your Mobile No Successfully Verified`, {
        type: "success",
      });
      await router.push("/dashboard");
    } catch (e) {
      console.log(e.response);
      notify(`Something Went Wrong, Try Again`, {
        type: "error",
      });
    }
    setSubmitting(false);
  };
  console.log("errors: ", errors);
  const watchMobileNo = watch("mobileNo");
  return (
    <Layout data={user}>
      <div className="flex h-8vh">
        <div className="m-auto">
          <div className="bg-white max-w-lg mx-auto p-4 md:p-8 my-5 rounded-lg shadow-2xl">
            <h3 className="font-bold text-3xl py-4 text-primary">
              <Link href="/">Grayscale</Link>
            </h3>
            <p className="font-semibold text-lg text-red-700">
              Please Verify Your Mobile Number
            </p>
            <form onSubmit={handleSubmit(onSubmit)}>
              {showOtpForm ? (
                <>
                  <InputTextField
                    name="otp"
                    label="Enter OTP"
                    error={errors.otp?.message}
                    placeholder="Enter Otp here"
                    register={register}
                  />
                  <button
                    type="submit"
                    className="bg-primary text-gray-100 p-3 my-4 w-full rounded-full tracking-wide
                                font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-primaryAccent
                                shadow-lg transition-css"
                  >
                    {submitting ? <ReactLoader /> : "Verify"}
                  </button>
                </>
              ) : (
                <>
                  <InputMobileNoField
                    name="mobileNo"
                    label="Your Mobile No."
                    type="number"
                    error={errors.mobileNo?.message}
                    register={register}
                    placeholder="i.e. 17XXXXXXXX"
                  />
                  <button
                    type="button"
                    onClick={async () => {
                      trigger("mobileNo");
                      console.log(errors?.mobileNo?.message);
                      if (!errors?.mobileNo) {
                        console.log("mobileNo: ", watchMobileNo);
                        setSubmitting(true);
                        const { data } = await laravelApi().post(
                          "/user/send-mobile-otp",
                          {
                            mobileNo: watchMobileNo,
                          }
                        );
                        console.log("data: ", data);
                        setSubmitting(false);
                        setOtpForm(true);
                      }
                    }}
                    className="bg-primary text-gray-100 p-3 my-4 w-full rounded-full tracking-wide
                                font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-primaryAccent
                                shadow-lg transition-css"
                  >
                    {submitting ? <ReactLoader /> : "Send OTP"}
                  </button>
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </Layout>
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

export default VerifyMobileNo;
