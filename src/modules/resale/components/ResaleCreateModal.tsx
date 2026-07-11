'use client';

import { X } from 'lucide-react';
import { Button } from '@/src/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/src/ui/dialog';
import { useResale } from '@/src/modules/resale/hooks/useResale';
import ResaleForm from './ResaleForm';

interface CreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function ResaleCreateModal({ isOpen, onClose, onSuccess }: CreateModalProps) {
  const { createResaleProperty } = useResale();

  const handleSubmit = async (formData: {
    title: string;
    address: string;
    price: string;
    area: string;
    layout: string;
    floor: string;
    totalFloors: string;
    age: string;
    orientation: 'east' | 'west' | 'south' | 'north' | 'southeast' | 'southwest' | 'northeast' | 'northwest';
    hasImages: boolean;
    source: 'agent' | 'owner';
    propertyType: 'apartment' | 'villa' | 'townhouse' | 'condo';
    decoration: 'luxury' | 'medium' | 'simple' | 'rough';
    status: 'available' | 'sold' | 'reserved';
    description: string;
    remark: string;
    contactName: string;
    contactPhone: string;
  }) => {
    const currentYear = new Date().getFullYear();
    const age = parseInt(formData.age) || 0;
    
    const getHouseCategory = (propertyType: string): 'apartment' | 'residential' | 'commercial' | 'other' => {
      switch (propertyType) {
        case 'apartment':
        case 'condo':
          return 'apartment';
        case 'villa':
        case 'townhouse':
          return 'residential';
        default:
          return 'other';
      }
    };
    
    const propertyData = {
      title: formData.title,
      address: formData.address,
      price: parseInt(formData.price) || 0,
      area: parseInt(formData.area) || 0,
      layout: formData.layout,
      floor: formData.floor,
      totalFloors: parseInt(formData.totalFloors) || 0,
      age: age,
      buildYear: currentYear - age,
      orientation: formData.orientation,
      hasImages: formData.hasImages,
      source: formData.source,
      propertyType: formData.propertyType,
      houseCategory: getHouseCategory(formData.propertyType),
      decoration: formData.decoration,
      status: formData.status,
      description: formData.description,
      remark: formData.remark,
      contactName: formData.contactName,
      contactPhone: formData.contactPhone,
    };

    await createResaleProperty(propertyData);
    onSuccess?.();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <div className="flex items-center justify-between w-full">
            <DialogTitle>Create Resale Property</DialogTitle>
          </div>
        </DialogHeader>
        
        <ResaleForm onSubmit={handleSubmit} />
        
        <DialogFooter className="gap-3">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" form="resale-form">
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}