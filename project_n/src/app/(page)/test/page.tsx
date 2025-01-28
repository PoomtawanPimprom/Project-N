export default function testpage() {
  return (
    <div className="p-4 ">
      <div className="bg-background dark:bg-black-soft p-4">
        <h1 className="text-title">หัวข้อหลัก</h1>
        <h2 className="text-subtitle">หัวข้อรอง</h2>
        <p className="text-description">ข้อความอธิบายรายละเอียด</p>

        <button className="button-primary">ปุ่มยืนยัน</button>
        <button className="button-cancel">ปุ่มยกเลิก</button>
        <button className="button-disabled" disabled>
          ปุ่มปิดการใช้งาน
        </button>

        <div className="bg-surface border-primary p-4 mt-4">
          <p className="text-primary">พื้นผิวพร้อมเส้นขอบ</p>
        </div>
      </div>
    </div>
  );
}
