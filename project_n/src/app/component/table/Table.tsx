import React from "react"

interface prop{
    className?: string
    children: React.ReactNode
}

export default function Table({children,className}:prop) {
  return (
    <table className={className}>{children}</table>
  )
}