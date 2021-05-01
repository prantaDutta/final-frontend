import React, {useEffect, useState} from "react";
import useSWR from "swr";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import DashboardTitle from "../../../components/shared/DashboardTitle";
import FullWidthReactLoader from "../../../components/shared/FullWidthReactLoader";
import {objectToArrayAndExclude} from "../../../utils/functions";
import {ModifiedUserData} from "../../../utils/randomTypes";
import withAdminAuth from "../../../utils/withAdminAuth";
import ErrorPage from "../../404";
import ShowDetailsInATableWithLinks from "../../../components/shared/ShowDetailsInATableWithLinks";
import FetchError from "../../../components/shared/FetchError";

interface InstallmentProps {
    user: ModifiedUserData;
    installmentId: string;
}

const Installment: React.FC<InstallmentProps> = ({user, installmentId}) => {
    if (!installmentId) return <ErrorPage/>;

    const [mounted, useMounted] = useState<boolean>(false);
    useEffect(() => useMounted(true), []);
    const {data, error} = useSWR(
        mounted ? `/user/get-single-installment/${installmentId}` : null
    );

    if (mounted && error) {
        return <FetchError user={user}/>
    }
    return (
        <DashboardLayout data={user} title={`Installment Details`}>
            <div className="flex justify-between">
                <DashboardTitle title={`Installment Details`}/>
            </div>
            {data ? (
                <>
                    <ShowDetailsInATableWithLinks
                        title="Installment Data"
                        dataArray={objectToArrayAndExclude(data.installment, ['id'])}
                    />
                    <ShowDetailsInATableWithLinks
                        title="User Data"
                        dataArray={objectToArrayAndExclude(data.user, ['id'])}
                        urlArray={[`/admin/users/${data.user.id}`]}
                    />
                    <ShowDetailsInATableWithLinks
                        title="Loan Data"
                        dataArray={objectToArrayAndExclude(data.loan, ['id'])}
                        urlArray={[`/admin/loans/${data.loan.id}`]}
                    />
                </>
            ) : (
                <FullWidthReactLoader/>
            )}
        </DashboardLayout>
    );
};

export const getServerSideProps = withAdminAuth(async (context) => {
    const {user, query} = context;
    const installmentId: string = query.installment;

    return {
        props: {user, installmentId},
    };
});

export default Installment;
