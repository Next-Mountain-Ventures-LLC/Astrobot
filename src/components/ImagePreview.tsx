'use client';

import { useState, useRef } from "react";

interface ImagePreviewProps {
  src: string;
  alt: string;
  className?: string;
}

export function ImagePreview({ src, alt, className = "" }: ImagePreviewProps) {
  const [showPreview, setShowPreview] = useState(false);
  const [previewPos, setPreviewPos] = useState({ x: 0, y: 0 });
  const imgRef = useRef<HTMLImageElement>(null);

  const handleMouseEnter = () => {
    setShowPreview(true);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLImageElement>) => {
    if (!imgRef.current) return;

    const rect = imgRef.current.getBoundingClientRect();
    const x = e.clientX + 10;
    const y = e.clientY - 50;

    setPreviewPos({ x, y });
  };

  const handleMouseLeave = () => {
    setShowPreview(false);
  };

  return (
    <>
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className={`${className} cursor-zoom-in hover:opacity-80 transition-opacity`}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      />

      {showPreview && (
        <div
          className="fixed z-50 pointer-events-none"
          style={{
            left: `${previewPos.x}px`,
            top: `${previewPos.y}px`,
          }}
        >
          <div className="bg-white rounded-lg shadow-2xl overflow-hidden border border-border/40">
            <img
              src={src}
              alt={alt}
              className="w-80 h-auto object-cover rounded-lg"
              loading="lazy"
            />
          </div>
        </div>
      )}
    </>
  );
}
