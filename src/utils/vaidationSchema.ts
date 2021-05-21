import * as Yup from 'yup'
import { SUPPORTED_IMAGE_FILE_SIZE, SUPPORTED_IMAGE_FORMATS } from './constants'

export const singleImageValidation = Yup.array()
  .nullable()
  .required('Please Upload A File')
  .test('fileSize', 'File should be less than 5MB', (files) => checkIfFilesAreTooBig(files as [File]))
  .test('fileFormat', 'Unsupported Format', (files) => checkIfFilesAreCorrectType(files as [File]))

export const multipleImageValidation = Yup.array()
  .nullable()
  .required('Please Upload A File')
  .test('multiple', 'Please Upload atleast three image', (files) => files?.length! > 2)
  .test('fileSize', 'File should be less than 5MB', (files) => checkIfFilesAreTooBig(files as [File]))
  .test('fileFormat', 'Unsupported Format', (files) => checkIfFilesAreCorrectType(files as [File]))

function checkIfFilesAreTooBig(files?: [File]): boolean {
  let valid = true
  if (files) {
    files.map((file) => {
      if (file.size >= SUPPORTED_IMAGE_FILE_SIZE) {
        valid = false
      }
    })
  }
  return valid
}

function checkIfFilesAreCorrectType(files?: [File]): boolean {
  let valid = true
  if (files) {
    files.map((file) => {
      if (!SUPPORTED_IMAGE_FORMATS.includes(file.type)) {
        valid = false
      }
    })
  }
  return valid
}
