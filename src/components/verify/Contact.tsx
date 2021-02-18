import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue } from "recoil";
import useSWR from "swr";
import * as yup from "yup";
import { object } from "yup";
import { authenticatedUserData } from "../../states/userStates";
import {
  verificationFormValues,
  verificationStep,
} from "../../states/verificationStates";
import { laravelApi } from "../../utils/api";
import { isProduction } from "../../utils/constants";
import { ContactVerificationFormValues } from "../../utils/randomTypes";
import { notify } from "../../utils/toasts";
import InputMobileNoField from "../ReactHookForm/InputMobileNoField";
import InputTextField from "../ReactHookForm/InputTextField";
import SaveCancelButton from "../settings/SaveCancelButton";
import ReactLoader from "../shared/ReactLoader";
import NextPreviousButton from "./NextPreviousButton";

interface ContactProps {}

const Contact: React.FC<ContactProps> = ({}) => {
  const [verificationValues, setValues] = useRecoilState(
    verificationFormValues
  );
  const userData = useRecoilValue(authenticatedUserData);
  const [step, setStep] = useRecoilState(verificationStep);
  const {
    watch,
    register,
    handleSubmit,
    errors,
    trigger, // this will trigger when mobile No is not Valid
    clearErrors, // this is for clearing errors before submitting the mobile No
  } = useForm<ContactVerificationFormValues>({
    resolver: yupResolver(
      object({
        email: yup
          .string()
          .email("Invalid email")
          .test(
            "Unique Email",
            "Email already been taken",
            async function (value) {
              try {
                await laravelApi().post("/user/unique-email-excluding-id", {
                  email: value,
                  id: userData?.id,
                });
                return true;
              } catch (e) {
                return false;
              }
            }
          )
          .test("Email Verified", "Email Not Verified", async function () {
            try {
              const { data } = await laravelApi().get("/user/contact-verified");
              return !!data?.email;
            } catch (e) {
              return false;
            }
          })
          .required("Required"),
        mobileNo: yup
          .number()
          .typeError("Mobile No. must be a number")
          .test(
            "len",
            "Mobile No must be 11 characters",
            (val) => val?.toString().length === 10
          )
          .test(
            "Mobile No Verified",
            "Mobile No. Not Verified",
            async function () {
              try {
                const { data } = await laravelApi().get(
                  "/user/contact-verified"
                );
                return !!data?.mobileNo;
              } catch (e) {
                return false;
              }
            }
          )
          .required("Required"),
      })
    ),
    mode: "onSubmit",
    reValidateMode: "onBlur",
  });
  // const watchEmail = watch("email");
  const onSubmit = async (values: ContactVerificationFormValues) => {
    // values.dateOfBirth = format(parseJSON(values.dateOfBirth), "MM/dd/yyyy");
    const { email, mobileNo } = values;
    // setValues({ ...verificationValues ? , email, address, mobileNo });
    setValues({
      ...verificationValues!,
      email,
      mobileNo,
    });
    setStep(step + 1);
  };
  const [emailSending, setEmailSending] = useState<boolean>(false);
  const [smsSending, setSMSSending] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);
  useEffect(() => setMounted(true), []);
  const { data: contactData, mutate } = useSWR(
    mounted ? "/user/contact-verified" : null
  );
  if (!isProduction) console.log("contactData: ", contactData);

  // showing or not showing email otp or mobile otp input fields
  const [showEmailOtp, setEmailOtp] = useState<boolean>(false);
  const [showMobileOtp, setMobileOtp] = useState<boolean>(false);

  // saving email and mobile otp to a new state to send to the backend
  const [emailOtpValue, setEmailOtpValue] = useState("");
  const [mobileOtpValue, setMobileOtpValue] = useState("");

  const watchMobileNo = watch("mobileNo");
  const watchEmail = watch("email");
  return (
    <div className="pb-3 px-2 md:px-0 mt-10">
      <main className="bg-white max-w-full mx-auto p-4 md:p-8 my-5 rounded-lg shadow-2xl">
        <section>
          <h3 className="font-bold text-2xl">Contact Information</h3>
        </section>
        <form className="mt-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-end px-4">
            <InputTextField
              halfWidth
              defaultValue={
                verificationValues?.email
                  ? verificationValues?.email
                  : userData
                  ? userData.email
                  : ""
              }
              name="email"
              label="Your Email"
              error={errors.email?.message}
              placeholder="youremail@email.com"
              register={register}
            />
            <button
              className={`px-2 py-1 rounded-full bg-primary
                      text-xs text-gray-200 font-semibold capitalize mb-2 cursor-not-allowed`}
            >
              {contactData?.email ? "verified" : "unverified"}
            </button>

            <div className="flex">
              <button
                type="button"
                className="px-2 mx-4 py-1 rounded-full bg-primaryAccent text-xs text-gray-200 font-semibold capitalize mb-2 focus:outline-none focus:ring-primaryAccent focus:ring-2"
                onClick={() => setEmailOtp(true)}
              >
                Enter Otp
              </button>
              <button
                type="button"
                onClick={async () => {
                  setEmailSending(true);
                  // setEmailOtp(true);
                  await laravelApi().post(`/send-verify-email`, {
                    email: watchEmail,
                  });
                  notify("Email Sent. Check Your Inbox", {
                    type: "success",
                  });
                  setEmailSending(false);
                }}
                className="px-2 mx-4 py-1 rounded-full bg-primaryAccent text-xs text-gray-200 font-semibold capitalize mb-2 focus:outline-none focus:ring-primaryAccent focus:ring-2"
              >
                {emailSending ? <ReactLoader /> : "Resend Email"}
              </button>
            </div>
          </div>
          {showEmailOtp && (
            <div className="max-w-md px-8 pt-4">
              <label className="text-md font-bold text-gray-700 tracking-wide">
                Enter OTP From Your Email
              </label>
              <input
                placeholder="Enter OTP"
                className="w-full bg-white font-semibold pl-5 my-2 rounded-lg py-2 border-b border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                onChange={(e) => setEmailOtpValue(e.target.value)}
              />
              {/* Cancel Editing & Submitting the Data */}
              <SaveCancelButton
                setField={setEmailOtp}
                submitUrl={`/user/verify-email-otp`}
                postData={{
                  otp: emailOtpValue,
                  email: watchEmail,
                }}
                toastMsg="Your Email is Successfully Verified"
                mutate={mutate}
              />
            </div>
          )}
          <div className={`flex items-end px-4`}>
            <InputMobileNoField
              defaultValue={verificationValues?.mobileNo}
              name="mobileNo"
              halfWidth
              label="Your Mobile No."
              error={errors.mobileNo?.message}
              register={register}
              placeholder="i.e. 17XXXXXXXX"
            />
            <button
              className={`px-2 py-1 rounded-full bg-primary
                      text-xs text-gray-200 font-semibold capitalize mb-2 cursor-not-allowed`}
            >
              {mounted && contactData?.mobileNo ? "verified" : "unverified"}
            </button>

            <button
              onClick={async () => {
                setSMSSending(true);
                await trigger("mobileNo");
                if (
                  !errors.mobileNo ||
                  errors.mobileNo.message === "Mobile No. Not Verified"
                ) {
                  clearErrors("mobileNo");
                  try {
                    await laravelApi().post(`/user/send-mobile-otp`, {
                      mobileNo: watchMobileNo,
                    });
                    notify("You Will receive an OTP in a minute", {
                      type: "success",
                    });
                  } catch (e) {
                    notify("Otp Invalid Or Expired", {
                      type: "error",
                    });
                  }
                  setMobileOtp(true);
                }
                setSMSSending(false);
              }}
              type="button"
              className="px-2 mx-4 py-1 rounded-full bg-primaryAccent text-xs text-gray-200 font-semibold capitalize mb-2 focus:outline-none focus:ring-primaryAccent focus:ring-2"
            >
              {smsSending ? <ReactLoader /> : "Send OTP"}
            </button>
          </div>
          {showMobileOtp && (
            <div className="max-w-md px-8 pt-4">
              <label className="text-md font-bold text-gray-700 tracking-wide">
                Enter OTP From Your Mobile
              </label>
              <input
                className="w-full bg-white font-semibold pl-5 my-2 rounded-lg py-2 border-b border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                onChange={(e) => setMobileOtpValue(e.target.value)}
              />
              {/* Cancel Editing & Submitting the Data */}
              <SaveCancelButton
                setField={setMobileOtp}
                submitUrl={`/user/verify-mobile-no`}
                postData={{
                  otp: mobileOtpValue,
                  mobileNo: watchMobileNo,
                }}
                toastMsg="Your Mobile No. is Successfully Verified"
                mutate={mutate}
              />
            </div>
          )}

          <NextPreviousButton nextDisabled={!errors} />
        </form>
      </main>
    </div>
  );
};

export default Contact;
