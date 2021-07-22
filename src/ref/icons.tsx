import React from "react";
import Svg, { Props as SvgProps } from "react-inlinesvg";

export const Icons = React.forwardRef<SVGElement, SvgProps>((props, ref) => (
  <Svg innerRef={ref} title="icons" {...props} />
));
