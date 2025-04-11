
import { cn } from "@/lib/utils";
import React from "react";

interface IllustrationProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  children?: React.ReactNode;
}

export const Illustration = React.forwardRef<HTMLDivElement, IllustrationProps>(
  ({ src, alt, children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center justify-center overflow-hidden",
          className
        )}
        {...props}
      >
        {src ? (
          <img
            src={src}
            alt={alt || "Illustration"}
            className="max-w-full h-auto object-contain"
          />
        ) : (
          children
        )}
      </div>
    );
  }
);

Illustration.displayName = "Illustration";

export const IllustrationContainer = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "relative flex items-center justify-center p-6 sm:p-8 md:p-10",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});

IllustrationContainer.displayName = "IllustrationContainer";
