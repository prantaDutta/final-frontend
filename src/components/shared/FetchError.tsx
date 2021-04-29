import React from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import {useRouter} from "next/router";
import {ModifiedUserData} from "../../utils/randomTypes";

interface FetchErrorProps {
    user: ModifiedUserData,
    status?: number;
    errorMsg?: string;
    description?: string;
}

const FetchError: React.FC<FetchErrorProps> = ({
                                                   user,
                                                   status = 404,
                                                   errorMsg = 'Data Not Found',
                                                   description = "Please Check your internet connection and try again"
                                               }) => {
    const router = useRouter();
    return (
        <DashboardLayout data={user} title={`Something Went Wrong`}>
            <div className="bg-gray-200 h-full">
                <div className="w-9/12 m-auto py-2 sm:py-8 md:py-16 flex items-center justify-center">
                    <div className="overflow-hidden sm:rounded-lg pb-4 md:pb-8">
                        <div className="text-center pt-4 md:pt-8">
                            <h1 className="text-2xl md:text-6xl font-bold text-primary">
              <span
                  className={`bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500`}
              >
                {status}
              </span>
                            </h1>
                            <h1 className="text-4xl md:text-6xl font-semibold py-4 md:py-8">
                                {errorMsg}
                            </h1>
                            <p className="text-sm md:text-2xl pb-8 px-6 md:px-12 font-semibold">
                                {description}
                            </p>
                            <button
                                onClick={() => router.push("/")}
                                className="text-white font-semibold px-6 py-3 rounded-md mr-6 bg-gradient-to-r from-primary to-primaryAccent hover:from-green-400 hover:to-blue-500 focus:outline-none"
                            >
                                Go HOME
                            </button>
                            <button
                                onClick={() => router.reload()}
                                className="text-white font-semibold px-6 py-3 rounded-md bg-gradient-to-r from-red-400 to-red-500 hover:from-purple-400 hover:via-pink-500 hover:to-red-500"
                            >
                                Reload
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}

export default FetchError;