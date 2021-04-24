import React, {useEffect} from "react";
import UserDashboardContent from "../../components/dashboard/UserDashboardContent";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import {ModifiedUserData} from "../../utils/randomTypes";
import withAuth from "../../utils/withAuth";
import {applySession} from "next-iron-session";
import {NEXT_IRON_SESSION_CONFIG} from "../../utils/constants";
import {useRecoilState} from "recoil";
import {shouldNotify} from "../../states/userStates";

interface dashboardProps {
    user: ModifiedUserData;
    alert: boolean
}

const dashboard: React.FC<dashboardProps> = ({user, alert}) => {
    const [, setShouldNotify] = useRecoilState(shouldNotify);
    useEffect(() => setShouldNotify(alert), [])
    return (
        <DashboardLayout data={user} title={`User Dashboard`}>
            <UserDashboardContent/>
        </DashboardLayout>
    );
};

export const getServerSideProps = withAuth(async (context) => {
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
