import Link from "next/link";
import React, {useEffect, useState} from "react";
import useSWR from "swr";
import {isProduction} from "../../utils/constants";
import {notify} from "../../utils/toasts";
import DashboardTitle from "../shared/DashboardTitle";
import FullWidthReactLoader from "../shared/FullWidthReactLoader";
import DashboardBubble from "./DashboardBubble";
import {useRecoilValue} from "recoil";
import {shouldNotify} from "../../states/userStates";

interface DashboardContentProps {
}

const AdminDashboardContent: React.FC<DashboardContentProps> = ({}) => {
    const [mounted, setMounted] = useState<boolean>(false);
    const shouldNotifyValue = useRecoilValue(shouldNotify);
    useEffect(() => setMounted(true), []);
    const {data /* , isValidating */} = useSWR(
        mounted ? `/admin/dashboard-data` : null
    );
    if (data && !isProduction) console.log("data: ", data);
    if (data && shouldNotifyValue) {
        if (data.loans > 0) {
            // Providing toastId to prevent duplicate toast
            notify(`You have ${data.loans} Processing Loans`, {
                type: "info",
                toastId: "dashboard-loans",
            });
        }

        if (data.withdrawals > 0) {
            notify(`You have ${data.withdrawals} Processing Withdrawals`, {
                type: "info",
                toastId: "dashboard-withdrawals",
            });
        }

        if (data.verifications > 0) {
            notify(`You have ${data.verifications} Verifications Requests`, {
                type: "info",
                toastId: "dashboard-verifications",
            });
        }
    }
    return (
        <div>
            <DashboardTitle backButton={false} title="Dashboard"/>

            {data ? (
                <div className="grid grid-cols-2">
                    <Link href={`/admin/users`}>
                        <div className="mt-5">
                            <DashboardBubble
                                title="Verification Requests"
                                shorterTitle={`${data.verifications} New Verification Request(s)`}
                            />
                        </div>
                    </Link>

                    <Link href={`/admin/loans`}>
                        <div className="mt-5">
                            <DashboardBubble
                                title="Loan Requests"
                                shorterTitle={`${data.loans} New Loan(s)`}
                            />
                        </div>
                    </Link>

                    <Link href={`/admin/transactions`}>
                        <div className="mt-5">
                            <DashboardBubble
                                title="Withdrawal Requests"
                                shorterTitle={`${data.withdrawals} New Withdrawal Request(s)`}
                            />
                        </div>
                    </Link>
                </div>
            ) : (
                <FullWidthReactLoader/>
            )}
        </div>
    );
};

export default AdminDashboardContent;
