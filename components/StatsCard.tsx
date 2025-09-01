import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  className?: string;
}

export default function StatsCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  trendValue,
  className
}: StatsCardProps) {
  return (
    <div className={cn("transition-all hover:shadow-md", className)}>
      <div className="flex flex-row items-center justify-between space-y-0 pb-2">
        <h1 className="text-sm font-medium">
          {title}
        </h1>
        <Icon className="h-5 w-5 " />
      </div>
      <div>
        <div className="text-2xl font-bold pb-2">{value}</div>
        {description && (
          <p className="text-xs  mt-1">{description}</p>
        )}
        {trend && trendValue && (
          <div className="flex items-center mt-2 text-xs">
            <span className={cn(
              "font-medium",
              trend === "up" ? "text-green-800" :
                trend === "down" ? "text-red-600" : "text-slate-600"
            )}>
              {trendValue}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}