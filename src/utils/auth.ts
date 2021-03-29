import axios from "axios";

export const logout = async () => {
  try {
    await axios.post("/api/set-user-cookie");
    // try {
    //   await laravelApi().post(`/logout`);
    // } catch (e) {
    //   console.log("Error in Automatic Logging out from laravel api auth");
    // }
  } catch (e) {
    console.log("Error in Automatic Logging out from nextjs auth");
  }
};
