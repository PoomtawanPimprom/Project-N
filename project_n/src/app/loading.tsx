import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
        <h2 className="text-xl font-semibold text-gray-700">กำลังโหลด...</h2>
      </div>
    </div>
  )
}
