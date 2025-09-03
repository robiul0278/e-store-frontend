'use client';

import { useState, useEffect } from "react";
import Image from "next/image";

type ImageUploadProps = {
  value: File[];
  onChange: (files: File[]) => void;
};

export default function ImageUpload({ onChange, value }: ImageUploadProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [preview, setPreview] = useState<string[]>([]);

  // Sync with parent value
  useEffect(() => {
    if (value) {
      setFiles(value);
      setPreview(value.map((file) => URL.createObjectURL(file)));
    }
  }, [value]);

  // Cleanup object URLs
  useEffect(() => {
    return () => {
      preview.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [preview]);

  // Handle new files
  const handleFiles = (newFiles: File[]) => {
    const allFiles = [...files, ...newFiles];
    setFiles(allFiles);
    setPreview(allFiles.map((file) => URL.createObjectURL(file)));
    onChange(allFiles); // ✅ File[] send
  };

  // Remove file
  const removeFile = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    setPreview(updatedFiles.map((file) => URL.createObjectURL(file)));
    onChange(updatedFiles); // ✅ File[] send
  };

  return (
    <div>
      <label className="block text-sm font-medium mb-1">Photos</label>
      <div
        className="flex flex-col items-center justify-center w-full h-32 px-4 py-6 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:border-primary hover:bg-gray-50 transition"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          const droppedFiles = Array.from(e.dataTransfer.files).filter((file) =>
            file.type.startsWith("image/")
          );
          handleFiles(droppedFiles);
        }}
        onClick={() => document.getElementById("fileInput")?.click()}
      >
        <svg
          className="w-8 h-8 text-gray-400 mb-2"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 12v6m0-6l-3 3m3-3l3 3m0-6V6m0 0l-3-3m3 3l3-3"
          />
        </svg>
        <span className="text-gray-500">Click or drag photos here</span>
      </div>

      <input
        type="file"
        id="fileInput"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => {
          if (!e.target.files) return;
          const selectedFiles = Array.from(e.target.files);
          handleFiles(selectedFiles);
        }}
      />

      <div className="grid grid-cols-2 md:grid-cols-6 gap-2 mt-2">
        {preview.map((src, idx) => (
          <div
            key={idx}
            className="relative w-24 h-24 md:w-28 md:h-28" // fixed width & height
          >
            <Image
              src={src}
              alt="Preview"
              fill
              className="rounded-md object-cover border"
            />
            <button
              type="button"
              onClick={() => removeFile(idx)}
              className="absolute -top-1 -right-1 bg-red-500 text-white w-5 h-5 rounded-full text-xs flex items-center justify-center hover:bg-red-600"
            >
              ×
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}
