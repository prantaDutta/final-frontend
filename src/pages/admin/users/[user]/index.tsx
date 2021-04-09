import React, {useEffect, useState} from "react";
import DashboardLayout from "../../../../components/layouts/DashboardLayout";
import {objectToArrayAndExclude,} from "../../../../utils/functions";
import {ModifiedUserData, SelectOptionsTypes} from "../../../../utils/randomTypes";
import withAdminAuth from "../../../../utils/withAdminAuth";
import DashboardTitle from "../../../../components/shared/DashboardTitle";
import useSWR from "swr";
import FullWidthReactLoader from "../../../../components/shared/FullWidthReactLoader";
import ShowDetailsInATableWithImages from "../../../../components/shared/ShowDetailsInATableWithImages";
import ShowDetailsInATableWithLinks from "../../../../components/shared/ShowDetailsInATableWithLinks";
import MarkAsButton from "../../../../components/shared/MarkAsButton";

interface userProps {
    user: ModifiedUserData
    userId: string;
}

const user: React.FC<userProps> =
    ({
         user, userId
     }) => {
        const [mounted, setMounted] = useState(false);
        useEffect(() => setMounted(true), []);
        const {data} = useSWR(mounted ? `/admin/user/${userId}` : null)

        const [pendingData, setPendingData] = useState<"pending" | "verified">("verified")

        useEffect(() => {
            if (data && data.user.verified === 'pending') {
                setPendingData("pending");
            } else {
                setPendingData("verified")
            }
        }, [data])

        return (
            <DashboardLayout data={user}>
                <div className="flex justify-between">
                    <DashboardTitle title={`User Details`} backButton={true}/>
                    {data && (
                        <>
                            <MarkAsButton
                                title={`Mark As Verified`}
                                submitUrl={`/admin/verification-check/verified/${data.user.id}`}
                                classNames={`edit-btn disabled:opacity-50`}
                                successMsg={`Marked As Verified Successfully`}
                                disabled={data?.user.verified === 'verified'}
                                returnRoute={`/admin/users`}
                                triggerUrl={`/admin/users/verified`}
                            />

                            <MarkAsButton
                                title={`Mark As Unverified`}
                                submitUrl={`/admin/verification-check/unverified/${data.user.id}`}
                                classNames={`edit-btn disabled:opacity-50`}
                                successMsg={`Marked As Verified Successfully`}
                                disabled={data?.user.verified === 'unverified'}
                                returnRoute={`/admin/users`}
                                triggerUrl={`/admin/users/unverified`}
                            />
                        </>
                    )}
                </div>

                {data ? (
                    <>
                        <ShowDetailsInATableWithLinks
                            title="User Data"
                            dataArray={
                                [
                                    ...objectToArrayAndExclude(data.user, ['id']),
                                    ...objectToArrayAndExclude(data.verification ? data.verification : [], ['id'])
                                ]
                            }
                            showSelectButton
                            selectArray={pendingUserSelectTypes}
                            selectValue={pendingData}
                            setSelectValue={setPendingData}
                        />

                        {pendingData === 'pending' ? data.verificationPhotos.length > 0 ? (
                            <ShowDetailsInATableWithImages
                                title={`Verification Images`}
                                dataArray={[
                                    ...objectToArrayAndExclude(data.verificationPhotos),
                                    ...objectToArrayAndExclude(data.bankStatements),
                                ]}
                            />
                        ) : (
                            <h4 className={`text-center font-bold text-2xl my-4`}>No Verification Photos Found</h4>
                        ) : (
                            <ShowDetailsInATableWithLinks
                                title="User Loans, Installments and Transactions"
                                dataArray={objectToArrayAndExclude(data.user_data)}
                                urlArray={
                                    [
                                        `/admin/users/${userId}/loans`,
                                        `/admin/users/${userId}/user-installments`,
                                        `/admin/users/${userId}/transactions`,
                                    ]
                                }
                            />
                        )}
                    </>
                ) : (
                    <FullWidthReactLoader/>
                )}
            </DashboardLayout>
        )
    }


export const getServerSideProps = withAdminAuth(async (context) => {
    const {user, query} = context;

    const userId: any = query.user;

    return {
        props: {user, userId},
    };
});

export default user;

export const pendingUserSelectTypes: SelectOptionsTypes[] = [
    {
        title: "Pending",
        value: "pending",
    },
    {
        title: "Verified",
        value: "verified",
    },
];