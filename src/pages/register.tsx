import { ThreeDots } from "@agney/react-loading";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { withIronSession } from "next-iron-session";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import Layout from "../components/layouts/Layout";
import InputPasswordField from "../components/ReactHookForm/InputPasswordField";
import InputSelectField from "../components/ReactHookForm/InputSelectField";
import InputTextField from "../components/ReactHookForm/InputTextField";
import ReactLoader from "../components/shared/ReactLoader";
import { authStatus } from "../states/authStates";
import { authenticatedUserData } from "../states/userStates";
import { laravelApi } from "../utils/api";
import { isProduction, NEXT_IRON_SESSION_CONFIG } from "../utils/constants";
import { UserRole } from "../utils/constantsArray";
import { redirectToPage } from "../utils/functions";
import { ModifiedUserData, RegisterFormValues } from "../utils/randomTypes";
import { notify } from "../utils/toasts";
import { registerValidationSchema } from "../validations/RegisterFormValiadtion";

interface registerProps {
  user: ModifiedUserData;
}

const Register: React.FC<registerProps> = ({ user }) => {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    errors,
    setError,
  } = useForm<RegisterFormValues>({
    resolver: yupResolver(registerValidationSchema),
    mode: "onBlur",
    reValidateMode: "onBlur",
  });
  const router = useRouter();
  const [, toggleAuth] = useRecoilState(authStatus);
  const [, setUserData] = useRecoilState(authenticatedUserData);

  const onSubmit = async (values: RegisterFormValues) => {
    setSubmitting(true);

    await laravelApi(true).get("/sanctum/csrf-cookie");
    try {
      const {
        data: { data },
      } = await laravelApi().post("/register", values);
      if (!isProduction) console.log(data);
      toggleAuth(true);
      setUserData(data);
      await axios.post("/api/set-user-cookie", { data: data });
      notify(`Welcome, ${data.name}`, {
        type: "success",
      });
      await router.push("/verify");
    } catch (e) {
      if (!isProduction) console.log(e.response);
      notify("Something Went Wrong, Please Try Again", {
        type: "error",
      });
      setError("name", {
        type: "manual",
        message: "Something Went Wrong, Please Try Again",
      });
    }

    setSubmitting(false);
  };

  return (
    <Layout data={user}>
      <div className="pb-3 px-2 md:px-0">
        <main className="bg-white max-w-lg mx-auto p-4 md:p-8 my-5 rounded-lg shadow-2xl">
          <section>
            <h3 className="font-bold text-2xl">Welcome to GrayScale</h3>
            <p className="text-gray-600 pt-2">Create Your Account</p>
          </section>

          <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
            <InputTextField
              name="name"
              label="Full Name"
              error={errors.name?.message}
              placeholder="John Doe"
              register={register}
            />

            <InputTextField
              type="email"
              name="email"
              label="Email Address"
              error={errors.email?.message}
              placeholder="youremail@email.com"
              register={register}
            />

            <InputSelectField
              name="role"
              label="You Are a"
              error={errors.role?.message}
              options={UserRole}
              register={register}
            />

            <InputPasswordField
              name="password"
              label="Password"
              error={errors.password?.message}
              placeholder="Enter Your Password"
              register={register}
            />

            <InputPasswordField
              name="password_confirmation"
              label="Password"
              error={errors.password_confirmation?.message}
              placeholder="Confirm Your Password"
              register={register}
            />

            <div className="mt-6">
              <button
                className="bg-primary text-gray-100 p-3 w-full rounded-full tracking-wide
                                font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-primaryAccent
                                shadow-lg transition-css"
              >
                {submitting ? (
                  <ReactLoader component={<ThreeDots width="50" />} />
                ) : (
                  "Register"
                )}
              </button>
            </div>
          </form>

          <div className="mt-6 text-sm font-display font-semibold text-gray-700 text-center">
            Already have an account ?{" "}
            <Link href={`/login`}>
              <a className="cursor-pointer text-primary hover:text-primaryAccent">
                Log In
              </a>
            </Link>
          </div>
        </main>
      </div>
    </Layout>
  );
};

export const getServerSideProps = withIronSession(async ({ req, res }) => {
  const user = req.session.get("user");
  if (user) {
    // return { props: {} };
    await redirectToPage(req, res, "/dashboard");
  }

  return {
    props: {},
  };
}, NEXT_IRON_SESSION_CONFIG);

export default Register;
