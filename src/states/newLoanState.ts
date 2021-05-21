import { atom } from 'recoil'
import { NewLoanFormValues } from '../pages/loans/new-loan'

export interface extendedNewLoanFormValues extends NewLoanFormValues {
  modifiedMonthlyInstallment: number
}

export const newLoanFormValues = atom<extendedNewLoanFormValues | null>({
  key: 'new-loan-form-values',
  default: null
})
