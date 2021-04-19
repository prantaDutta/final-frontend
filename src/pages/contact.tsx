import { withIronSession } from "next-iron-session";
import React from "react";
import { useForm } from "react-hook-form";
import Layout from "../components/layouts/Layout";
import InputTextField from "../components/ReactHookForm/InputTextField";
import { laravelApi } from "../utils/api";
import { NEXT_IRON_SESSION_CONFIG } from "../utils/constants";
import { validateEmail } from "../utils/functions";
import { ModifiedUserData } from "../utils/randomTypes";
import { notify } from "../utils/toasts";

interface contactProps {
  user: ModifiedUserData;
}

const contact: React.FC<contactProps> = ({ user }) => {
  const { register, handleSubmit, errors } = useForm();
  const submitHandler = async (values: any) => {
    try {
      await laravelApi().post(`/get-help`, { values });
      notify(`We receive your message. We will get back to you`, {
        type: "success",
      });
    } catch (e) {
      console.log(e.response);
      notify(`Something Went Wrong, Please Try Again`, { type: "error" });
    }
  };
  return (
    <Layout data={user}>
      <div className="grid md:grid-cols-2 gap-5 text-gray-600 md:mx-16 mt-6 md:mt-12">
        <div className="hidden md:block text-center">
          <h2 className="text-xl md:text-3xl font-bold tracking-wide">
            Call Us
          </h2>
          <div className="grid grid-cols-2 my-5">
            <div className="text-left mt-5">
              <h4 className="text-xl font-bold tracking-wide">For Support</h4>
              <div className="mt-5 my-2">
                <p className="text-md font-semibold mt-1.5">
                  Call: 018XXXXXXXX
                </p>
                <p className="text-md font-semibold mt-1.5">
                  Email: support@grayscale.com
                </p>
              </div>
            </div>
            <div className="text-left mt-5">
              <h4 className="text-xl font-bold tracking-wide">
                For Complaints
              </h4>
              <div className="mt-5 my-2">
                <p className="text-md font-semibold mt-1.5">
                  Call: 017XXXXXXXX
                </p>
                <p className="text-md font-semibold mt-1.5">
                  Email: complaints@grayscale.com
                </p>
              </div>
            </div>
          </div>
          <h2 className="text-3xl font-bold tracking-wide mt-10">
            Office Address
          </h2>

          <div className="grid grid-cols-2 my-5">
            <div className="text-left mt-5">
              <h4 className="text-xl font-bold tracking-wide">Registered</h4>
              <div className="mt-5 my-2">
                <p className="text-md font-semibold mt-1.5">
                  <span className="block">Guljar Tower</span>
                  <span className="block">Chawkbazar</span>
                  <span className="block">Chattagram 4203</span>
                </p>
              </div>
            </div>
            <div className="text-left mt-5">
              <h4 className="text-xl font-bold tracking-wide">Corporate</h4>
              <div className="mt-5 my-2">
                <p className="text-md font-semibold mt-1.5">
                  <span className="block">CA Building </span>
                  <span className="block">Agarabad C/A</span>
                  <span className="block">Chattagram 4100</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-5 md:mx-0">
          <div>
            <h2 className="text-xl md:text-3xl font-bold tracking-wide text-center">
              Ask A Question Or Give FeedBack
            </h2>
          </div>
          <form
            onSubmit={handleSubmit(submitHandler)}
            className="bg-white max-w-lg mx-auto p-4 md:p-8 my-5 rounded-lg shadow-2xl"
          >
            <InputTextField
              name="name"
              placeholder="Enter Your Name"
              label="Your Name"
              error={errors.name?.type}
              register={register({ required: true })}
            />
            <InputTextField
              name="email"
              placeholder="Enter Your Email"
              label="Your Email"
              error={
                errors.email?.type === "validate"
                  ? "Invalid Email"
                  : errors.email?.type
              }
              register={register({
                required: true,
                validate: (value) => validateEmail(value),
              })}
            />
            <InputTextField
              name="message"
              placeholder="Enter Your Message"
              label="Your Message"
              error={errors.message?.type}
              register={register({ required: true })}
            />
            <button
              className="bg-primary text-gray-100 p-3 w-full rounded-full tracking-wide
                                font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-primaryAccent
                                shadow-lg transition-css mt-4"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export const getServerSideProps = withIronSession(async ({ req }) => {
  const user = req.session.get("user");
  if (!user) {
    return { props: {} };
  }

  return {
    props: { user },
  };
}, NEXT_IRON_SESSION_CONFIG);

export default contact;
