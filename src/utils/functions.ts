import crypto from "crypto";
import dayjs from "dayjs";
import FileSaver from "file-saver";
import { IncomingMessage, ServerResponse } from "http";
// import { verify } from "jsonwebtoken";
import { useRouter } from "next/router";
import { cache } from "swr";
import { logout } from "./auth";
import { BASE_URL } from "./constants";

// export const verifyJWTToken = (accessToken: string) => {
//   try {
//     var decoded = verify(accessToken, ACCESS_TOKEN_SECRET);
//     return decoded;
//   } catch (err) {
//     return err;
//   }
// };

export function random32BitString() {
  return crypto.randomFillSync(Buffer.alloc(32)).toString("hex");
}

// export const checkingIfAuthenticated = async (cookie: string) => {
//   let token = cookie.slice(`${AUTH_TOKEN_NAME}`.length + 1);
//   const tokenData = verifyJWTToken(token);
//   const { data } = await axios.post("/api/fetch-user-by-id", {
//     userId: tokenData.userId,
//   });
//   return data;
// };

// Redirecting to a specific page
export const redirectToPage = async (
  req: IncomingMessage | undefined,
  res: ServerResponse | undefined,
  url: string
) => {
  if (!req) {
    //  On client
    await logout();
    const router = useRouter();
    return router.replace(url);
  } else if (req) {
    // On Server
    try {
      await logout();
      res?.writeHead(302, {
        Location: `${BASE_URL}${url}`,
      });
      return res?.end();
    } catch (e) {
      console.log("Something Happened when redirecting to login");
    }
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

export const capitalize = (s: string) =>
  s.toLowerCase().replace(/\b./g, function (a) {
    return a.toUpperCase();
  });

export const clearSWRCache = async () => {
  cache.clear();
  await new Promise(requestAnimationFrame);
};

export const distributeLenderAmount = (amount: number) => {
  if (!amount || amount > 500) return [];
  const divideBy = amount / 500;
  let arr: number[] = [];
  for (let i = 1; i >= divideBy; i++) {
    arr.push(i * 500);
  }
  return arr;
};

export const getUniqueArray = (array: any[]) => {
  var uniqueArray: any[] = [];

  // Loop through array values
  for (let i = 0; i < array.length; i++) {
    if (uniqueArray.indexOf(array[i]) === -1) {
      uniqueArray.push(array[i]);
    }
  }
  return uniqueArray;
};

export function removeDuplicatesArray(inArray: any[]) {
  var arr = inArray.concat(); // create a clone from inArray so not to change input array
  //create the first cycle of the loop starting from element 0 or n
  for (var i = 0; i < arr.length; ++i) {
    //create the second cycle of the loop from element n+1
    for (var j = i + 1; j < arr.length; ++j) {
      //if the two elements are equal , then they are duplicate
      if (arr[i].value === arr[j].value) {
        arr.splice(j, 1); //remove the duplicated element
      }
      // if (arr[i].selected === arr[j].selected) {
      //   console.log("checking ", arr[i], "and ", arr[j]);
      // }
    }
  }
  return arr;
}
