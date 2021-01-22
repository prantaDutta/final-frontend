import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue } from "recoil";
import * as yup from "yup";
import { object } from "yup";
import { authenticatedUserData } from "../../states/userStates";
import {
  verificationFormValues,
  verificationStep,
} from "../../states/verificationStates";
import { ContactVerificationFormValues } from "../../utils/randomTypes";
import InputTextField from "../ReactHookForm/InputTextField";
import NextPreviousButton from "./NextPreviousButton";
import { laravelApi } from "../../utils/api";
import InputSelectField from "../ReactHookForm/InputSelectField";
import {
  createDivisionsTypes,
  createZilaTypes,
} from "../../utils/constantsArray";

interface ContactProps {}

const Contact: React.FC<ContactProps> = ({}) => {
  const [verificationValues, setValues] = useRecoilState(
    verificationFormValues
  );
  const userData = useRecoilValue(authenticatedUserData);
  const [step, setStep] = useRecoilState(verificationStep);
  const {
    register,
    handleSubmit,
    errors,
  } = useForm<ContactVerificationFormValues>({
    resolver: yupResolver(
      object({
        address: yup.string().required("Required"),
        email: yup
          .string()
          .email("Invalid email")
          .test("Unique Email", "Email already been taken", function (value) {
            return new Promise(async (resolve, _) => {
              try {
                await laravelApi().post("/unique-email-excluding-id", {
                  email: value,
                  id: userData?.id,
                });
                resolve(false);
              } catch (e) {
                resolve(true);
              }
            });
          })
          .required("Required"),
        mobileNo: yup
          .number()
          .typeError("Mobile No. must be a number")
          .test(
            "len",
            "Mobile No must be 11 characters",
            (val) => val?.toString().length === 10
          )
          .required("Required"),
        division: yup.string().required("Required"),
        zila: yup.string().required("Required"),
        zip_code: yup
          .number()
          .typeError("Mobile No. must be a number")
          .test(
            "len",
            "Mobile No must be 11 characters",
            (val) => val?.toString().length === 4
          )
          .required("Required"),
      })
    ),
    mode: "onSubmit",
    reValidateMode: "onBlur",
  });
  const onSubmit = async (values: ContactVerificationFormValues) => {
    // values.dateOfBirth = format(parseJSON(values.dateOfBirth), "MM/dd/yyyy");
    const { email, address, mobileNo, division, zila, zip_code } = values;
    // setValues({ ...verificationValues ? , email, address, mobileNo });
    setValues({
      ...verificationValues!,
      email,
      address,
      mobileNo,
      division,
      zila,
      zip_code,
    });
    setStep(step + 1);
  };
  return (
    <div className="pb-3 px-2 md:px-0 mt-10">
      <main className="bg-white max-w-full mx-auto p-4 md:p-8 my-5 rounded-lg shadow-2xl">
        <section>
          <h3 className="font-bold text-2xl">Contact Information</h3>
        </section>
        <form className="mt-10" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex px-4">
            <InputTextField
              halfWidth
              defaultValue={
                verificationValues?.email
                  ? verificationValues?.email
                  : userData
                  ? userData.email
                  : ""
              }
              name="email"
              label="Your Email"
              error={errors.email?.message}
              placeholder="youremail@email.com"
              register={register}
            />

            <InputTextField
              defaultValue={verificationValues?.mobileNo}
              name="mobileNo"
              halfWidth
              label="Your Mobile No."
              error={errors.mobileNo?.message}
              register={register}
              placeholder="i.e. 017XXXXXXXX"
            />
          </div>
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
              options={createZilaTypes()}
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

export default Contact;
