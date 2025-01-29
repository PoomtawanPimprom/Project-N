import { cn } from "@/lib/utils";

type submitButton = {
  disabled: boolean;
  label: string;
  labelUploading: string;
  classnameButton?: string;
  onClick?: () => void;
};

export default function SubmitButtton({
  label,
  labelUploading,
  disabled,
  classnameButton,onClick,
}: submitButton) {
  return (
    <button
      type="submit"
      disabled={disabled}
      onClick={onClick}
      className={cn(
        `${
          disabled ?? "bg-primary/50"
        } rounded-xl bg-primary py-2 px-6 font-bold text-white transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed`,
        classnameButton
      )}
    >
      {disabled ? labelUploading : label}
    </button>
  );
}
