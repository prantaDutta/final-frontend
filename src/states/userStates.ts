import { atom } from 'recoil'
import { ModifiedUserData } from '../utils/randomTypes'

export const authenticatedUserData = atom<ModifiedUserData | null>({
  key: 'user-data',
  default: null
})

export const shouldNotify = atom<boolean>({
  key: 'should-notify',
  default: false
})
