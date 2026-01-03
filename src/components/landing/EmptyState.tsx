"use client";

import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-16 px-4 text-center",
        className
      )}
    >
      <div className="w-20 h-20 rounded-full bg-[#B7E0E8]/20 flex items-center justify-center mb-6">
        <Icon className="w-10 h-10 text-[#7DA3B8]" />
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground mb-6 max-w-md text-sm md:text-base">
        {description}
      </p>
      {action && (
        <Button onClick={action.onClick} variant="default" size="lg">
          {action.label}
        </Button>
      )}
    </div>
  );
}
