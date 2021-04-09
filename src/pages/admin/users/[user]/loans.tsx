import withAdminAuth from "../../../../utils/withAdminAuth";
import {ModifiedUserData} from "../../../../utils/randomTypes";
import React, {useEffect, useState} from "react";
import DashboardLayout from "../../../../components/layouts/DashboardLayout";
import DashboardTitle from "../../../../components/shared/DashboardTitle";
import useSWR from "swr";
import ReadyMadeTable from "../../../../components/ReactTable/ReadyMadeTable";
import FullWidthReactLoader from "../../../../components/shared/FullWidthReactLoader";
import {loanRequestsTableHeader} from "../../loans";

interface LoansProps {
    user: ModifiedUserData
    userId: string;
}

const Loans: React.FC<LoansProps> =
    ({user, userId}) => {
        const [mounted, setMounted] = useState(false);
        useEffect(() => setMounted(true), []);
        const {data, mutate} = useSWR(mounted ? `/admin/user/loans/${userId}` : null)
        return (
            <DashboardLayout data={user}>
                <DashboardTitle title={`User Loans`} backButton/>
                {data ? (
                    <ReadyMadeTable
                        title={`All Loans By ${data.name}`}
                        data={data.loans}
                        pagination
                        isValidating={!data}
                        header={loanRequestsTableHeader}
                        emptyMessage="No Loans Found"
                        mutateData={() => mutate()}
                    />
                ) : (
                    <FullWidthReactLoader/>
                )}
            </DashboardLayout>
        )
    }

export default Loans;

export const getServerSideProps = withAdminAuth(async (context) => {
    const {user, query} = context;

    const userId: any = query.user;

    return {
        props: {user, userId},
    };
});