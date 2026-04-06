import React from "react";
import { Box as MuiBox, BoxProps } from "@mui/material";

const Box = ({ className, children, ...props }: BoxProps) => {
  return (
    <MuiBox className={className} {...props}>
      {children}
    </MuiBox>
  );
};

export default Box;
