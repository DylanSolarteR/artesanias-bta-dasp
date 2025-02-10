"use client";
import type { ImageProps } from "next/image";
import Image from "next/image";
import type React from "react";
import { useEffect, useState } from "react";
import fallbackImage from "@/app/images/fallback.jpg";

interface ImageFb extends ImageProps {
  fallbackSrc?: string;
}
const ImageFb: React.FC<ImageFb> = ({
  src,
  fallbackSrc = fallbackImage.src,
  ...rest
}) => {
  const [imgSrc, set_imgSrc] = useState(src);

  useEffect(() => {
    set_imgSrc(src);
  }, [src]);

  return (
    <Image
      src={imgSrc}
      onLoad={(result) => {
        if (result.currentTarget.naturalWidth === 0) {
          set_imgSrc(fallbackSrc); // Fallback image
        }
      }}
      onError={() => {
        set_imgSrc(fallbackSrc);
      }}
      placeholder="blur"
      blurDataURL={fallbackSrc}
      {...rest}
    />
  );
};

export default ImageFb;
