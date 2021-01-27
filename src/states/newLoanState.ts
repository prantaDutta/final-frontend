import { atom } from "recoil";
import { NewLoanFormValues } from "../pages/current-loans/new-loan";

interface extendedNewLoanFormValues extends NewLoanFormValues {
  modifiedMonthlyInstallment: number;
}

export const newLoanFormValues = atom<extendedNewLoanFormValues | null>({
  key: "new-loan-form-values",
  default: null,
});
