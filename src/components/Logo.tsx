
import { Building2 } from "lucide-react";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "white";
};

const Logo = ({ className, size = "md", variant = "default" }: LogoProps) => {
  const sizeClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl"
  };

  const colorClasses = {
    default: "text-hostel-600",
    white: "text-white"
  };

  return (
    <div className={cn("flex items-center gap-2 font-semibold", sizeClasses[size], colorClasses[variant], className)}>
      <Building2 className="stroke-current" />
      <span>HostelHub</span>
    </div>
  );
};

export default Logo;
