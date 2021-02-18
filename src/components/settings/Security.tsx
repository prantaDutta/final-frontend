import { useRecoilState } from "recoil";
import { securityExpand } from "../../states/settingsStates";
import SettingsName from "./SettingsName";
import FullWidthReactLoader from "../shared/FullWidthReactLoader";
import React, { useState } from "react";
import SettingsTextField from "./SettingsTextField";
import SaveCancelButton from "./SaveCancelButton";
import { mutateCallback } from "swr/dist/types";

interface SecurityProps {
  data: any;
  mutate: (
    data?: Promise<any> | mutateCallback | any,
    shouldRevalidate?: boolean
  ) => Promise<any | undefined>;
}

const Security: React.FC<SecurityProps> = ({ data, mutate }) => {
  const [expand] = useRecoilState(securityExpand);
  const [showPasswordField, setPasswordField] = useState<boolean>(false);
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  return (
    <>
      <SettingsName
        expand={expand}
        current="security"
        title={`Security`}
        svgD="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
      />
      {expand ? (
        data ? (
          <>
            <div className="mt-5 px-12 py-4 rounded-xl border-2 border-gray-500">
              {showPasswordField ? (
                <div>
                  <p className="text-lg font-bold">Change Password</p>
                  <SettingsTextField
                    label="Current Password"
                    placeholder="Enter Your Current Password"
                    setStateValue={setCurrentPassword}
                  />
                  <SettingsTextField
                    label="New Password"
                    placeholder="Enter New Password"
                    setStateValue={setNewPassword}
                  />
                  <SettingsTextField
                    label="Confirm New Password"
                    placeholder="Confirm New Password"
                    setStateValue={setConfirmPassword}
                  />
                  <SaveCancelButton
                    setField={setPasswordField}
                    submitUrl={`/user/account/password`}
                    postData={{
                      currentPassword,
                      newPassword,
                      password_confirmation: confirmPassword,
                    }}
                    mutate={mutate}
                    toastMsg="Password Changed Successfully"
                  />
                </div>
              ) : (
                <div className="flex justify-between items-center">
                  <button className="text-lg font-bold">Password</button>

                  <div className={`flex items-center`}>
                    <button
                      onClick={() => setPasswordField(true)}
                      className="edit-btn"
                    >
                      Change Password
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

export default Security;
