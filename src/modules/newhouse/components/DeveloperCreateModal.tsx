'use client';

import { X } from 'lucide-react';
import { Button } from '@/src/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/src/ui/dialog';
import { useDeveloper } from '@/src/modules/newhouse/hooks/useDeveloper';
import DeveloperForm from './DeveloperForm';

interface CreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function DeveloperCreateModal({ isOpen, onClose, onSuccess }: CreateModalProps) {
  const { createDeveloper } = useDeveloper();

  const handleSubmit = async (formData: {
    name: string;
    logo: string;
    description: string;
    entryYears: string;
    projectsCount: string;
    rating: string;
    status: 'active' | 'inactive';
    remark: string;
  }) => {
    const developerData = {
      name: formData.name,
      logo: formData.logo || 'https://via.placeholder.com/100x100',
      description: formData.description,
      entryYears: parseInt(formData.entryYears) || 0,
      projectsCount: parseInt(formData.projectsCount) || 0,
      rating: parseFloat(formData.rating) || 0,
      status: 'active' as const,
      remark: formData.remark,
    };

    await createDeveloper(developerData);
    onSuccess?.();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <div className="flex items-center justify-between w-full">
            <DialogTitle>Create Developer</DialogTitle>
          </div>
        </DialogHeader>
        
        <DeveloperForm onSubmit={handleSubmit} showBackButton={false} />
        
      </DialogContent>
    </Dialog>
  );
}