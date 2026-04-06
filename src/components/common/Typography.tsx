import React from "react";
import { Typography as MuiTypography, TypographyProps } from "@mui/material";

interface Props extends TypographyProps {
  weight?: "regular" | "semibold" | "bold";
}

const Typography = ({ variant = "body1", weight = "regular", sx, children, ...props }: Props) => {
  const fontWeightMap = {
    regular: 400,
    semibold: 600,
    bold: 700,
  };

  return (
    <MuiTypography
      variant={variant}
      sx={{
        fontWeight: fontWeightMap[weight],
        ...sx,
      }}
      {...props}
    >
      {children}
    </MuiTypography>
  );
};

export default Typography;
