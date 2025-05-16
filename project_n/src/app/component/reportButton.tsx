interface prop {
    userId: number
    productId : number
    onClick: () => void
}

const ReportButton = (prop:prop) => {
  return (
    <>
        <button
        onClick={prop.onClick}
        className="text-white font-semibold rounded-lg px-4 py-2 bg-red-500 hover:bg-red-600"
        >รายงาน
        </button>
    </>
  )
}

export default ReportButton