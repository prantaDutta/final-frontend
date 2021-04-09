import DashboardLayout from "../../../components/layouts/DashboardLayout";
import withAdminAuth from "../../../utils/withAdminAuth";
import {ModifiedUserData} from "../../../utils/randomTypes";
import DashboardTitle from "../../../components/shared/DashboardTitle";
import React, {useEffect, useState} from "react";
import {numberTypes} from "../../../utils/constantsArray";
import InputSelectField from "../../../components/ReactHookForm/InputSelectField";
import {useForm} from "react-hook-form";
import SubmitButton from "../../../components/shared/SubmitButton";
import {laravelApi} from "../../../utils/api";
import {notify} from "../../../utils/toasts";
import useSWR from "swr";
import FullWidthReactLoader from "../../../components/shared/FullWidthReactLoader";
import {useRouter} from "next/router";

interface ChangeInterestRateProps {
    user: ModifiedUserData
}

export type changeInterestRateFields = {
    interestRate: string | number;
}

const ChangeInterestRate: React.FC<ChangeInterestRateProps> =
    ({user}) => {
        const router = useRouter()
        const [mounted, setMounted] = useState<boolean>(false);
        useEffect(() => setMounted(true), []);
        const {data} = useSWR(mounted ? `/admin/get-interest-rate` : null);
        const [submitting, setSubmitting] = useState(false);
        const {register, handleSubmit, errors} = useForm<changeInterestRateFields>();
        const submitHandler = async (values: changeInterestRateFields) => {
            setSubmitting(true)
            try {
                await laravelApi().post(`/admin/update-interest-rate`, {
                    'interestRate': values.interestRate,
                });
                notify(`Successfully Updated Interest Rate`, {
                    type: "success"
                })
                await router.push('/admin/settings')
            } catch (e) {
                notify(`Something Went Wrong. Try Again`, {
                    type: "error"
                })
            }
            setSubmitting(false);
        }
        return (
            <DashboardLayout data={user}>
                <DashboardTitle title={`Change Default Interest Rate`} backButton/>
                {data ? (
                    <div className="bg-white w-full mx-auto p-4 md:p-8 mt-5 rounded-lg shadow-2xl">
                        <form onSubmit={handleSubmit(submitHandler)} className={` px-4`}>
                            <div className={`flex py-4`}>
                                <InputSelectField
                                    name="interestRate"
                                    label="Change Default Interest Rate (in %)"
                                    error={errors.interestRate?.message}
                                    options={numberTypes(5, 15)}
                                    register={register}
                                    defaultValue={data && data.interestRate}
                                />
                            </div>
                            <SubmitButton submitting={submitting} title={`Submit`}/>
                        </form>
                    </div>
                ) : (
                    <FullWidthReactLoader/>
                )}
            </DashboardLayout>
        )
    }

export default ChangeInterestRate;

export const getServerSideProps = withAdminAuth(async (context) => {
    const {user} = context;
    return {props: {user}};
});