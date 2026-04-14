import React from "react";

type ElementType = React.ElementType;

type BoxProps<C extends ElementType = "div"> = {
  component?: C;
  sx?: React.CSSProperties;
} & Omit<React.ComponentPropsWithoutRef<C>, "component">;

const Box = <C extends ElementType = "div">({
  component,
  sx,
  style,
  ...props
}: BoxProps<C>) => {
  const Component = component ?? "div";

  return <Component style={{ ...sx, ...style }} {...props} />;
};

export default Box;
