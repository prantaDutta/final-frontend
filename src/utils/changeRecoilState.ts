import { setRecoilExternalState } from '../SpecialComponents/RecoilExternalStatePortal'
import { authStatus } from '../states/authStates'
import { extendedNewLoanFormValues, newLoanFormValues } from '../states/newLoanState'
import { authenticatedUserData } from '../states/userStates'
import { verificationFormValues } from '../states/verificationStates'
import { ModifiedUserData, VerificationFormValues } from './randomTypes'

export const toggleAuth = (value: boolean) => {
  setRecoilExternalState(authStatus, value)
}

export const changeAuthData = (data: ModifiedUserData | null) => {
  setRecoilExternalState(authenticatedUserData, data)
}

export const changeVerificationData = (data: VerificationFormValues | null) => {
  setRecoilExternalState(verificationFormValues, data)
}

export const changeNewLoanFormValues = (data: extendedNewLoanFormValues | null) => {
  setRecoilExternalState(newLoanFormValues, data)
}
