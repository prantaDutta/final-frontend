import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { object } from "yup";
import yup from "../../lib/yup";
import {
  verificationFormValues,
  verificationStep,
  verificationSubmitting,
} from "../../states/verificationStates";
import { laravelApi } from "../../utils/api";
import { BASE_URL, isProduction } from "../../utils/constants";
import { appendingFileToFormData } from "../../utils/functions";
import { ImagesVerificationFormValues } from "../../utils/randomTypes";
import { notify } from "../../utils/toasts";
import {
  multipleImageValidation,
  singleImageValidation,
} from "../../utils/vaidationSchema";
import InputFileField from "../ReactHookForm/InputFileField";
import NextPreviousButton from "./NextPreviousButton";

interface ImagesProps {}

const Images: React.FC<ImagesProps> = ({}) => {
  const router = useRouter();
  // we just need to re render the page with complete
  const [complete, setComplete] = useState<boolean>(false);
  const [, setStep] = useRecoilState(verificationStep);
  const [, setSubmitting] = useRecoilState(verificationSubmitting);
  const [verificationValues, setValues] = useRecoilState(
    verificationFormValues
  );
  const {
    control,
    handleSubmit,
    errors,
  } = useForm<ImagesVerificationFormValues>({
    resolver: yupResolver(
      object({
        nidOrPassport: singleImageValidation,
        addressProof: singleImageValidation,
        recentPhoto: singleImageValidation,
        bankAccountStatements: multipleImageValidation,
        businessProof: yup.lazy(() => {
          if (verificationValues?.borrowerType === "self") {
            return singleImageValidation;
          } else {
            return yup.mixed().notRequired();
          }
        }),
        salarySlip: yup.lazy(() => {
          if (verificationValues?.borrowerType === "salaried") {
            return singleImageValidation;
          } else {
            return yup.mixed().notRequired();
          }
        }),
        employeeIdCard: yup.lazy(() => {
          if (verificationValues?.borrowerType === "salaried") {
            return singleImageValidation;
          } else {
            return yup.mixed().notRequired();
          }
        }),
      })
    ),
    mode: "onChange",
    reValidateMode: "onChange",
  });
  // the updated value is available on the next render in recoil state
  // That's why we have to use useEffect
  useEffect(() => {}, [complete]);

  const onSubmit = async (values: ImagesVerificationFormValues) => {
    setSubmitting(true);
    setComplete(true);
    const formData = new FormData();
    for (const [key, value] of Object.entries(values)) {
      appendingFileToFormData(key, value, formData);
    }

    try {
      const { data } = await axios(`${BASE_URL}/api/upload-images`, {
        method: "PUT",
        data: formData,
        withCredentials: true,
      });
      console.log("data: ", data);
      await laravelApi(true).get("/sanctum/csrf-cookie");
      const totalVerificationValues = {
        ...verificationValues,
        verificationPhotos: data,
      };
      // printing the values before sending
      if (!isProduction)
        console.log("Verification Values: ", totalVerificationValues);
      try {
        const {
          data: { data },
        } = await laravelApi().post("/user/verify", {
          values: totalVerificationValues,
        });
        if (!isProduction) console.log("data: ", data);
        notify("Your Verification Request is Accepted", {
          type: "success",
        });
        setTimeout(() => setStep(0), 1000);
        setSubmitting(false);
        setValues(null);
        await axios.post("/api/set-login-cookie", { data });
        return router.push("/dashboard");
      } catch (e) {
        console.log(e.response);
        setSubmitting(false);
        notify("Something Went Wrong, Please Try Again", {
          type: "error",
        });
      }
    } catch (e) {
      console.log(e);
    }

    setSubmitting(false);
  };
  return (
    <div className="pb-3 px-2 md:px-0 mt-10">
      <main className="bg-white max-w-full mx-auto p-4 md:p-8 my-5 rounded-lg shadow-2xl">
        <section>
          <h3 className="font-bold text-2xl">Verification Photos</h3>
        </section>
        <form className="mt-5" onSubmit={handleSubmit(onSubmit)}>
          <InputFileField
            name="nidOrPassport"
            label="Your Nid/Passport"
            error={(errors.nidOrPassport as any)?.message}
            control={control}
          />
          <InputFileField
            name="addressProof"
            label="Address Proof"
            error={(errors.addressProof as any)?.message}
            control={control}
          />
          <InputFileField
            name="recentPhoto"
            label="Recent Photo"
            error={(errors.recentPhoto as any)?.message}
            control={control}
          />
          <InputFileField
            name="bankAccountStatements"
            multiple={true}
            label="Bank AccountStatements (At least 3 Months)"
            error={(errors.bankAccountStatements as any)?.message}
            control={control}
          />
          {verificationValues?.borrowerType === "self" && (
            <InputFileField
              name="businessProof"
              label="Business Proof (i.e. Trading License)"
              error={(errors.businessProof as any)?.message}
              control={control}
            />
          )}
          {verificationValues?.borrowerType === "salaried" && (
            <>
              <InputFileField
                name="salarySlip"
                label="Salary Slip"
                error={(errors.salarySlip as any)?.message}
                control={control}
              />
              <InputFileField
                name="employeeIdCard"
                label="Employee Id Card"
                error={(errors.employeeIdCard as any)?.message}
                control={control}
              />
            </>
          )}
          <NextPreviousButton nextDisabled={!errors} />
        </form>
      </main>
    </div>
  );
};

export default Images;
