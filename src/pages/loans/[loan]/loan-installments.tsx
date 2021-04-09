import useSWR from "swr";
import {ModifiedUserData} from "../../../utils/randomTypes";
import ReadyMadeTable from "../../../components/ReactTable/ReadyMadeTable";
import FullWidthReactLoader from "../../../components/shared/FullWidthReactLoader";
import DashboardTitle from "../../../components/shared/DashboardTitle";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import React, {useEffect, useState} from "react";
import withAuth from "../../../utils/withAuth";
import {Cell, Column} from "react-table";
import {formatDate} from "../../../utils/functions";
import Link from "next/link";

interface LoanInstallmentsProps {
    user: ModifiedUserData
    loanId: string;
}

const LoanInstallments: React.FC<LoanInstallmentsProps> =
    ({user, loanId}) => {
        const [mounted, setMounted] = useState(false);
        useEffect(() => setMounted(true), []);
        const {data, mutate} = useSWR(mounted ? `/user/loans/loan-installments/${loanId}` : null)
        return (
            <DashboardLayout data={user}>
                <DashboardTitle title={`User Loan Installments`} backButton/>
                {data ? (
                    <ReadyMadeTable
                        title={`All Installments From Loan ${data.id}`}
                        data={data.installments}
                        pagination
                        isValidating={!data}
                        header={UserInstallmentTableHeader}
                        emptyMessage="No LoanInstallments Found"
                        mutateData={() => mutate()}
                    />
                ) : (
                    <FullWidthReactLoader/>
                )}
            </DashboardLayout>
        )
    }

export default LoanInstallments;

export const getServerSideProps = withAuth(async (context) => {
    const {user, query} = context;

    const loanId: any = query.loan;

    return {
        props: {user, loanId},
    };
});

export const UserInstallmentTableHeader: Column[] = [
    {
        Header: "Amount",
        accessor: "amount",
    },
    {
        Header: "Status",
        accessor: "status",
    },
    {
        Header: "Penalty Amount",
        accessor: "penaltyAmount",
    },
    {
        Header: "Total Amount",
        accessor: "totalAmount",
    },
    {
        Header: "Due Date",
        accessor: "dueDate",
        Cell: ({value}: Cell) => formatDate(value, "MMM D, YYYY"),
    },
    {
        Header: "Action",
        accessor: "id",
        Cell: ({value}: Cell) => (
            <Link href={`/installments/${value}`}>
                <span className="btn bg-primary text-white px-3 py-2">Check</span>
            </Link>
        ),
    },
];