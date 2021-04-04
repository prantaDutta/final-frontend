import axios from "axios";
import { laravelApi } from "./api";
import {
  changeAuthData,
  changeNewLoanFormValues,
  changeVerificationData,
  toggleAuth,
} from "./changeRecoilState";

export const logout = async () => {
  try {
    toggleAuth(false);
    changeAuthData(null);
    changeVerificationData(null);
    changeNewLoanFormValues(null);
  } catch (e) {
    console.log("Error happened in logout change state function");
  }
  try {
    await axios.post("/api/destroy-user-cookie");
    await laravelApi().post(`/logout`);
  } catch (e) {
    console.log("Error in Automatic Logging out from nextjs auth");
    // console.log("the error", e.response);
  }
};
