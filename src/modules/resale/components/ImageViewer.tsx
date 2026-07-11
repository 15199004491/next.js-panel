'use client';

import { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/src/ui/button';
import {
  Dialog,
  DialogContent,
} from '@/src/ui/dialog';

interface ImageViewerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  images: string[];
}

export default function ImageViewer({ open, onOpenChange, images }: ImageViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleIndicatorClick = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] p-0 bg-black">
        <Button
          variant="ghost"
          className="absolute top-4 right-4 z-10 text-white hover:bg-white/20"
          onClick={() => onOpenChange(false)}
        >
          <X className="w-6 h-6" />
        </Button>

        <div className="relative w-full h-[70vh]">
          <img
            src={images[currentIndex]}
            alt={`Property image ${currentIndex + 1}`}
            className="w-full h-full object-contain"
          />

          <Button
            variant="ghost"
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
            onClick={handlePrev}
          >
            <ChevronLeft className="w-8 h-8" />
          </Button>

          <Button
            variant="ghost"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
            onClick={handleNext}
          >
            <ChevronRight className="w-8 h-8" />
          </Button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => handleIndicatorClick(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-white' : 'bg-white/50 hover:bg-white/70'
                }`}
              />
            ))}
          </div>

          <div className="absolute bottom-4 right-4 text-white/70 text-sm">
            {currentIndex + 1} / {images.length}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}