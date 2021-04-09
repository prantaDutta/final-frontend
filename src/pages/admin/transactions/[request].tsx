import React, {useEffect, useState} from "react";
import useSWR from "swr";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import FullWidthReactLoader from "../../../components/shared/FullWidthReactLoader";
import MarkAsButton from "../../../components/shared/MarkAsButton";
import {objectToArrayAndExclude} from "../../../utils/functions";
import {ModifiedUserData} from "../../../utils/randomTypes";
import withAdminAuth from "../../../utils/withAdminAuth";
import ErrorPage from "../../404";
import ShowDetailsInATableWithLinks from "../../../components/shared/ShowDetailsInATableWithLinks";
import DashboardTitle from "../../../components/shared/DashboardTitle";

interface WithdrawalRequestProps {
    user: ModifiedUserData;
    request: string;
}

const WithdrawalRequests: React.FC<WithdrawalRequestProps> =
    ({
         user,
         request,
     }) => {
        if (!request) return <ErrorPage/>;
        const [mounted, useMounted] = useState<boolean>(false);
        useEffect(() => useMounted(true), []);
        const {data} = useSWR(mounted ? `/admin/transaction/${request}` : null);
        return (
            <DashboardLayout data={user}>
                <div className="flex justify-between text-gray-900">
                    <DashboardTitle title={`Transaction Details`} backButton/>
                    {data && data.transaction.transactionType === 'withdraw' && (
                        <>
                            <MarkAsButton
                                title="Mark As Successful"
                                submitUrl={`/admin/transaction/Completed/${request}`}
                                triggerUrl={`/admin/transactions`}
                                returnRoute={`/admin/transactions`}
                                successMsg={`Successfully Marked as Paid`}
                                failedMsg={`Something Went Wrong. Please Try Again`}
                                classNames="bg-primary text-white p-3 w-1/4 hover:bg-primaryAccent"
                            />
                            <MarkAsButton
                                title="Mark As Failed"
                                submitUrl={`/admin/transaction/Failed/${request}`}
                                triggerUrl={`/admin/transactions`}
                                returnRoute={`/admin/transactions`}
                                successMsg={`Successfully Marked as Failed`}
                                failedMsg={`Something Went Wrong. Please Try Again`}
                                classNames="bg-red-600 text-white p-3 w-1/4 hover:bg-red-800"
                            />
                        </>
                    )}
                </div>
                {data ? (
                    <>
                        <ShowDetailsInATableWithLinks
                            title="Transactions Data"
                            dataArray={
                                [
                                    ...objectToArrayAndExclude(data.transaction, ['id']),
                                    ...objectToArrayAndExclude(data.transactionDetail, ['id']),
                                ]
                            }
                        />
                        <ShowDetailsInATableWithLinks
                            title="User Data"
                            dataArray={objectToArrayAndExclude(data.user, [`id`])}
                            urlArray={[`/admin/users/${data.user.id}`]}
                        />
                    </>
                ) : (
                    <FullWidthReactLoader/>
                )}
            </DashboardLayout>
        );
    };

export default WithdrawalRequests;

export const getServerSideProps = withAdminAuth(async (context) => {
    const {user, query} = context;
    const request: string = query.request;

    return {
        props: {user, request},
    };
});
