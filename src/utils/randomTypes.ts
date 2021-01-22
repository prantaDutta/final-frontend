import { NextApiRequest } from "next";
import React from "react";

export type ModifiedUserData = {
  id: number | string;
  name: string;
  role: string;
  email: string;
  verified: string;
};

export type UserAuthValues = {
  id: number | string;
  name: string;
  email: string;
  password?: string;
  role: string;
};

export interface NextApiRequestExtended extends NextApiRequest {
  token: string | null;
}
export interface linkArray {
  href: string;
  label: string;
  svgD?: string;
}
// this is the type definition for react hook form ref
export type RefReturn =
  | string
  | ((instance: HTMLInputElement | null) => void)
  | React.RefObject<HTMLInputElement>
  | null
  | undefined;

export interface LoginFormValues {
  email: string;
  password: string;
}

export interface RegisterFormValues {
  name: string;
  role: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export type SelectOptionsTypes = {
  value: string | number;
  title: string | number;
};

export type VerificationFormValues = {
  // Personal
  id: number | string;
  name: string;
  dateOfBirth: Date;
  gender: string;
  // contact information
  address: string;
  email: string;
  mobileNo: number;
  zila: string;
  zip_code: number;
  division: string;
  // checking salaried individual or self-employed
  borrowerType: string;
  // verificationPhotos
  nidOrPassport: {};
  addressProof: {};
  recentPhoto: {};
  bankAccountStatements: {};
  businessProof: {};
  salarySlip: {};
  employeeIdCard: {};
};

// Verification Types
export type PersonalVerificationFormValues = {
  id: number | string;
  name: string;
  dateOfBirth: Date;
  gender: string;
};

export type ContactVerificationFormValues = {
  address: string;
  email: string;
  mobileNo: number;
  zila: string;
  zip_code: number;
  division: string;
};

export type PapersVerificationFormValues = {
  borrowerType: string;
};

export type ImagesVerificationFormValues = {
  nidOrPassport: Array<[File]>;
  addressProof: Array<[File]>;
  recentPhoto: Array<[File]>;
  bankAccountStatements: Array<[File]>;
  businessProof: Array<[File]>;
  salarySlip: Array<[File]>;
  employeeIdCard: Array<[File]>;
};
