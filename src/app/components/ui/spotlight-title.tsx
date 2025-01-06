import { cn } from "@/lib/utils";
import React from "react";

interface SpotlightTitleProps {
  children: React.ReactNode;
  className?: string;
}

const SpotlightTitle = ({
  children,
  className,
}: SpotlightTitleProps) => {
  return (
    <div className="relative group">
      {/* Spotlight effect */}
      <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-xl bg-gradient-to-r from-yellow-600/50 to-pink-600/50 opacity-0 blur-xl transition duration-1000 group-hover:opacity-100 dark:block dark:from-[#fb923c]/50 dark:via-[#f87171]/50 dark:to-[#a855f7]/50" />
      <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-xl bg-gradient-to-r from-yellow-600/50 to-pink-600/50 opacity-0 blur-xl transition duration-1000 group-hover:opacity-100 dark:block dark:from-[#fb923c]/50 dark:via-[#f87171]/50 dark:to-[#a855f7]/50" />
      
      {/* Title */}
      <h1 className={cn(
        "relative z-10 bg-gradient-to-b from-neutral-200 to-neutral-500 bg-clip-text text-4xl font-bold text-transparent sm:text-7xl",
        className
      )}>
        {children}
      </h1>
    </div>
  );
};

export { SpotlightTitle };
