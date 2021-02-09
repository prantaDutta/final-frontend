import { atom } from "recoil";

export const personalExpand = atom<boolean>({
  key: "personal-expand",
  default: false,
});

export const accountExpand = atom<boolean>({
  key: "account-expand",
  default: false,
});

export const securityExpand = atom<boolean>({
  key: "security-expand",
  default: false,
});
