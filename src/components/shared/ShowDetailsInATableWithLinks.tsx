import React from 'react'
import FlexibleSelectButton from './FlexibleSelectButton'
import SingleTableLinkRow from './SingleTableLinkRow'
import SingleTableRow from './SingleTableRow'

interface ShowDetailsInATableWithLinksProps {
  title: string
  dataArray: any[][]
  tableClass?: string
  theadRowClass?: string
  tdClass?: string
  urlArray?: string[]
  thDataArray?: string[]
  dataIsLink?: boolean
  showSelectButton?: boolean
  // button things
  selectValue?: string
  setSelectValue?: React.Dispatch<any>
  selectArray?: {}[]
}

const ShowDetailsInATableWithLinks: React.FC<ShowDetailsInATableWithLinksProps> = ({
  title,
  dataArray,
  urlArray,
  dataIsLink = true,
  // button start //
  showSelectButton = false,
  selectArray,
  selectValue,
  setSelectValue,
  // button end //
  thDataArray = ['name', 'data'],
  tableClass = 'shadow-lg bg-white text-center mt-5 m-auto table-fixed w-full md:w-3/4',
  theadRowClass = 'bg-primary font-semibold border px-2 md:px-8 py-2 md:py-4 text-gray-100',
  tdClass = 'font-semibold border px-2 md:px-8 py-2 md:py-4 capitalize'
}) => {
  return (
    <div className="my-2 md:my-5">
      <div className={`flex justify-around items-center`}>
        <h4 className="text-xl md:text-2xl font-semibold text-center">{title}</h4>
        {showSelectButton && (
          <FlexibleSelectButton
            selectValue={selectValue as any}
            setSelectValue={setSelectValue as any}
            selectArray={selectArray as any}
          />
        )}
      </div>
      {dataArray.length > 0 ? (
        <table className={tableClass}>
          <thead className="bg-gray-400">
            <tr className={theadRowClass}>
              {thDataArray?.map((th, i) => {
                return (
                  <th key={i} className={tdClass}>
                    {th}
                  </th>
                )
              })}
            </tr>
          </thead>

          <tbody>
            {dataArray.map((d: any, i: number) => {
              if (urlArray && urlArray[i]) {
                return (
                  <SingleTableLinkRow d0={d[0]} d1={d[1]} i={i} key={i} dataIsLink={dataIsLink} url={urlArray[i]} />
                )
              }
              return <SingleTableRow d0={d[0]} d1={d[1]} i={i} key={i} />
            })}
          </tbody>
        </table>
      ) : (
        <div className={`text-center`}>Nothing Found</div>
      )}
    </div>
  )
}

export default ShowDetailsInATableWithLinks
