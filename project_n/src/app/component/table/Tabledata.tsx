import React from "react"

interface prop{
    className?: string
    children: React.ReactNode
}

export default function TableData({children,className}:prop) {
  return (
    <td className={className}>{children}</td>
  )
}