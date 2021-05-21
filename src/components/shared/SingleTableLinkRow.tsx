import Link from 'next/link'
import React from 'react'

interface SingleTableLinkRowProps {
  tdClass?: string
  d0: string
  d1: string
  i: number
  dataIsLink?: boolean
  url: string
}

const SingleTableLinkRow: React.FC<SingleTableLinkRowProps> = ({
  d0,
  d1,
  i,
  url,
  dataIsLink = true,
  tdClass = 'sm:font-semibold border px-0 sm:px-8 py-1 sm:py-3 capitalize'
}) => {
  return (
    <tr className={`${i % 2 !== 0 && 'bg-gray-300'}`}>
      {dataIsLink ? (
        <>
          <td className={tdClass}>{d0}</td>
          <td className={tdClass + ` text-primary`}>
            <Link href={url}>{d1.toString()}</Link>
          </td>
        </>
      ) : (
        <>
          <td className={tdClass + ` text-primary`}>
            <Link href={url}>{d0}</Link>
          </td>
          <td className={tdClass}>{d1.toString()}</td>
        </>
      )}
    </tr>
  )
}

export default SingleTableLinkRow
