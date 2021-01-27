import { laravelApi } from "./api";
import axios from "axios";

export const logout = async () => {
  try {
    await laravelApi(true).get("/sanctum/csrf-cookie");
    await laravelApi().post(`/logout`);
    const res = await axios.post("/api/logout");
    console.log("res: ", res);
  } catch (e) {
    console.log(e.response);
  }
};
