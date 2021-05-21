import React from 'react'

interface SingleTableRowProps {
  tdClass?: string
  d0: string
  d1: string
  i: number
}

const SingleTableRow: React.FC<SingleTableRowProps> = ({
  d0,
  d1,
  i,
  tdClass = 'font-semibold border px-2 sm:px-8 py-1 sm:py-3 capitalize overflow-hidden overflow-ellipsis'
}) => {
  return (
    <tr className={`${i % 2 !== 0 && 'bg-gray-300'}`}>
      <td className={tdClass}>{d0}</td>
      <td className={tdClass}>{d1 ? d1.toString() : 'N/A'}</td>
    </tr>
  )
}

export default SingleTableRow
