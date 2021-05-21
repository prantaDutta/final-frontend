import React from 'react'
import SingleTableImageRow from './SingleTableImageRow'

interface ShowDetailsInATableWithImagesProps {
  title: string
  dataArray: any[][]
  tableClass?: string
  theadRowClass?: string
  tdClass?: string
  linkUrl?: string
  thDataArray?: string[]
}

const ShowDetailsInATableWithImages: React.FC<ShowDetailsInATableWithImagesProps> = ({
  title,
  dataArray,
  thDataArray = ['name', 'data', 'action'],
  tableClass = 'w-3/4 shadow-lg bg-white text-center mt-5 m-auto',
  theadRowClass = 'bg-primary font-semibold border px-8 py-4 text-gray-100',
  tdClass = 'font-semibold border px-8 py-4 capitalize'
}) => {
  return (
    <div className="mt-5">
      <h4 className="text-2xl font-bold text-center">{title}</h4>
      <table className={tableClass}>
        <thead className="bg-gray-400">
          <tr className={theadRowClass}>
            {thDataArray?.map((th, i) => (
              <th key={i} className={tdClass + ` ${i === 2 && 'hidden md:block'}`}>
                {th}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {dataArray.map((d: any, i: number) => {
            return <SingleTableImageRow d0={d[0]} d1={d[1]} i={i} key={i} />
          })}
        </tbody>
      </table>
    </div>
  )
}

export default ShowDetailsInATableWithImages
