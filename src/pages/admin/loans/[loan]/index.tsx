import React, {useEffect, useState} from "react";
import useSWR from "swr";
import DashboardLayout from "../../../../components/layouts/DashboardLayout";
import DashboardTitle from "../../../../components/shared/DashboardTitle";
import FullWidthReactLoader from "../../../../components/shared/FullWidthReactLoader";
import {objectToArrayAndExclude} from "../../../../utils/functions";
import {ModifiedUserData} from "../../../../utils/randomTypes";
import withAdminAuth from "../../../../utils/withAdminAuth";
import ErrorPage from "../../../404";
import ShowDetailsInATableWithLinks from "../../../../components/shared/ShowDetailsInATableWithLinks";

interface LoanProps {
    user: ModifiedUserData;
    loanId: string;
}

const Loan: React.FC<LoanProps> = ({user, loanId}) => {
    if (!loanId) return <ErrorPage/>;

    const [mounted, useMounted] = useState<boolean>(false);
    useEffect(() => useMounted(true), []);
    let {data} = useSWR(mounted ? `/admin/get-single-loan/${loanId}` : null);

    return (
        <DashboardLayout data={user}>
            <DashboardTitle title={`Loan Details`}/>
            {data ? (
                <>
                    <ShowDetailsInATableWithLinks
                        title="Loan Data"
                        dataArray={objectToArrayAndExclude(data.loan, ['id'])}
                    />

                    <ShowDetailsInATableWithLinks
                        title="Borrower Data"
                        dataArray={objectToArrayAndExclude(data.theBorrower)}
                        thDataArray={['name', 'amount']}
                        urlArray={[`/admin/users/${data.borrowerId[0]}`]}
                        dataIsLink={false}
                    />

                    <ShowDetailsInATableWithLinks
                        title="Lender Data"
                        dataArray={objectToArrayAndExclude(data.theLenders)}
                        urlArray={generateLenderIdArray(data.lenderIds)}
                        thDataArray={['name', 'amount']}
                        dataIsLink={false}
                    />

                    <ShowDetailsInATableWithLinks
                        title="Total Installments"
                        dataArray={objectToArrayAndExclude(data.totalInstallments)}
                        urlArray={[`/admin/loans/${loanId}/loan-installments`]}
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

    const loanId: string = query.loan;

    return {
        props: {user, loanId},
    };
});

export default Loan;

export const generateLenderIdArray = (arr: string[]) => {
    let newArr: string[]=[];

    arr.map((ar) => {
        newArr.push(`/admin/users/${ar}`);
    })

    return newArr;
}