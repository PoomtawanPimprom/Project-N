import { cn } from "@/lib/utils";

type ShowErrorprop = {classname?: string;
  error: string;
};
export default function ShowError({ error,classname }: ShowErrorprop) {
  return (
    <div className={cn(" text-base font-semibold text-red-500",classname)}>
      {error.split(", ").map((item, index) => (
        <p key={index}>{item}</p>
      ))}
    </div>
  );
}
