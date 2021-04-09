import { atom } from "recoil";
import { PenaltyData } from "../utils/randomTypes";

export const personalExpand = atom<boolean>({
  key: "personal-expand",
  default: true,
});

export const accountExpand = atom<boolean>({
  key: "account-expand",
  default: false,
});

export const securityExpand = atom<boolean>({
  key: "security-expand",
  default: false,
});

export const administrationExpand = atom<boolean>({
  key: "administration-expand",
  default: false,
});

export const penaltyDataStates = atom<PenaltyData[] | null>({
  key: "penalty-data",
  default: null,
});

export const loanPreferenceExpand = atom<boolean>({
  key: "loan-preference-expand",
  default: false,
});