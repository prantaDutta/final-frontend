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
import ErrorComponent from "../../components/shared/ErrorComponent";
import FetchError from "../../components/shared/FetchError";

interface withdrawProps {
    user: ModifiedUserData;
    withdrawId: string;
}

const withdraw: React.FC<withdrawProps> = ({user, withdrawId}) => {
    if (!withdrawId) return <ErrorPage/>;

    const [mounted, useMounted] = useState<boolean>(false);
    useEffect(() => useMounted(true), []);
    const {data, error} = useSWR(
        mounted ? `/user/get-single-transaction/withdraw/${withdrawId}` : null
    );

    if (mounted && error) {
        return <FetchError user={user}/>
    }

    return (
        <DashboardLayout data={user} title={`Withdrawal Details`}>
            <DashboardTitle title={`Withdrawal Details`} backButton/>

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
    const withdrawId: string = query.withdraw;
    return {props: {user, withdrawId}};
});

export default withdraw;
