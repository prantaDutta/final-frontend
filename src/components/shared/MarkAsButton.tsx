import {laravelApi} from "../../utils/api";
import {isProduction} from "../../utils/constants";
import {trigger} from "swr";
import ReactLoader from "./ReactLoader";
import React, {useState} from "react";
import {useRouter} from "next/router";
import {notify} from "../../utils/toasts";

interface MarkAsButtonProps {
    title: string;
    submitUrl: string;
    triggerUrl?: string;
    returnRoute?: string;
    classNames?: string;
    successMsg: string,
    failedMsg?: string;
    disabled?: boolean;
}

const MarkAsButton: React.FC<MarkAsButtonProps> =
    ({
         title,
         submitUrl,
         triggerUrl,
         returnRoute,
         successMsg,
         disabled = false,
         failedMsg = 'Something Went Wrong, Please Try Again',
         classNames = 'w-1/5 rounded-xl tracking-wide font-semibold font-display focus:outline-none focus:shadow-outline shadow-lg transition-css',
     }) => {
        const [submitting, setSubmitting] = useState<boolean>(false);
        const router = useRouter();
        return (
            <button
                disabled={disabled}
                onClick={async () => {
                    setSubmitting(true);
                    try {
                        const {data} = await laravelApi().get(submitUrl);
                        if (isProduction) console.log(data);
                        notify(successMsg, {type: "success"})
                    } catch (e) {
                        notify(failedMsg, {type: "error"})
                    }
                    setSubmitting(false);
                    if (triggerUrl) await trigger(triggerUrl);
                    if (returnRoute) return router.push(returnRoute);
                }}
                className={`${classNames}`}
            >
                {submitting ? <ReactLoader/> : title}
            </button>
        );
    };

export default MarkAsButton;
