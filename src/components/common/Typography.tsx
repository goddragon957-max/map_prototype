import React from "react";

import { cn } from "@/lib/utils";

type TypographyVariant = "body1" | "body2" | "h1" | "h2" | "h3";
type TypographyWeight = "regular" | "semibold" | "bold";

interface Props extends React.HTMLAttributes<HTMLElement> {
  component?: React.ElementType;
  variant?: TypographyVariant;
  weight?: TypographyWeight;
  sx?: React.CSSProperties;
}

const variantTagMap: Record<TypographyVariant, React.ElementType> = {
  body1: "p",
  body2: "p",
  h1: "h1",
  h2: "h2",
  h3: "h3",
};

const variantClassMap: Record<TypographyVariant, string> = {
  body1: "text-base",
  body2: "text-sm",
  h1: "text-4xl font-bold tracking-tight",
  h2: "text-2xl font-bold tracking-tight",
  h3: "text-xl font-semibold tracking-tight",
};

const weightClassMap: Record<TypographyWeight, string> = {
  regular: "font-normal",
  semibold: "font-semibold",
  bold: "font-bold",
};

const Typography = ({
  component,
  variant = "body1",
  weight = "regular",
  className,
  sx,
  style,
  ...props
}: Props) => {
  const Component = component ?? variantTagMap[variant];

  return (
    <Component
      className={cn(variantClassMap[variant], weightClassMap[weight], className)}
      style={{ ...sx, ...style }}
      {...props}
    />
  );
};

export default Typography;
