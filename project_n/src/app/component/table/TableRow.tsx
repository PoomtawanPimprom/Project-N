interface prop{
    children: React.ReactNode;
    className?: string;

}

export default function TableRow({children,className}:prop) {
  return (
    <tr className={className}>{children}</tr>
  )
}