"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface ImageGalleryProps {
  photos: string[];
  name?: string;
}

export default function ImageGallery({ photos = [], name }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(
    photos?.[0] || null
  );
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  useEffect(() => {
    if (photos?.length) {
      setSelectedImage(photos[0]);
    } else {
      setSelectedImage(null);
    }
  }, [photos]);

  if (!photos || photos.length === 0) {
    return (
      <div className="w-full h-[400px] bg-gray-200 rounded-2xl flex items-center justify-center text-gray-500">
        No Image Available
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Main Image */}
      {selectedImage && (
        <motion.div
          key={selectedImage}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="relative w-full h-[400px] rounded-2xl overflow-hidden shadow cursor-pointer"
          onClick={() => setIsViewerOpen(true)}
        >
          <Image
            src={selectedImage}
            alt={name || "Product Image"}
            fill
            className=""
          />
        </motion.div>
      )}


{/* Thumbnails */}
{photos.length > 0 && (
  <div className="grid grid-cols-4 gap-3">
    {photos.map((photo, idx) => (
      <motion.div
        key={idx}
        whileHover={{ scale: 1.05 }}
        className={`relative h-24 w-full rounded-xl overflow-hidden border cursor-pointer ${
          selectedImage === photo ? "ring-2 ring-gray-800" : ""
        }`}
        onClick={() => setSelectedImage(photo)}
      >
        <Image
          src={photo}
          alt={`${name} ${idx + 1}`}
          fill
          className=""
        />
      </motion.div>
    ))}
  </div>
)}

      {/* Fullscreen Viewer */}
      <AnimatePresence>
        {isViewerOpen && selectedImage && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
            onClick={() => setIsViewerOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative w-[90%] md:w-[70%] h-[80%]"
            >
              <Image
                src={selectedImage}
                alt="Fullscreen view"
                fill
                className="object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
