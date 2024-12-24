import { cn } from "@/lib/utils";
import {  ReactNode } from "react";

type formProp = {
  className?: string;
  onSubmit: (e:React.FormEvent) => void;
  children: ReactNode;
};

export default function Form({ children, onSubmit, className }: formProp) {
  return (
    <form
      className={cn("", className)}
      onSubmit={onSubmit}
    >
      {children}
    </form>
  );
}
