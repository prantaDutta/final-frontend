import React, {useEffect} from "react";
import AdminDashboardContent from "../../../components/dashboard/AdminDashboardContent";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import {ModifiedUserData} from "../../../utils/randomTypes";
import withAdminAuth from "../../../utils/withAdminAuth";
import {useRecoilState} from "recoil";
import {shouldNotify} from "../../../states/userStates";
import {NEXT_IRON_SESSION_CONFIG} from "../../../utils/constants";
import {applySession} from "next-iron-session";


interface dashboardProps {
    user: ModifiedUserData;
    alert: boolean;
}

const dashboard: React.FC<dashboardProps> = ({user, alert}) => {
    const [, setShouldNotify] = useRecoilState(shouldNotify);
    useEffect(() => setShouldNotify(alert), [])
    return (
        <DashboardLayout data={user}>
            <AdminDashboardContent/>
        </DashboardLayout>
    );
};

export const getServerSideProps = withAdminAuth(async (context) => {
    const {user} = context;
    let alert = false;

    await applySession(context.req, context.res, NEXT_IRON_SESSION_CONFIG);
    const shouldNotify = context.req.session.get('shouldNotifyAdmin');

    if (!shouldNotify) {
        alert = true;
        context.req.session.set('shouldNotifyAdmin', true);
    }

    await context.req.session.save();
    return {props: {user, alert}};
});

export default dashboard;
