
'use client';

import { useState } from 'react';

type AppImageProps = {
  src?: string | null;
  aspect: 'landscape' | 'portrait';
  alt?: string;
  className?: string;
};

const AppImage = ({
  src,
  aspect,
  alt = 'Image unavailable',
  className = '',
}: AppImageProps) => {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);

  const fallbackSrc =
    aspect === 'landscape'
      ? '/img/movie-landscape.jpg'
      : '/img/movie-portrait.jpg';

  const imageSrc =
    !src || !src.trim() || failedSrc === src
      ? fallbackSrc
      : src;

  return (
    <img
      src={imageSrc}
      alt={alt}
      onError={() => {
        if (src && failedSrc !== src) {
          setFailedSrc(src);
        }
      }}
      className={className}
    />
  );
};

export default AppImage;
