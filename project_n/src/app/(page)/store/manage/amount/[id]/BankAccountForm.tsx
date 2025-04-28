'use client';


interface BankAccountFormProps {
  formData: {
    accountNumber: string;
    accountName: string;
    bankName: string;
  };
  onChange: (name: string, value: string) => void;
}

export default function BankAccountForm({ formData, onChange }: BankAccountFormProps) {
  return (
    <div className="grid gap-4 py-4">
      <div className="grid gap-2">
        <label htmlFor="accountNumber" className="text-left">
          เลขบัญชี
        </label>
        <input
          id="accountNumber"
          className="px-4 py-2 rounded-md"
          value={formData.accountNumber}
          onChange={(e) => onChange('accountNumber', e.target.value)}
          placeholder="กรุณากรอกเลขบัญชี"
        />
      </div>
      
      <div className="grid gap-2">
        <label htmlFor="accountName" className="text-left">
          ชื่อเจ้าของบัญชี
        </label>
        <input
          id="accountName"
          className="px-4 py-2 rounded-md"

          value={formData.accountName}
          onChange={(e) => onChange('accountName', e.target.value)}
          placeholder="กรุณากรอกชื่อเจ้าของบัญชี"
        />
      </div>
      
      <div className="grid gap-2">
        <label htmlFor="bankName" className="text-left">
          ชื่อธนาคาร
        </label>
        <input
          id="bankName"
          className="px-4 py-2 rounded-md"

          value={formData.bankName}
          onChange={(e) => onChange('bankName', e.target.value)}
          placeholder="กรุณากรอกชื่อธนาคาร"
        />
      </div>
    </div>
  );
}