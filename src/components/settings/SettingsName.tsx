import React from "react";
import { useRecoilState } from "recoil";
import {
  accountExpand,
  administrationExpand,
  personalExpand,
  securityExpand,
} from "../../states/settingsStates";

interface SettingsNameProps {
  expand: boolean;
  title: string;
  svgD: string;
  current: string;
}

const SettingsName: React.FC<SettingsNameProps> = ({
  expand,
  title,
  svgD,
  current,
}) => {
  const [personal, setPersonalExpand] = useRecoilState(personalExpand);
  const [account, setAccountExpand] = useRecoilState(accountExpand);
  const [security, setSecurityExpand] = useRecoilState(securityExpand);
  const [administration, setAdministrationExpand] = useRecoilState(
    administrationExpand
  );
  return (
    <div
      onClick={() => {
        if (current === "personal") {
          setPersonalExpand(!personal);
          setAccountExpand(false);
          setSecurityExpand(false);
          setAdministrationExpand(false);
        } else if (current === "account") {
          setPersonalExpand(false);
          setAccountExpand(!account);
          setSecurityExpand(false);
          setAdministrationExpand(false);
        } else if (current === "security") {
          setPersonalExpand(false);
          setAccountExpand(false);
          setSecurityExpand(!security);
          setAdministrationExpand(false);
        } else if (current === "administration") {
          setPersonalExpand(false);
          setAccountExpand(false);
          setSecurityExpand(false);
          setAdministrationExpand(!administration);
        }
      }}
      className={`mt-5 bg-primary text-white rounded-2xl px-3 flex justify-between items-center text-center cursor-pointer transition-css`}
    >
      <div
        className={`flex items-center p-3 text-lg font-semibold tracking-wide`}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={svgD}
          />
        </svg>
        <span className={`ml-2`}>{title}</span>
      </div>
      {expand ? (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 15l7-7 7 7"
          />
        </svg>
      ) : (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      )}
    </div>
  );
};

export default SettingsName;
