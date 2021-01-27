import { atom } from "recoil";
import { VerificationFormValues } from "../utils/randomTypes";

export const nextButtonDisabled = atom<boolean>({
  key: "next-disabled",
  default: false,
});

export const verificationStep = atom<number>({
  key: "verificationStep",
  default: 0,
});

export const verificationFormValues = atom<VerificationFormValues | null>({
  key: "verificationStates",
  default: null,
});

export const verificationSubmitting = atom<boolean>({
  key: "verification-state",
  default: false,
});
