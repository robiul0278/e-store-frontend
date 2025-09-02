'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface HeroImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  animationDelay?: number;
}

export default function HeroImage({ 
  src, 
  alt, 
  className, 
  priority = false,
  animationDelay = 0.01 
}: HeroImageProps) {

  return (
    <motion.div
      initial={{ x: 500, opacity: 0, scale: 0.95 }}
      animate={{ x: 0, opacity: 1, scale: 1 }}
      transition={{
        x: { type: 'spring', stiffness: 120, damping: 15, delay: animationDelay },
        opacity: { duration: 0.06, delay: animationDelay },
        scale: { duration: 0.06, delay: animationDelay },
      }}
      className={cn("relative overflow-hidden", className)}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        className="object-contain"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent opacity-60" />
      <div className="absolute inset-0 bg-primary/5 mix-blend-overlay" />
    </motion.div>
  );
}
