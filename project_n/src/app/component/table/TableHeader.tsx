

interface prop{
    children: React.ReactNode;
    className?: string;

}

export default function TableHeader({children,className}:prop) {
  return (
    <thead className={className}>{children}</thead>
  )
}