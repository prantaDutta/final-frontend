import withAdminAuth from "../../../../utils/withAdminAuth";
import {ModifiedUserData} from "../../../../utils/randomTypes";
import React, {useEffect, useState} from "react";
import DashboardLayout from "../../../../components/layouts/DashboardLayout";
import DashboardTitle from "../../../../components/shared/DashboardTitle";
import useSWR from "swr";
import ReadyMadeTable from "../../../../components/ReactTable/ReadyMadeTable";
import FullWidthReactLoader from "../../../../components/shared/FullWidthReactLoader";
import {AdminInstallmentTableHeader} from "../../installments";
import FetchError from "../../../../components/shared/FetchError";

interface UserInstallmentsProps {
    user: ModifiedUserData
    userId: string;
}

const UserInstallments: React.FC<UserInstallmentsProps> =
    ({user, userId}) => {
        const [mounted, setMounted] = useState(false);
        useEffect(() => setMounted(true), []);
        const {data, mutate, error} = useSWR(mounted ? `/admin/user/user-installments/${userId}` : null)
        if (mounted && error) {
            return <FetchError user={user}/>
        }
        return (
            <DashboardLayout data={user} title={`User Installments`}>
                <DashboardTitle title={`User Installments`} backButton />
                {data ? (
                    <ReadyMadeTable
                        title={`All Installments By ${data.name}`}
                        data={data.installments}
                        pagination
                        isValidating={!data}
                        header={AdminInstallmentTableHeader}
                        emptyMessage="No Installments Found"
                        mutateData={() => mutate()}
                    />
                ) : (
                    <FullWidthReactLoader/>
                )}
            </DashboardLayout>
        )
    }

export default UserInstallments;

export const getServerSideProps = withAdminAuth(async (context) => {
    const {user, query} = context;

    const userId: any = query.user;

    return {
        props: {user, userId},
    };
});