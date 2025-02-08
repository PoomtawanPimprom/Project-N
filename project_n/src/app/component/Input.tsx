import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

type InputProp = {
  type: string;
  label?: string;
  name: string;
  error?: { message: string };
  onChange: (value: any) => void;
  value: any;
  placeholder: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  labelClassName?: string;
  inputClassName?: string;
};

export default function Input({
  type,
  label,
  name,
  error,
  onChange,
  value,
  required,
  placeholder,
  disabled,
  className,
  labelClassName,
  inputClassName,
}: InputProp) {
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };
  //check if input is a password and show/hide password icon
  const inputType = type === "password" && showPassword ? "text" : type;

  return (
    <div className={`w-full  ${className}`}>
      {label && (
        <label
          htmlFor={name}
          className={cn(`block text-xl font-bold mb-2`, labelClassName)}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        {type === "textarea" ? (
          <textarea id={name} name={name} value={value} placeholder={placeholder} onChange={onChange} disabled={disabled}
            className={cn(
              ` bg-white dark:bg-black text-black dark:text-white w-96 h-32 p-3 border rounded-md
                outline-none border-gray-500 transition-all duration-200 resize-none
              ${
                disabled ? "bg-gray-100 text-gray-500 cursor-not-allowed" : "bg-white"
              }
              ${
                error ? "border-red-500 hover:border-red-600 focus:ring-2 focus:ring-red-200" : "border-gray-300 hover:border-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              }
              placeholder:text-gray-400
              text-sm
            `,
              inputClassName
            )}
          />
        ) : (
          <input
            id={name}
            name={name}
            type={inputType}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            disabled={disabled}
            className={cn(
              `
              bg-white dark:bg-black
             text-black dark:text-white
              w-96
              p-3
              border
              rounded-md
              outline-none
              border-gray-500
              transition-all
              duration-200
              ${
                disabled
                  ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                  : "bg-white"
              }
              ${
                error
                  ? "border-red-500 hover:border-red-600 focus:ring-2 focus:ring-red-200"
                  : "border-gray-300 hover:border-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              }
              placeholder:text-gray-400
              text-sm
            `,
              inputClassName
            )}
          />
        )}
        {type == "password" && (
          <>
            <button
              type="button"
              onClick={togglePassword}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-900 dark:text-white"
            >
              {showPassword ? (
                <EyeOff size={20} className="text-gray-500" />
              ) : (
                <Eye size={20} className="text-gray-500" />
              )}
            </button>
          </>
        )}
      </div>

      {/* Error message with improved styling */}
      {error?.message && (
        <p className="text-sm text-red-500 mt-1 animate-fade-in">
          {error.message}
        </p>
      )}
    </div>
  );
}
