import axios from "axios";
import { laravelApi } from "./api";

export const logout = async () => {
  try {
    await axios.post("/api/set-user-cookie");
    await laravelApi().post(`/logout`);
  } catch (e) {
    console.log("Error in Automatic Logging out from auth logout function");
  }
};
