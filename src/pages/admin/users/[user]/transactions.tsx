import withAdminAuth from "../../../../utils/withAdminAuth";
import {ModifiedUserData} from "../../../../utils/randomTypes";
import React, {useEffect, useState} from "react";
import DashboardLayout from "../../../../components/layouts/DashboardLayout";
import DashboardTitle from "../../../../components/shared/DashboardTitle";
import useSWR from "swr";
import ReadyMadeTable from "../../../../components/ReactTable/ReadyMadeTable";
import FullWidthReactLoader from "../../../../components/shared/FullWidthReactLoader";
import {AdminTransactionsTableHeader} from "../../transactions";

interface TransactionsProps {
    user: ModifiedUserData
    userId: string;
}

const Transactions: React.FC<TransactionsProps> =
    ({user, userId}) => {
        const [mounted, setMounted] = useState(false);
        useEffect(() => setMounted(true), []);
        const {data, mutate} = useSWR(mounted ? `/admin/user/transactions/${userId}` : null)
        return (
            <DashboardLayout data={user}>
                <DashboardTitle title={`User Transactions`} backButton/>
                {data ? (
                    <ReadyMadeTable
                        title={`All Transactions By ${data.name}`}
                        data={data.transactions}
                        pagination
                        isValidating={!data}
                        header={AdminTransactionsTableHeader}
                        emptyMessage="No Transactions Found"
                        mutateData={() => mutate()}
                    />
                ) : (
                    <FullWidthReactLoader/>
                )}
            </DashboardLayout>
        )
    }

export default Transactions;

export const getServerSideProps = withAdminAuth(async (context) => {
    const {user, query} = context;

    const userId: any = query.user;

    return {
        props: {user, userId},
    };
});