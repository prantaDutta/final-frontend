import { atom } from "recoil";

export const authStatus = atom<boolean>({
  key: "auth-status",
  default: false,
});
