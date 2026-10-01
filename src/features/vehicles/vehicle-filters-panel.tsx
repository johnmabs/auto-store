"use client";

import { useState } from "react";

type VehicleFiltersPanelProps = {
  children: React.ReactNode;
  activeCount?: number;
};

export function VehicleFiltersPanel({
  children,
  activeCount = 0,
}: VehicleFiltersPanelProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mb-10">
      <div className="mb-4 flex items-center justify-between md:hidden">
        <button
          type="button"
          onClick={() => setOpen((current) => !current)}
          aria-expanded={open}
          aria-controls="vehicle-filters"
          className="rounded-lg border px-4 py-2 text-sm font-medium"
        >
          {open ? "Masquer les filtres" : "Afficher les filtres"}
          {activeCount > 0 && ` (${activeCount})`}
        </button>
      </div>

      <div
        id="vehicle-filters"
        className={[
          "rounded-xl border bg-white p-5",
          open ? "block" : "hidden",
          "md:block",
        ].join(" ")}
      >
        {children}
      </div>
    </div>
  );
}
