import axios from "axios";
import { useRouter } from "next/router";
import { logout } from "./auth";
import {IS_SERVER, LARAVEL_URL} from "./constants";

export const laravelApi = (nonApiRoute = false) => {
  const api = axios.create({
    baseURL: `${LARAVEL_URL}${nonApiRoute ? "" : "/api"}`,
    withCredentials: true,
  });

  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      try {
        if (error.response.status === 401) {
          await axios.post("/api/destroy-user-cookie");
          if (!IS_SERVER) {
            return location.reload();
          } else {
            const router = useRouter();
            return router.reload();
          }

          // return Promise.reject({ status: 401, errors: ["Unauthorized"] });
        }

        // if (error?.response?.status === 422) {
        //   let errors = Object?.values(error?.response?.data?.errors || {});
        //
        //   return Promise?.reject({
        //     status: 422,
        //     errorsRaw: errors,
        //     errors: errors.reduce((error) => error),
        //   });
        // }

        // console.error(error?.response);

        return Promise.reject({
          status: error.response.status,
          errors: ["Oops!"],
          response: error.response,
        });
      } catch (e) {
        await logout();
      }
    }
  );
  return api;
};
