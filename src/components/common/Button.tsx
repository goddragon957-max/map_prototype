import React from "react";
import { Button as MuiButton, ButtonProps } from "@mui/material";

interface Props extends ButtonProps {
  // Custom variations if needed
}

const Button = ({ variant = "contained", children, className, ...props }: Props) => {
  // Custom logic to handle "ghost" variant via MUI structure
  const isGhost = variant === "text" || className?.includes("ghost");
  
  return (
    <MuiButton
      variant={variant}
      className={className}
      sx={{
        ...(isGhost && {
          bgcolor: "rgba(255, 255, 255, 0.72)",
          backdropFilter: "blur(4px)",
          border: "1px solid rgba(255, 255, 255, 0.74)",
          color: "rgba(31, 41, 64, 0.9)",
          boxShadow: "0 8px 24px rgba(31, 41, 64, 0.08)",
          "&:hover": {
            bgcolor: "rgba(255, 255, 255, 0.86)",
            transform: "translateY(-1px)",
          },
        }),
      }}
      {...props}
    >
      {children}
    </MuiButton>
  );
};

export default Button;
