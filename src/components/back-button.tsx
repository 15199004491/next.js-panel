'use client';

import { ArrowLeft } from 'lucide-react';
import { Button } from '@/src/ui/button';

interface BackButtonProps {
  onClick: () => void;
  variant?: 'ghost' | 'outline' | 'default';
  className?: string;
}

export function BackButton({ onClick, variant = 'ghost', className = '' }: BackButtonProps) {
  return (
    <Button type="button" variant={variant} onClick={onClick} className={className}>
      <ArrowLeft className="w-4 h-4" />
      Back
    </Button>
  );
}