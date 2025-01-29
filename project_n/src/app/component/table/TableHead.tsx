import React from "react"

interface prop{
    
    className?: string
    children: React.ReactNode
}

export default function TableHead({children,className}:prop) {
  return (
    <th className={className}>{children}</th>
  )
}