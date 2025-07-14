import React from "react";

import ButterflyLogo from "~/assets/butterfly_logo.svg";


export function Logo({ width = 400, style, ...props }: {
  width?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <ButterflyLogo
      width={width}
      height={width}
      style={{ fill: "var(--logo)", ...style }}
      aria-label="MakeUC Butterfly Logo"
      alt="MakeUC Butterfly Logo"
      {...props}
    />
  );
}
