import InputSelectField from "../ReactHookForm/InputSelectField";
import {
  createDivisionsTypes,
  createZilaTypes,
} from "../../utils/constantsArray";
import InputTextField from "../ReactHookForm/InputTextField";
import React, { useEffect, useState } from "react";
import NextPreviousButton from "./NextPreviousButton";
import { useRecoilState } from "recoil";
import {
  verificationFormValues,
  verificationStep,
} from "../../states/verificationStates";
import { useForm } from "react-hook-form";
import { AddressVerificationFormValues } from "../../utils/randomTypes";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { object } from "yup";
import useSWR from "swr";
import { isProduction } from "../../utils/constants";

interface AddressProps {}

const Address: React.FC<AddressProps> = ({}) => {
  const [verificationValues, setValues] = useRecoilState(
    verificationFormValues
  );
  const [step, setStep] = useRecoilState(verificationStep);
  const {
    watch,
    register,
    handleSubmit,
    errors,
  } = useForm<AddressVerificationFormValues>({
    resolver: yupResolver(
      object({
        address: yup.string().required("Required"),
        division: yup.string().required("Required"),
        zila: yup.string().required("Required"),
        zip_code: yup
          .number()
          .typeError("Zip must be a number")
          .test(
            "len",
            "Zip Code must be 4 characters",
            (val) => val?.toString().length === 4
          )
          .required("Required"),
      })
    ),
    mode: "onSubmit",
    reValidateMode: "onBlur",
  });
  const onSubmit = async (values: AddressVerificationFormValues) => {
    // values.dateOfBirth = format(parseJSON(values.dateOfBirth), "MM/dd/yyyy");
    const { address, division, zila, zip_code } = values;
    // setValues({ ...verificationValues ? , email, address, mobileNo });
    setValues({
      ...verificationValues!,
      address,
      division,
      zila,
      zip_code,
    });
    setStep(step + 1);
  };
  const [mounted, setMounted] = useState<boolean>(false);
  useEffect(() => setMounted(true), []);
  const { data: contactData } = useSWR(
    mounted ? "/user/contact-verified" : null
  );
  if (!isProduction) console.log(contactData);
  return (
    <div className="pb-3 px-2 md:px-0 mt-10">
      <main className="bg-white max-w-full mx-auto p-4 md:p-8 my-5 rounded-lg shadow-2xl">
        <section>
          <h3 className="font-bold text-2xl">Address Information</h3>
        </section>
        <form className="mt-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex px-4">
            <InputTextField
              name="address"
              defaultValue={verificationValues?.address}
              label="Your Address"
              error={errors.address?.message}
              placeholder="Enter Your Address"
              register={register}
            />
          </div>
          <div className="flex px-4">
            <InputSelectField
              defaultValue={verificationValues?.division}
              name="division"
              halfWidth
              label="Select Division"
              error={errors.division?.message}
              register={register}
              options={createDivisionsTypes()}
            />
            <InputSelectField
              defaultValue={verificationValues?.zila}
              name="zila"
              halfWidth
              label="Select Zila"
              error={errors.zila?.message}
              register={register}
              options={
                watch("division") ? createZilaTypes(watch("division")) : null
              }
            />
          </div>
          <div className="flex px-4">
            <InputTextField
              defaultValue={verificationValues?.zip_code}
              name="zip_code"
              label="Zip Code"
              error={errors.zip_code?.message}
              register={register}
              placeholder="i.e. 4000"
            />
          </div>
          <NextPreviousButton nextDisabled={!errors} />
        </form>
      </main>
    </div>
  );
};

export default Address;
