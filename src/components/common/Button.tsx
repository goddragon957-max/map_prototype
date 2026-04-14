import React from "react";

import { Button as UIButton } from "@/components/ui/button";

type ButtonVariant = "contained" | "outlined" | "text";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  color?: "primary" | "secondary" | "inherit";
}

const Button = ({
  variant = "contained",
  className,
  color,
  ...props
}: Props) => {
  void color;
  const mappedVariant =
    variant === "outlined" ? "outline" : variant === "text" ? "ghost" : "default";

  return <UIButton variant={mappedVariant} className={className} {...props} />;
};

export default Button;
