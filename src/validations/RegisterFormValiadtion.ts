import Yup from "../lib/yup";
import { laravelApi } from "../utils/api";

export const registerValidationSchema = Yup.object({
  name: Yup.string().required("Required"),
  role: Yup.mixed()
    .oneOf(["lender", "borrower"], "Role should be Lender or Borrower")
    .required("Required"),
  email: Yup.string()
    .email("Invalid email")
    .test("Unique Email", "Email already been taken", function (value) {
      return new Promise(async (resolve, _) => {
        try {
          await laravelApi().post("/unique-email", {
            email: value,
          });
          resolve(false);
        } catch (e) {
          resolve(true);
        }
      });
    })
    .required("Required"),
  password: Yup.string()
    .min(6, "Password should be at least six letters")
    .required("Required"),
  password_confirmation: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Required"),
});
