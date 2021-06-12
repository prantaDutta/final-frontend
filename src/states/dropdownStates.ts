import { atom } from 'recoil'

// User Page States
export const userLoansPageState = atom<'failed' | 'processing' | 'ongoing' | 'finished' | 'all'>({
  key: 'userLoansPageState',
  default: 'all'
})

export const userInstallmentsPageState = atom<'due' | 'unpaid' | 'paid' | 'all'>({
  key: 'userInstallmentsPageState',
  default: 'all'
})

export const userDepositsStatusPageState = atom<'Pending' | 'Completed' | 'Failed' | 'Canceled' | 'all'>({
  key: 'userTransactionsStatusPageState',
  default: 'all'
})

export const userWithdrawalsStatusPageState = atom<'Pending' | 'Completed' | 'Failed' | 'Canceled' | 'all'>({
  key: 'userWithdrawalsStatusPageState',
  default: 'all'
})

// Admin Page States
export const adminUsersPageState = atom<'pending' | 'verified' | 'unverified' | 'all'>({
  key: 'adminUsersPageState',
  default: 'pending'
})

export const adminInstallmentsPageState = atom<'due' | 'unpaid' | 'paid' | 'all'>({
  key: 'adminInstallmentsPageState',
  default: 'all'
})

export const adminLoansPageState = atom<'failed' | 'processing' | 'ongoing' | 'finished' | 'all'>({
  key: 'adminLoansPageState',
  default: 'failed'
})

export const adminTransactionsTypePageState = atom<'deposit' | 'withdraw' | 'all'>({
  key: 'adminTransactionsTypePageState',
  default: 'withdraw'
})

export const adminTransactionsStatusPageState = atom<'Pending' | 'Completed' | 'Failed' | 'Canceled' | 'all'>({
  key: 'adminTransactionsStatusPageState',
  default: 'all'
})
