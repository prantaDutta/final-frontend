import React from 'react'

interface DashboardErrorProps {
  statusCode?: number
  ErrorMessage?: string
}

export const DashboardError: React.FC<DashboardErrorProps> = ({
  statusCode = 404,
  ErrorMessage = 'Something Went Wrong'
}) => {
  return (
    <div className="flex justify-center items-center">
      <p className="text-xl font-semibold">Error Code {statusCode}</p>
      <p className="text-xl font-semibold">{ErrorMessage}</p>
    </div>
  )
}
