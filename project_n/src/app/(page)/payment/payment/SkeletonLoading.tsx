import { Skeleton } from "@/app/components/ui/skeleton";
import { CreditCard } from "lucide-react";

export default function SkeletonLoading() {
  return (
    <div>
      <Skeleton className="h-[400px] w-[400px] rounded-xl" />
    </div>
  );
}
