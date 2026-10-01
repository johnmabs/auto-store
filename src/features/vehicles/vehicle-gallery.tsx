"use client";

import Image from "next/image";
import { useState } from "react";

type VehicleGalleryImage = {
  id: string;
  url: string;
  alt: string | null;
};

type VehicleGalleryProps = {
  images: VehicleGalleryImage[];
  vehicleLabel: string;
};

export function VehicleGallery({ images, vehicleLabel }: VehicleGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (images.length === 0) {
    return (
      <div className="flex aspect-16/10 items-center justify-center rounded-xl bg-neutral-100 text-neutral-400">
        Aucune image
      </div>
    );
  }

  const selectedImage = images[selectedIndex];

  function showPrevious() {
    setSelectedIndex((current) =>
      current === 0 ? images.length - 1 : current - 1,
    );
  }

  function showNext() {
    setSelectedIndex((current) =>
      current === images.length - 1 ? 0 : current + 1,
    );
  }

  return (
    <div>
      <div className="relative aspect-16/10 overflow-hidden rounded-xl bg-neutral-100">
        <Image
          src={selectedImage.url}
          alt={selectedImage.alt ?? vehicleLabel}
          fill
          priority
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover"
        />

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={showPrevious}
              aria-label="Image précédente"
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/60 px-3 py-2 text-white"
            >
              ←
            </button>

            <button
              type="button"
              onClick={showNext}
              aria-label="Image suivante"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/60 px-3 py-2 text-white"
            >
              →
            </button>

            <div className="absolute bottom-3 right-3 rounded-full bg-black/60 px-3 py-1 text-xs text-white">
              {selectedIndex + 1} / {images.length}
            </div>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="mt-4 grid grid-cols-4 gap-3 sm:grid-cols-5">
          {images.map((image, index) => (
            <button
              key={image.id}
              type="button"
              onClick={() => setSelectedIndex(index)}
              aria-label={`Afficher l'image ${index + 1}`}
              className={[
                "relative aspect-4/3 overflow-hidden rounded-lg border-2 bg-neutral-100",
                index === selectedIndex ? "border-black" : "border-transparent",
              ].join(" ")}
            >
              <Image
                src={image.url}
                alt={image.alt ?? vehicleLabel}
                fill
                sizes="160px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
