'use client';

import { X } from 'lucide-react';
import { Button } from '@/src/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/src/ui/dialog';
import { useNewhouse } from '@/src/modules/newhouse/hooks/useNewhouse';
import NewhouseForm from './NewhouseForm';

interface CreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function CreateModal({ isOpen, onClose, onSuccess }: CreateModalProps) {
  const { createNewhouse } = useNewhouse();

  const handleSubmit = async (formData: {
    name: string;
    address: string;
    price: string;
    developer: string;
    contactPhone: string;
    status: 'available' | 'sold' | 'reserved';
    images: string;
    description: string;
  }) => {
    const newhouseData = {
      name: formData.name,
      address: formData.address,
      price: parseInt(formData.price) || 0,
      developer: formData.developer,
      contactPhone: formData.contactPhone,
      status: formData.status,
      images: formData.images ? [formData.images] : [],
      description: formData.description,
    };

    await createNewhouse(newhouseData);
    onSuccess?.();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <div className="flex items-center justify-between w-full">
            <DialogTitle>Create Newhouse</DialogTitle>
          </div>
        </DialogHeader>
        
        <NewhouseForm onSubmit={handleSubmit} />
        
        <DialogFooter className="gap-3">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" form="newhouse-form">
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}