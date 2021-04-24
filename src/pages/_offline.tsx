import {withIronSession} from "next-iron-session";
import Layout from "../components/layouts/Layout";
import {NEXT_IRON_SESSION_CONFIG} from "../utils/constants";
import {ModifiedUserData} from "../utils/randomTypes";
import React from "react";

interface offlineProps {
    user: ModifiedUserData;
}

const about: React.FC<offlineProps> = ({user}) => {
    return (
        <Layout data={user} title={`Oops, You are Offline`}>
            <div className="text-center text-gray-600">
                <h2 className="text-4xl font-bold">Offline GrayScale</h2>
                <div className="bg-white mt-10 md:mx-56">
                    <p className="p-2">
                        Sorry, Right Now You are Offline. Please check your internet connection
                    </p>
                </div>
            </div>
        </Layout>
    );
};

export const getServerSideProps = withIronSession(async ({req}) => {
    const user = req.session.get("user");
    if (!user) {
        return {props: {}};
    }

    return {
        props: {user},
    };
}, NEXT_IRON_SESSION_CONFIG);

export default about;
