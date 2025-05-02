'use client';
import { useState } from 'react';
import bankList from "@/json/bankList";
import Image from 'next/image';

interface BankAccountFormProps {
  formData: {
    accountNumber: string;
    accountName: string;
    bankName: string;
  };
  onChange: (name: string, value: string) => void;
}

export default function BankAccountForm({ formData, onChange }: BankAccountFormProps) {
  const [showBankDropdown, setShowBankDropdown] = useState(false);

  const handleBankSelect = (bankName: string) => {
    onChange('bankName', bankName);
    setShowBankDropdown(false);
  };

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
        
        <div className="relative">
          {/* Bank selection button */}
          <button
            type="button"
            className="w-full flex items-center justify-between px-4 py-2 rounded-md bg-white border border-gray-300"
            onClick={() => setShowBankDropdown(!showBankDropdown)}
          >
            {formData.bankName ? (
              <span>{formData.bankName}</span>
            ) : (
              <span className="text-gray-400">กรุณาเลือกธนาคาร</span>
            )}
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="m6 9 6 6 6-6"/>
            </svg>
          </button>

          {/* Bank dropdown list */}
          {showBankDropdown && (
            <div className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg max-h-60 overflow-auto">
              <ul className="py-1">
                {bankList.map((bank, index) => (
                  <li 
                    key={index}
                    className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleBankSelect(bank.engName)}
                  >
                    {bank.logo && (
                      <div className="w-8 h-8 mr-3 flex-shrink-0">
                        <img 
                          src={bank.logo} 
                          alt={bank.thName} 
                          className="w-full h-full object-contain"
                        />
                      </div>
                    )}
                    <div>
                      <p className="font-medium">{bank.thName}</p>
                      <p className="text-sm text-gray-500">{bank.engName}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}