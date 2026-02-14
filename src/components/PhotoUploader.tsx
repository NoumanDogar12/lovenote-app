"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { uploadPhoto, deletePhoto } from "@/actions/valentines";

interface Photo {
  id: string;
  public_url: string;
  sort_order: number;
}

export default function PhotoUploader({
  valentineId,
  photos: initialPhotos,
}: {
  valentineId: string;
  photos: Photo[];
}) {
  const [photos, setPhotos] = useState<Photo[]>(initialPhotos);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState("");

  const handleUpload = useCallback(
    async (files: FileList | null) => {
      if (!files || files.length === 0) return;
      setError("");

      const remaining = 10 - photos.length;
      if (remaining <= 0) {
        setError("Maximum 10 photos allowed");
        return;
      }

      const filesToUpload = Array.from(files).slice(0, remaining);

      for (const file of filesToUpload) {
        if (file.size > 5 * 1024 * 1024) {
          setError(`${file.name} is too large (max 5MB)`);
          continue;
        }

        if (!file.type.startsWith("image/")) {
          setError(`${file.name} is not an image`);
          continue;
        }

        setUploading(true);
        try {
          const formData = new FormData();
          formData.append("file", file);
          const photo = await uploadPhoto(valentineId, formData);
          setPhotos((prev) => [...prev, photo]);
        } catch (err) {
          setError(err instanceof Error ? err.message : "Upload failed");
        }
        setUploading(false);
      }
    },
    [valentineId, photos.length]
  );

  async function handleDelete(photoId: string) {
    try {
      await deletePhoto(photoId);
      setPhotos((prev) => prev.filter((p) => p.id !== photoId));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed");
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-gray-700">
          Photos ({photos.length}/10)
        </label>
        {photos.length > 0 && (
          <span className="text-xs text-gray-400">
            Drag & drop or click to add
          </span>
        )}
      </div>

      {error && (
        <div className="text-sm text-red-500 bg-red-50 px-3 py-2 rounded-lg">
          {error}
        </div>
      )}

      {/* Photo grid */}
      {photos.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
          {photos
            .sort((a, b) => a.sort_order - b.sort_order)
            .map((photo) => (
              <div key={photo.id} className="relative group aspect-square">
                <Image
                  src={photo.public_url}
                  alt="Valentine photo"
                  fill
                  className="object-cover rounded-xl"
                  sizes="(max-width: 640px) 33vw, 20vw"
                />
                <button
                  onClick={() => handleDelete(photo.id)}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full text-xs opacity-0 group-hover:opacity-100 transition flex items-center justify-center"
                >
                  x
                </button>
              </div>
            ))}
        </div>
      )}

      {/* Upload area */}
      {photos.length < 10 && (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragOver(false);
            handleUpload(e.dataTransfer.files);
          }}
          className={`border-2 border-dashed rounded-xl p-8 text-center transition cursor-pointer ${
            dragOver
              ? "border-rose-400 bg-rose-50"
              : "border-gray-200 hover:border-rose-300 hover:bg-rose-50/50"
          }`}
          onClick={() => {
            const input = document.createElement("input");
            input.type = "file";
            input.multiple = true;
            input.accept = "image/jpeg,image/png,image/webp";
            input.onchange = () => handleUpload(input.files);
            input.click();
          }}
        >
          {uploading ? (
            <div className="flex flex-col items-center gap-2">
              <div className="w-8 h-8 border-3 border-rose-400 border-t-transparent rounded-full animate-spin" />
              <p className="text-sm text-gray-500">Uploading...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <div className="text-3xl">+</div>
              <p className="text-sm text-gray-500">
                Drop photos here or click to browse
              </p>
              <p className="text-xs text-gray-400">
                JPEG, PNG, WebP - Max 5MB each
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
