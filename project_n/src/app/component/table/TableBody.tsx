import React from "react"

interface prop{
    className?: string
    children: React.ReactNode
}

export default function TableBody({children,className}:prop) {
  return (
    <tbody className={className}>{children}</tbody>
  )
}