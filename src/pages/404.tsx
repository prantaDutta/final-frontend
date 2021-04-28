import React from "react";
import ErrorComponent from "../components/shared/ErrorComponent";
import Layout from "../components/layouts/Layout";

interface Props {
    code?: number;
    errorMsg?: string;
    description?: string;
}

const ErrorPage: React.FC<Props> =
    ({
         code = 404,
         errorMsg = "Oops! Page not found",
         description = "The page you are looking for might have been removed had its name changed or is temporarily unavailable",
     }) => {
        return (
            <Layout title={`Page Not Found`}>
                <ErrorComponent code={code} errorMsg={errorMsg} description={description}/>
            </Layout>
        );
    };

export default ErrorPage;
