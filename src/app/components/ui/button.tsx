import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./utils";

const buttonVariants = cva(
  "ep-button shrink-0 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
  {
    variants: {
      variant: {
        default: "ep-button-primary",
        primary: "ep-button-primary",
        destructive:
          "ep-button bg-destructive text-white border-transparent hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "ep-button-tertiary",
        secondary: "ep-button-secondary",
        tertiary: "ep-button-tertiary",
        ghost: "ep-button-tertiary border-transparent hover:border-transparent",
        link: "ep-button-hyperlink",
        hyperlink: "ep-button-hyperlink",
      },
      size: {
        default: "ep-button-md has-[>svg]:px-3",
        sm: "ep-button-sm gap-1.5 has-[>svg]:px-2.5",
        lg: "ep-button-lg has-[>svg]:px-4",
        icon: "ep-button-icon",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
