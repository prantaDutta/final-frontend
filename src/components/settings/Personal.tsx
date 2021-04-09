import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import useSWR from "swr";
import { mutateCallback } from "swr/dist/types";
import { personalExpand } from "../../states/settingsStates";
import { laravelApi } from "../../utils/api";
import {
  createDivisionsTypes,
  createZilaTypes,
} from "../../utils/constantsArray";
import { notify } from "../../utils/toasts";
import FullWidthReactLoader from "../shared/FullWidthReactLoader";
import ReactLoader from "../shared/ReactLoader";
import SaveCancelButton from "./SaveCancelButton";
import SettingsName from "./SettingsName";

interface PersonalProps {
  data: any;
  mutate: (
    data?: Promise<any> | mutateCallback | any,
    shouldRevalidate?: boolean
  ) => Promise<any | undefined>;
}

const Personal: React.FC<PersonalProps> = ({ data, mutate }) => {
  // To Expand the Personal Details Tab
  const [expand] = useRecoilState(personalExpand);
  // Following States will get the value of
  const [getAddress, setAddressValue] = useState(
    data ? data.verification?.address : ""
  );
  const [getDivision, setDivisionValue] = useState(
    data ? data.verification?.division : ""
  );
  const [getZila, setZilaValue] = useState(data ? data.verification?.zila : "");
  const [getZipCode, setZipCode] = useState(
    data ? data.verification?.zipCode : ""
  );
  const [getMobileNo, setMobileNoValue] = useState(
    data ? data.user?.mobileNo : ""
  );
  const [getEmail, setEmailValue] = useState(data ? data.user.email : "");
  const [showAddressField, setAddressField] = useState<boolean>(false);
  const [showMobileField, setMobileField] = useState<boolean>(false);
  const [showEmailField, setEmailField] = useState<boolean>(false);

  const [showEmailOtpField, setEmailOtpField] = useState<boolean>(false);
  const [emailOtpValue, setEmailOtpValue] = useState<string>("");

  const [showMobileOtpField, setMobileOtpField] = useState<boolean>(false);
  const [mobileOtpValue, setMobileOtpValue] = useState<string>("");

  const [emailSending, setEmailSending] = useState<boolean>(false);
  const [smsSending, setSMSSending] = useState<boolean>(false);

  const [mounted, setMounted] = useState<boolean>(false);
  useEffect(() => setMounted(true), []);
  const { data: contactData } = useSWR(
    mounted ? "/user/contact-verified" : null
  );
  return (
    <>
      {/* This component Shows and toggles the dropdown of personal details */}
      <SettingsName
        expand={expand}
        title={`Personal Details`}
        current="personal"
        svgD={`M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z`}
      />
      {expand ? (
        data ? (
          <>
            <div className="mt-5 px-12 py-4 rounded-xl border-2 border-gray-500">
              <div className="py-2">
                <p className="text-lg font-bold">Name</p>
                <p className="text-sm font-semibold text-gray-600">
                  {data.user.name}
                </p>
              </div>

              <hr className="border-gray-600 my-2" />
              {/* When Address Edit Button is clicked */}
              {showAddressField ? (
                <div>
                  {/* This form takes all the address values */}
                  <label className="text-lg font-bold block w-full bg-transparent mt-2">
                    Address
                  </label>
                  <input
                    className="w-full bg-white font-semibold pl-5 my-2 rounded-lg py-2 border-b border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                    value={getAddress}
                    onChange={(e) => setAddressValue(e.target.value)}
                  />
                  <div className="flex justify-between">
                    <div className="w-1/4">
                      <label className="text-lg font-bold block w-full bg-transparent mt-2">
                        Division
                      </label>
                      <select
                        defaultValue={getDivision}
                        onChange={(e) => setDivisionValue(e.target.value)}
                        className="w-full bg-white font-semibold pl-5 my-2 rounded-lg py-2 border-b border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="">Choose One...</option>
                        {createDivisionsTypes().map((div) => (
                          <option value={div.value} key={div.value}>
                            {div.title}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="w-1/4">
                      <label className="text-lg font-bold block w-full bg-transparent mt-2">
                        Zila
                      </label>
                      <select
                        defaultValue={getZila}
                        onChange={(e) => setZilaValue(e.target.value)}
                        className="w-full bg-white font-semibold pl-5 my-2 rounded-lg py-2 border-b border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="">Choose One...</option>
                        {getDivision &&
                          createZilaTypes(getDivision).map((div) => (
                            <option value={div.value} key={div.value}>
                              {div.title}
                            </option>
                          ))}
                      </select>
                    </div>

                    <div className="w-1/4">
                      <label className="text-lg font-bold block w-full bg-transparent mt-2">
                        Zip Code
                      </label>
                      <input
                        className="w-full bg-white font-semibold pl-5 my-2 rounded-lg py-2 border-b border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                        value={getZipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                      />
                    </div>
                  </div>
                  {/* Cancel Editing & Submitting the Data */}
                  <SaveCancelButton
                    setField={setAddressField}
                    submitUrl={`/user/personal/address`}
                    postData={{
                      address: getAddress,
                      division: getDivision,
                      zila: getZila,
                      zipCode: getZipCode,
                    }}
                    toastMsg="Address Updated"
                    mutate={mutate}
                  />
                </div>
              ) : (
                <div className="flex justify-between py-2">
                  <div>
                    <p className="text-lg font-bold">Address</p>
                    <p className="text-sm font-semibold text-gray-600">
                      {data?.verification?.address}{" "}
                      {data?.verification?.zipCode}
                    </p>
                  </div>
                  <div className={`flex items-center`}>
                    <button
                      onClick={() => setAddressField(true)}
                      className="edit-btn"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              )}

              <hr className="border-gray-600 my-2" />

              {/* When Email Edit Button is clicked */}
              {showEmailField ? (
                <form>
                  <label className="text-lg font-bold block w-full bg-transparent mt-2">
                    Email
                  </label>
                  <div className="flex">
                    <input
                      className="w-full bg-white font-semibold pl-5 my-2 rounded-lg py-2 border-b border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                      value={getEmail}
                      onChange={(e) => setEmailValue(e.target.value)}
                    />
                    <button
                      type="button"
                      disabled={getEmail === data.user.email}
                      className={`w-1/4 ml-4 my-2 rounded-lg bg-primaryAccent text-gray-200 font-semibold capitalize focus:outline-none focus:ring-primaryAccent focus:ring-2 disabled:opacity-50 ${
                        getEmail === data.user.email && "cursor-not-allowed"
                      }`}
                      onClick={async () => {
                        setEmailSending(true);
                        console.log("email: ", getEmail);
                        await laravelApi().post(`/send-verify-email`, {
                          email: getEmail,
                        });
                        setEmailOtpField(true);
                        notify("Email Sent. Check Your Inbox", {
                          type: "success",
                        });
                        setEmailSending(false);
                      }}
                    >
                      {emailSending ? <ReactLoader /> : "Send Otp"}
                    </button>
                  </div>

                  {showEmailOtpField && (
                    <input
                      placeholder="Enter Otp from Email"
                      className="w-full bg-white font-semibold pl-5 my-2 rounded-lg py-2 border-b border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                      onChange={(e) => setEmailOtpValue(e.target.value)}
                    />
                  )}

                  {/* Cancel Editing & Submitting the Data */}
                  <SaveCancelButton
                    setField={setEmailField}
                    submitUrl={`/user/verify-email-otp`}
                    postData={{
                      otp: emailOtpValue,
                      email: getEmail,
                    }}
                    toastMsg="Email Successfully Updated"
                    mutate={mutate}
                  />
                </form>
              ) : (
                <div className="flex justify-between py-2">
                  <div>
                    <p className="text-lg font-bold">Email</p>
                    <p className="text-sm font-semibold text-gray-600">
                      {data.user.email}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <button
                      className={`px-2 py-1 rounded-full ${
                        contactData?.email ? "bg-green" : "bg-red-600"
                      } mx-2 mt-2
                      text-xs text-gray-200 font-semibold capitalize cursor-not-allowed`}
                    >
                      {contactData?.email ? "verified" : "unverified"}
                    </button>

                    <button
                      onClick={() => setEmailField(true)}
                      className="edit-btn"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              )}

              <hr className="border-gray-600 my-2" />

              {/* When Mobile No Edit Button is clicked */}
              {showMobileField ? (
                <div>
                  <label className="text-lg font-bold block w-full bg-transparent mt-2">
                    Mobile No
                  </label>
                  <div className="flex items-center">
                    <div className="px-3 py-1 mr-2 bg-primary text-white font-semibold rounded-full">
                      +880
                    </div>
                    <input
                      className="w-full bg-white font-semibold pl-5 my-2 rounded-lg py-2 border-b border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                      value={getMobileNo}
                      onChange={(e) => setMobileNoValue(e.target.value)}
                    />

                    <button
                      onClick={async () => {
                        setSMSSending(true);

                        try {
                          await laravelApi().post(`/user/send-mobile-otp`, {
                            mobileNo: getMobileNo,
                          });
                          notify("You Will receive an OTP in a minute", {
                            type: "success",
                          });
                        } catch (e) {
                          notify("Otp Invalid Or Expired", {
                            type: "error",
                          });
                        }
                        setMobileOtpField(true);

                        setSMSSending(false);
                      }}
                      disabled={getMobileNo === data?.verification?.mobileNo}
                      className={`w-1/4 ml-2 py-2 my-2 rounded-lg bg-primaryAccent text-gray-200 font-semibold capitalize focus:outline-none focus:ring-primaryAccent focus:ring-2 disabled:opacity-50 ${
                        getMobileNo === data?.verification?.mobileNo &&
                        "cursor-not-allowed"
                      }`}
                    >
                      {smsSending ? <ReactLoader /> : "Send OTP"}
                    </button>
                  </div>
                  {/* Cancel Editing & Submitting the Data */}
                  {showMobileOtpField && (
                    <input
                      placeholder="Enter Otp from Email"
                      className="w-full bg-white font-semibold pl-5 my-2 rounded-lg py-2 border-b border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                      onChange={(e) => setMobileOtpValue(e.target.value)}
                    />
                  )}
                  <SaveCancelButton
                    setField={setMobileField}
                    submitUrl={`/user/verify-mobile-no`}
                    postData={{
                      otp: mobileOtpValue,
                      mobileNo: getMobileNo,
                    }}
                    toastMsg="Mobile No Updated Successfully"
                    mutate={mutate}
                  />
                </div>
              ) : (
                <div className="flex justify-between py-2">
                  <div>
                    <p className="text-lg font-bold">Mobile No</p>
                    <p className="text-sm font-semibold text-gray-600">
                      {data?.user?.mobileNo
                        ? "+880" + data?.user?.mobileNo
                        : null}
                    </p>
                  </div>
                  <div className={`flex items-center`}>
                    <button
                      className={`px-2 py-1 rounded-full ${
                        contactData?.mobileNo ? "bg-green" : "bg-red-600"
                      } mx-2 mt-2
                      text-xs text-gray-200 font-semibold capitalize cursor-not-allowed`}
                    >
                      {contactData?.mobileNo ? "verified" : "unverified"}
                    </button>
                    <button
                      onClick={() => setMobileField(true)}
                      className="edit-btn"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <FullWidthReactLoader />
        )
      ) : null}
    </>
  );
};

export default Personal;
