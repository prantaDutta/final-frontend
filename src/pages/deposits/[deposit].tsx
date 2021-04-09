import React, {useEffect, useState} from "react";
import useSWR from "swr";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import DashboardTitle from "../../components/shared/DashboardTitle";
import FullWidthReactLoader from "../../components/shared/FullWidthReactLoader";
import {objectToArrayAndExclude} from "../../utils/functions";
import {ModifiedUserData} from "../../utils/randomTypes";
import withAuth from "../../utils/withAuth";
import ErrorPage from "../404";
import ShowDetailsInATableWithLinks from "../../components/shared/ShowDetailsInATableWithLinks";

interface DepositProps {
    user: ModifiedUserData;
    depositId: string;
}

const Deposit: React.FC<DepositProps> = ({user, depositId}) => {
    if (!depositId) return <ErrorPage/>;

    const [mounted, useMounted] = useState<boolean>(false);
    useEffect(() => useMounted(true), []);
    let {data} = useSWR(
        mounted ? `/user/get-single-transaction/deposit/${depositId}` : null
    );

    return (
        <DashboardLayout data={user}>
            <DashboardTitle title={`Deposit Details`} backButton/>

            {data ? (
                <ShowDetailsInATableWithLinks
                    title="Deposit Data"
                    dataArray={[
                        ...objectToArrayAndExclude(data.transaction, ['id']),
                        ...objectToArrayAndExclude(data.details, ['id']),
                    ]}
                />
            ) : (
                <FullWidthReactLoader/>
            )}
        </DashboardLayout>
    );
};

export const getServerSideProps = withAuth(async (context) => {
    const {user, query} = context;
    const depositId: string = query.deposit;
    return {props: {user, depositId}};
});

export default Deposit;