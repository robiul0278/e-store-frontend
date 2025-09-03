'use client';

import { useState, useEffect } from "react";
import Image from "next/image";

type ImageItem = File | string;

type ImageUploadProps = {
  value: ImageItem[];
  onChange: (files: File[]) => void; // parent will get only new files for upload
};

export default function ImageUpload({ onChange, value }: ImageUploadProps) {
  const [items, setItems] = useState<ImageItem[]>([]);

  // sync with parent
  useEffect(() => {
    setItems(value || []);
  }, [value]);

  // handle new files
  const handleFiles = (newFiles: File[]) => {
    const updatedItems = [...items, ...newFiles];
    setItems(updatedItems);
    onChange(updatedItems.filter((i): i is File => i instanceof File)); // send only File[]
  };

  // remove item (File or URL)
  const removeItem = (index: number) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
    onChange(updatedItems.filter((i): i is File => i instanceof File)); // send only File[]
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
          handleFiles(Array.from(e.target.files));
        }}
      />

      <div className="grid grid-cols-2 md:grid-cols-6 gap-2 mt-2">
        {items.map((item, idx) => {
          const src = item instanceof File ? URL.createObjectURL(item) : item;
          return (
            <div key={idx} className="relative w-24 h-24 md:w-28 md:h-28">
              <Image
                src={src}
                alt="Preview"
                fill
                className="rounded-md object-cover border"
              />
              <button
                type="button"
                onClick={() => removeItem(idx)}
                className="absolute -top-1 -right-1 bg-red-500 text-white w-5 h-5 rounded-full text-xs flex items-center justify-center hover:bg-red-600"
              >
                ×
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
