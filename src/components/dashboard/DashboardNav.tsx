import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import useSWR from "swr";
import { authStatus } from "../../states/authStates";
import { newLoanFormValues } from "../../states/newLoanState";
import { authenticatedUserData } from "../../states/userStates";
import { verificationFormValues } from "../../states/verificationStates";
import { laravelApi } from "../../utils/api";
import { logout } from "../../utils/auth";

interface MainContentNavProps {}

const MainContentNav: React.FC<MainContentNavProps> = ({}) => {
  const [startLoggingOut, setLoggingOut] = useState<boolean>(false);
  const router = useRouter();
  const [, toggleAuth] = useRecoilState(authStatus);
  const userData = useRecoilValue(authenticatedUserData);
  const [, setVerifyData] = useRecoilState(verificationFormValues);
  const [, setNewLoanFormValues] = useRecoilState(newLoanFormValues);
  const [mounted, setMounted] = useState<boolean>(false);
  // for balance reload animation
  const [animate, setAnimate] = useState(false);
  useEffect(() => setMounted(true), []);
  const { data, mutate: NotifyMutate } = useSWR(
    mounted ? `/user/dashboard-notifications` : null
  );
  // if (!isProduction) console.log("data: ", data);
  const [showNotificationsDiv, setNotificationsDiv] = useState<boolean>(false);

  // console.log("Auth: ", getAuth());
  // console.log("Auth");

  // Fetch current balance
  const { data: balanceData, mutate } = useSWR(
    mounted ? `/user/balance` : null
  );
  return (
    <div className="flex justify-end items-center bg-gray-200 pr-4">
      {userData?.role !== "admin" && (
        <div className="flex items-center cursor-pointer p-4">
          <div>
            <svg
              className="w-6 h-6 mx-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
              />
            </svg>
          </div>

          <div>
            <h4>Available Balance: </h4>
            <h4 className="font-bold">
              <div className="flex">
                <p>
                  Tk.{" "}
                  {balanceData
                    ? balanceData.balance.toFixed(2)
                    : (0).toFixed(2)}
                </p>
                <button
                  className="pl-4 focus:outline-none focus:ring-0"
                  onClick={async () => {
                    setAnimate(true);
                    setTimeout(() => {
                      setAnimate(false);
                    }, 1000);
                    await mutate();
                  }}
                >
                  <svg
                    className={`w-4 h-4 ${animate && "animate-spin"}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                </button>
              </div>
            </h4>
          </div>
        </div>
      )}
      <div className="flex items-center cursor-pointer p-4 hover:bg-gray-300 rounded">
        <div>
          <svg
            className="w-6 h-6 mx-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </div>
        <div>
          <h4 className="">Welcome, </h4>
          <h4 className="font-bold">{userData?.name}</h4>
        </div>
      </div>
      <div className="p-4 relative flex items-center">
        <button
          onClick={async () => {
            setNotificationsDiv(!showNotificationsDiv);
            if (showNotificationsDiv) {
              let notificationIds: any[] = [];
              data.notifications.map((notification: any) => {
                notificationIds.push(notification.id);
              });
              try {
                await laravelApi().post("/user/mark-three-as-notified", {
                  notificationIds,
                });
              } catch (e) {
                console.log("Problem Marking Notifications as read");
              }
              NotifyMutate();
            }
          }}
          className="relative block border-2 border-transparent text-gray-800 rounded-full hover:text-gray-400 focus:outline-none focus:text-gray-500 transition duration-150 ease-in-out"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </button>
        {data && (
          <>
            {data?.count > 0 && (
              <div className="bg-primary text-white text-xs font-bold rounded-full px-1.5 py-0.5 absolute z-10 top-0 left-1/2 mt-1">
                <span>{data?.count}</span>
              </div>
            )}
            {showNotificationsDiv && (
              <div className="mt-2 py-2 w-max bg-white rounded-lg shadow-xl absolute top-full transform -translate-x-72 z-10">
                {data.notifications.length > 0 ? (
                  data.notifications.map((notification: any, i: number) => {
                    return (
                      <div key={notification.id}>
                        <div className="flex flex-grow justify-start items-center px-4 py-2 text-gray-800 text-sm font-bold">
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
                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>{" "}
                          <div className="p-2 mr-2">
                            <h4 className="whitespace-nowrap">
                              {notification.data.msg}
                            </h4>
                            <p className="text-primary text-center">
                              {notification.diffForHumans}
                            </p>
                          </div>
                          <svg
                            className="w-6 h-6 inline mt-0.5 text-red-600 cursor-pointer"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </div>
                        {i < data.notifications.length - 1 && <hr />}
                        {i === data.notifications.length - 1 && (
                          <p
                            onClick={() =>
                              router.push("/settings/notifications")
                            }
                            className="edit-btn text-center m-2"
                          >
                            All Notifications
                          </p>
                        )}
                      </div>
                    );
                  })
                ) : (
                  // This is kinda unnecessary by the way
                  // This is for no notifications in the database
                  <div className="flex justify-start items-start px-4 py-2 text-gray-800 text-sm font-bold">
                    <svg
                      className="w-6 h-6 inline mt-0.5 mr-2 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                      />
                    </svg>{" "}
                    <h4 className="px-2">
                      Phew, You don't have any Notifications
                    </h4>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
      <div className="p-4 focus:outline-none focus:ring-1 focus:ring-primary">
        <button
          className="p-2 cursor-pointer rounded border-solid border-2 border-primary hover:bg-primaryAccent hover:text-white hover:border-0 active:bg-primaryAccent focus:outline-none focus:ring-0"
          disabled={startLoggingOut}
          onClick={async () => {
            setLoggingOut(true);
            toggleAuth(false);
            setVerifyData(null);
            setNewLoanFormValues(null);
            await logout();
            return router.push("/");
          }}
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default MainContentNav;
