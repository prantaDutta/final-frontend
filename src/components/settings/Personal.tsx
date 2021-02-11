import React, { useState } from "react";
import FullWidthReactLoader from "../shared/FullWidthReactLoader";
import SettingsName from "./SettingsName";
import { useRecoilState } from "recoil";
import { personalExpand } from "../../states/settingsStates";
import {
  createDivisionsTypes,
  createZilaTypes,
} from "../../utils/constantsArray";
import SaveCancelButton from "./SaveCancelButton";

interface PersonalProps {
  data: any;
}

const Personal: React.FC<PersonalProps> = ({ data }) => {
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
    data ? data.verification?.mobileNo : ""
  );
  const [getEmail, setEmailValue] = useState(data ? data.user.email : "");
  const [showAddressField, setAddressField] = useState<boolean>(false);
  const [showMobileField, setMobileField] = useState<boolean>(false);
  const [showEmailField, setEmailField] = useState<boolean>(false);
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
                        onChange={(e) => setDivisionValue(e.target.value)}
                        className="w-full bg-white font-semibold pl-5 my-2 rounded-lg py-2 border-b border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="">Choose One...</option>
                        {createDivisionsTypes().map((div) => (
                          <option
                            selected={div.value === getDivision}
                            value={div.value}
                            key={div.value}
                          >
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
                        onChange={(e) => setZilaValue(e.target.value)}
                        className="w-full bg-white font-semibold pl-5 my-2 rounded-lg py-2 border-b border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="">Choose One...</option>
                        {getDivision &&
                          createZilaTypes(getDivision).map((div) => (
                            <option
                              selected={div.value === getZila}
                              value={div.value}
                              key={div.value}
                            >
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
                    settingsType="Personal"
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

              {/* When Mobile No Edit Button is clicked */}
              {showMobileField ? (
                <form>
                  <label className="text-lg font-bold block w-full bg-transparent mt-2">
                    Mobile No
                  </label>
                  <input
                    className="w-full bg-white font-semibold pl-5 my-2 rounded-lg py-2 border-b border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                    value={getMobileNo}
                    onChange={(e) => setMobileNoValue(e.target.value)}
                  />
                  {/* Cancel Editing & Submitting the Data */}
                  <SaveCancelButton
                    setField={setMobileField}
                    submitUrl={`/user/personal/mobile`}
                    postData={{
                      mobileNo: getMobileNo,
                    }}
                    settingsType="Personal"
                  />
                </form>
              ) : (
                <div className="flex justify-between py-2">
                  <div>
                    <p className="text-lg font-bold">Mobile No</p>
                    <p className="text-sm font-semibold text-gray-600">
                      {data?.verification?.mobileNo}
                    </p>
                  </div>
                  <div className={`flex items-center`}>
                    <button
                      onClick={() => setMobileField(true)}
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
                  <input
                    className="w-full bg-white font-semibold pl-5 my-2 rounded-lg py-2 border-b border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                    value={getEmail}
                    onChange={(e) => setEmailValue(e.target.value)}
                  />
                  {/* Cancel Editing & Submitting the Data */}
                  <SaveCancelButton
                    setField={setEmailField}
                    submitUrl={`/user/personal/email`}
                    postData={{
                      email: getEmail,
                    }}
                    settingsType="Personal"
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
                  <div className={`flex items-center`}>
                    <button
                      onClick={() => setEmailField(true)}
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
