import Yup from "../lib/yup";
import { laravelApi } from "../utils/api";

export const registerValidationSchema = Yup.object({
  name: Yup.string().required("Required"),
  role: Yup.mixed()
    .oneOf(["lender", "borrower"], "Role should be Lender or Borrower")
    .required("Required"),
  email: Yup.string()
    .email("Invalid email")
    .test("Unique Email", "Email already been taken", async function (value) {
      try {
        const res = await laravelApi().post("/unique-email", {
          email: value,
        });
        console.log("res", res);
        if (res.status === 200) return false;
      } catch (e) {}
      return true;
    })
    .required("Required"),
  password: Yup.string()
    .min(6, "Password should be at least six letters")
    .required("Required"),
  password_confirmation: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Required"),
});
