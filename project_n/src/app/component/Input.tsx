import { cn } from "@/lib/utils";

type InputProp = {
  type: string;
  label: string;
  name: string;
  error?: { message: string };
  onChange: (value: any) => void;
  value: string;
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
  inputClassName
}: InputProp) {
  return (
    <div className={`w-full  ${className}`}>
      {label && (
        <label
          htmlFor={name}
          className={cn(`block text-xl font-bold mb-2`,labelClassName)}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="">
        {type === "textarea" ? (
          <textarea
            id={name}
            name={name}
            value={value}
            placeholder={placeholder}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled}
            className={cn(`
              w-96
              h-32
              p-3
              border
              rounded-md
              outline-none
              border-gray-500
              transition-all
              duration-200
              resize-none
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
            `,inputClassName)}
          />
        ) : (
          <input
            id={name}
            name={name}
            type={type}
            value={value}
            placeholder={placeholder}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled}
            className={cn(`
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
            `,inputClassName)}
          />
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
