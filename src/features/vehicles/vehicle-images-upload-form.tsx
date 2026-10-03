"use client";

import { useActionState } from "react";
import { addVehicleImages, type VehicleImagesState } from "./vehicle.actions";

const initialState: VehicleImagesState = {
  success: false,
};

type VehicleImagesUploadFormProps = {
  vehicleId: string;
};

export function VehicleImagesUploadForm({
  vehicleId,
}: VehicleImagesUploadFormProps) {
  const action = addVehicleImages.bind(null, vehicleId);
  const [state, formAction, pending] = useActionState(action, initialState);

  return (
    <form action={formAction} className="mt-6 rounded-xl border bg-white p-6">
      <label htmlFor="images" className="block text-sm font-medium">
        Ajouter des images
      </label>

      <input
        id="images"
        name="images"
        type="file"
        accept="image/jpeg,image/png,image/webp"
        multiple
        required
        disabled={pending}
        className="mt-2 block w-full text-sm"
      />

      <p className="mt-2 text-xs text-neutral-500">
        JPEG, PNG ou WebP. Maximum 10 images par envoi et 10 Mo par image.
      </p>

      {state.message && (
        <div
          role="status"
          className={[
            "mt-4 rounded-lg border p-3 text-sm",
            state.success
              ? "border-green-200 bg-green-50 text-green-800"
              : "border-red-200 bg-red-50 text-red-700",
          ].join(" ")}
        >
          {state.message}
        </div>
      )}

      <button
        type="submit"
        disabled={pending}
        className="mt-4 rounded-lg bg-black px-4 py-2 text-sm text-white disabled:cursor-not-allowed disabled:opacity-50"
      >
        {pending ? "Envoi en cours..." : "Envoyer les images"}
      </button>
    </form>
  );
}
