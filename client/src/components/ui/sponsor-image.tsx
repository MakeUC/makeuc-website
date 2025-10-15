import Image from "next/image";
import { ComponentProps } from "react";

import type { ImageProps } from "next/image";


type SponsorImageProps = Omit<ImageProps, "src"> & {
  src: ImageProps["src"] | React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
};

/**
 * Component to display sponsor images and SVGs at a consistent height.
 * Note: SVGs must have a proper viewBox attribute to scale correctly.
 * If an SVG is not scaling properly, check its source file and ensure it has a viewBox.
 * If it doesn't, take the values from height and width attributes and convert them to a viewBox.
 * Example: viewBox="0 0 [width] [height]"
 * Remove the old height and width attributes after adding the viewBox.
 */
export function SponsorImage({ src, alt, height = 80, width, style, ...props }: SponsorImageProps) {
  if (typeof src === "function") {
    const SvgComponent = src;
    return (
      <SvgComponent
        aria-label={alt}
        style={{
          ...style,
          height: `${height}px`,
          width: "auto",
        }}
        {...props as React.SVGProps<SVGSVGElement>}
      />
    );
  }
  return <Image src={src} alt={alt} height={height} width={width} style={{ height: `${height}px`, width: "auto", ...style }} {...props} />;
}