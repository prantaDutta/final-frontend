import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue } from "recoil";
import { object } from "yup";
import yup from "../../lib/yup";
import { authenticatedUserData } from "../../states/userStates";
import {
  verificationFormValues,
  verificationStep,
} from "../../states/verificationStates";
import { isProduction } from "../../utils/constants";
import { Gender } from "../../utils/constantsArray";
import { eighteenYearsBackFromNow } from "../../utils/functions";
import { PersonalVerificationFormValues } from "../../utils/randomTypes";
import InputDateField from "../ReactHookForm/InputDateField";
import InputSelectField from "../ReactHookForm/InputSelectField";
import InputTextField from "../ReactHookForm/InputTextField";
import NextPreviousButton from "./NextPreviousButton";

interface PersonalProps {}

const Personal: React.FC<PersonalProps> = ({}) => {
  const [step, setStep] = useRecoilState(verificationStep);
  const userData = useRecoilValue(authenticatedUserData);

  const [verificationValues, setValues] = useRecoilState(
    verificationFormValues
  );
  const {
    register,
    handleSubmit,
    errors,
    control,
  } = useForm<PersonalVerificationFormValues>({
    resolver: yupResolver(
      object({
        id: yup.mixed().notRequired(),
        name: yup.string().required("Required"),
        gender: yup
          .mixed()
          .oneOf(["male", "female"], "Gender should be Male or Female")
          .required("Required"),
        dateOfBirth: yup
          .date()
          .max(
            eighteenYearsBackFromNow("YYYY-MM-DD").toString(),
            "You Must be 18 Years Old"
          )
          .required("Invalid Date"),
      })
    ),
    mode: "onTouched",
    reValidateMode: "onBlur",
  });
  const onSubmit = async (values: PersonalVerificationFormValues) => {
    // values.dateOfBirth = dayjs(values.dateOfBirth).format("DD/MM/YYYY");
    const { name, dateOfBirth, gender } = values;
    setValues({
      ...verificationValues!,
      name,
      dateOfBirth,
      gender,
      id: userData?.id!,
    });
    setStep(step + 1);
  };
  return (
    <div className="pb-3 px-2 md:px-0 mt-10">
      <main className="bg-white max-w-full mx-auto p-4 md:p-8 my-5 rounded-lg shadow-2xl">
        <section>
          <h3 className="font-bold text-2xl">Personal Information</h3>
        </section>
        <form className="mt-10" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex px-4">
            <InputTextField
              name="name"
              defaultValue={
                verificationValues?.name
                  ? verificationValues?.name
                  : userData
                  ? userData.name
                  : ""
              }
              label="Your Full Name"
              error={errors.name?.message}
              placeholder="Enter Your Name"
              register={register}
            />
          </div>
          <div className="flex px-4">
            <InputDateField
              name="dateOfBirth"
              halfWidth
              type="date"
              label="Your Date of Birth"
              error={errors.dateOfBirth?.message}
              control={control}
              defaultValue={
                verificationValues?.dateOfBirth
                  ? verificationValues?.dateOfBirth
                  : isProduction
                  ? (new Date().toString() as any)
                  : eighteenYearsBackFromNow("YYYY-MM-DD").toString()
                // new Date().toString()
              }
            />
            <InputSelectField
              defaultValue={verificationValues?.gender}
              name="gender"
              halfWidth
              label="You Are a"
              error={errors.gender?.message}
              options={Gender}
              register={register}
            />
          </div>
          <NextPreviousButton nextDisabled={errors ? false : true} />
        </form>
      </main>
    </div>
  );
};

export default Personal;
