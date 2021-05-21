import React from 'react'
import { PenaltyData } from '../../utils/randomTypes'
import TableRow from './TableRow'

interface SomeTableProps {
  data: any
}

const SomeTable: React.FC<SomeTableProps> = ({ data }) => {
  return (
    <div className="w-full">
      <table className="table m-4 border-primary border-2 text-center">
        <thead>
          <tr className="w-full border-primaryAccent border">
            <th className="border-primary border-r-2 w-1/2">Day</th>
            <th className="w-1/2">Amount</th>
          </tr>
        </thead>

        <tbody>
          {data &&
            data.map((datum: PenaltyData, i: number) => {
              return <TableRow key={i} amount={datum.amount} day={datum.day} />
            })}
        </tbody>
      </table>
    </div>
  )
}

export default SomeTable
