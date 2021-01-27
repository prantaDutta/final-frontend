import axios from "axios";
import { logout } from "./auth";
import { isServer } from "./constants";
import { useRouter } from "next/router";

export const laravelApi = (nonApiRoute = false) => {
  const api = axios.create({
    baseURL: `http://localhost:8000${nonApiRoute ? "" : "/api"}`,
    withCredentials: true,
    // headers: {
    //     'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    // }
  });
  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error?.response?.status === 401) {
        await logout();
        if (!isServer) {
          const router = useRouter();
          return router.push("/login");
        }

        return Promise.reject({ status: 401, errors: ["Unauthorized"] });
      }

      if (error?.response?.status === 422) {
        let errors = Object?.values(error?.response?.data?.errors || {});

        return Promise?.reject({
          status: 422,
          errorsRaw: errors,
          errors: errors.reduce((error) => error),
        });
      }

      console.error(error);

      return Promise?.reject({
        status: error?.response?.status,
        errors: ["Oops!"],
      });
    }
  );
  return api;
};
