import { atom } from "recoil";

export const lenderList = atom<string[] | number[]>({
  key: "lender-list",
  default: [],
});
