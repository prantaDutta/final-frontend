import { linkArray, SelectOptionsTypes } from "./randomTypes";
import zilas from "../../jsons/zilas.json";
import divisions from "../../jsons/divisions.json";
import { capitalize } from "./functions";
import { withdrawalMethodsArray } from "../pages/withdrawals/withdraw";

export const sideBarLinks: linkArray[] = [
  {
    href: "/dashboard",
    label: "Dashboard",
    svgD:
      "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
  },
  {
    href: "/loans",
    label: "Loans",
    svgD:
      "M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01",
  },
  {
    href: "/deposits",
    label: "Deposits",
    svgD: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12",
  },
  {
    href: "/withdrawals",
    label: "Withdrawals",
    svgD: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4",
  },
  {
    href: "/settings",
    label: "Settings",
    svgD:
      "M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4",
  },
  {
    href: "/verify",
    label: "Verification",
    svgD:
      "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4",
  },
  {
    href: "/contact-us",
    label: "Contact Us",
    svgD:
      "M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z",
  },
];

export const adminSidebarLinks: linkArray[] = [
  {
    href: "/admin/dashboard",
    label: "Dashboard",
    svgD:
      "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
  },
  {
    href: "/admin/users",
    label: "Users",
    svgD:
      "M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01",
  },
  {
    href: "/admin/loans",
    label: "Loans",
    svgD:
      "M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01",
  },
  {
    href: "/admin/transactions",
    label: "Transactions",
    svgD: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12",
  },
  {
    href: "/admin/settings",
    label: "Settings",
    svgD:
      "M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4",
  },
  {
    href: "/admin/help",
    label: "Help",
    svgD:
      "M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z",
  },
];

export const UserRole: SelectOptionsTypes[] = [
  {
    value: "lender",
    title: "Lender",
  },
  {
    value: "borrower",
    title: "Borrower",
  },
];

export const Gender: SelectOptionsTypes[] = [
  {
    value: "male",
    title: "Male",
  },
  {
    value: "female",
    title: "Female",
  },
];

export const BorrowerTypes: SelectOptionsTypes[] = [
  {
    value: "salaried",
    title: "Salaried Individual",
  },
  {
    value: "self",
    title: "Self Employed",
  },
];

export const createZilaTypes = (division: string) => {
  division = capitalize(division);
  let division_id: string;
  divisions.map((divisionObj: any) => {
    if (divisionObj.name === division) {
      division_id = divisionObj.id;
    }
  });
  let allZilas: SelectOptionsTypes[] = [];
  zilas.map((singleZila: { name: string }) => {
    if (division_id !== (singleZila as any).division_id) return;
    allZilas.push({
      value: singleZila.name.toLowerCase(),
      title: singleZila.name,
    });
  });
  return allZilas;
};

export const createDivisionsTypes = () => {
  let allDivisions: SelectOptionsTypes[] = [];
  divisions.map((singleDivision: { name: string }) => {
    allDivisions.push({
      value: singleDivision.name.toLowerCase(),
      title: singleDivision.name,
    });
  });
  return allDivisions;
};

export const numberTypes = (min: number, max: number) => {
  let numbersArray: SelectOptionsTypes[] = [];
  for (let i = min; i <= max; i++) {
    numbersArray.push({
      value: i,
      title: i,
    });
  }
  return numbersArray;
};

export const verificationRequestTableHeader = ["Field Name", "Data"];

export const withdrawalMethodsTypes = () => {
  let arr: SelectOptionsTypes[] = [];
  withdrawalMethodsArray.map((method) => {
    arr.push({
      value: method,
      title: capitalize(method),
    });
  });
  return arr;
};
