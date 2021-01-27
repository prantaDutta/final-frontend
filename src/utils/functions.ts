import axios from "axios";
import crypto from "crypto";
import dayjs from "dayjs";
import FileSaver from "file-saver";
import { IncomingMessage, ServerResponse } from "http";
import { verify } from "jsonwebtoken";
import { useRouter } from "next/router";
import { ACCESS_TOKEN_SECRET, AUTH_TOKEN_NAME, BASE_URL } from "./constants";

export const verifyJWTToken = (accessToken: string) => {
  try {
    var decoded = verify(accessToken, ACCESS_TOKEN_SECRET);
    return decoded;
  } catch (err) {
    return err;
  }
};

export function random32BitString() {
  return crypto.randomFillSync(Buffer.alloc(32)).toString("hex");
}

export const checkingIfAuthenticated = async (cookie: string) => {
  let token = cookie.slice(`${AUTH_TOKEN_NAME}`.length + 1);
  const tokenData = verifyJWTToken(token);
  const { data } = await axios.post("/api/fetch-user-by-id", {
    userId: tokenData.userId,
  });
  return data;
};

export const redirectToLogin = (
  req: IncomingMessage | undefined,
  res: ServerResponse | undefined
) => {
  if (!req) {
    //  On client
    const router = useRouter();
    return router.replace("/login");
  } else if (req) {
    // On Server
    res?.writeHead(302, {
      Location: `${BASE_URL}/login`,
    });
    return res?.end();
  }
};

export const redirectToErrorPage = (
  req: IncomingMessage | undefined,
  res: ServerResponse | undefined
) => {
  if (!req) {
    //  On client
    const router = useRouter();
    return router.replace("/404");
  } else if (req) {
    // On Server
    res?.writeHead(302, {
      Location: `${BASE_URL}/404`,
    });
    return res?.end();
  }
};

export const downloadImage = (url: string, name: string) =>
  FileSaver.saveAs(url, name);

export const formatDate = (date: Date, formatter: string) =>
  dayjs(date).format(formatter);

export const eighteenYearsBackFromNow = (formatter: string) =>
  dayjs().subtract(18, "year").format(formatter);

export const objectToArray = (obj: Record<any, any>) =>
  Object.keys(obj).map((key) => [key, obj[key]]);

export const isEmptyObj = (obj: Record<any, any>) =>
  Object.keys(obj).length === 0;

export const isObject = (obj: any) =>
  obj != null && obj.constructor.name === "Object";

export const isServer = () => typeof window === "undefined";

export const validateEmail = (email: string) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const filesToObject = (files: [File]) => {
  const fileLists = Array.from(files);
  return { ...fileLists };
};

export const fileToObject = (file: File) => {
  var fileData = {
    modified: file.lastModified,
    name: file.name,
    size: file.size,
    type: file.type,
  };
  return fileData;
};

// export function formDataToObject(object: Object) {
//   const formData = new FormData();
//   Object.keys(object).forEach((key) => formData.append(key, object[key]));
//   return formData;
// }

export const appendingFileToFormData = (
  name: string,
  files: [File][],
  formData: FormData
) => {
  for (let i = 0; i < files.length; i++) {
    formData.append(name, (files as any)[i]);
  }
  return formData;
};

export const appendingFieldsToFormData = (
  key: string,
  value: any,
  formData: FormData
) => {
  formData.append(key, value);
  return formData;
};

export const calculateMonthlyInstallment = (
  amount: number,
  interestRate: number,
  loanDuration: number
) => (+amount + +(amount * (interestRate / 100) * loanDuration)) / loanDuration;

export const formatTwoDecimalPlaces = (num: number) =>
  +(Math.round(num * 100) / 100).toFixed(2);

export const capitalize = (s: string) => {
  return s.toLowerCase().replace(/\b./g, function (a) {
    return a.toUpperCase();
  });
};
