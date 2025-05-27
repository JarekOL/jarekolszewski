"use client";

import { useEffect } from "react";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import "photoswipe/style.css";

export default function PhotoSwipeProvider({
  children,
  galleryId = "#gallery",
}: {
  children: React.ReactNode;
  galleryId?: string;
}) {
  useEffect(() => {
    const lightbox = new PhotoSwipeLightbox({
      gallery: galleryId,
      children: "a",
      pswpModule: () => import("photoswipe"),
    });
    lightbox.init();

    return () => lightbox.destroy();
  }, [galleryId]);

  return <>{children}</>;
}
