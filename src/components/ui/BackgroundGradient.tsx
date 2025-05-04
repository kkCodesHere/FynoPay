import React from 'react';
import { cn } from "../../lib/utils";

interface BackgroundGradientProps extends React.HTMLAttributes<HTMLDivElement> {
  gradientClassName?: string;
}

export const BackgroundGradient: React.FC<BackgroundGradientProps> = ({
  className,
  gradientClassName,
  children,
  ...props
}) => {
  return (
    <div
      className={cn(
        "relative group/gradient",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "absolute transition-all duration-500 opacity-0 group-hover/gradient:opacity-100",
          "inset-0 rounded-[inherit] z-[1] blur-xl",
          "bg-gradient-to-r from-primary/50 via-indigo-500/50 to-purple-500/50",
          "group-hover/gradient:blur-2xl",
          gradientClassName
        )}
        aria-hidden="true"
      />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default BackgroundGradient; 