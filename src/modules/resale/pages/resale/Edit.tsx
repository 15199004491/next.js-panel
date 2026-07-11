'use client';

import { useEffect } from 'react';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import { Card, CardContent } from '@/src/ui/card';
import { useResale } from '@/src/modules/resale/hooks/useResale';
import ResaleForm from '@/src/modules/resale/components/ResaleForm';
import type { ResaleProperty } from '@/src/modules/resale/models';
import { FormSkeleton } from '@/src/components/form-skeleton';
import { BackButton } from '@/src/components/back-button';
import { useToast } from '@/src/components/toast';

export default function ResaleEdit() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const id = params.id as string;
  const readonly = searchParams.get('readonly') === 'true';
  
  const { property, loading, error, fetchResalePropertyById, updateResaleProperty } = useResale();
  const { addToast } = useToast();

  useEffect(() => {
    if (!id) return;
    fetchResalePropertyById(id);
  }, [id, fetchResalePropertyById]);

  const handleSubmit = async (formData: {
    title: string;
    address: string;
    price: string;
    area: string;
    layout: string;
    floor: string;
    totalFloors: string;
    age: string;
    buildYear: string;
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
    if (!property) return;
    
    const updatedData = {
      title: formData.title,
      address: formData.address,
      price: parseInt(formData.price) || 0,
      area: parseInt(formData.area) || 0,
      layout: formData.layout,
      floor: formData.floor,
      totalFloors: parseInt(formData.totalFloors) || 0,
      age: parseInt(formData.age) || 0,
      buildYear: parseInt(formData.buildYear) || 0,
      orientation: formData.orientation,
      hasImages: formData.hasImages,
      source: formData.source,
      propertyType: formData.propertyType,
      decoration: formData.decoration,
      status: formData.status,
      description: formData.description,
      remark: formData.remark,
      contactName: formData.contactName,
      contactPhone: formData.contactPhone,
    };

    await updateResaleProperty(property.id, updatedData);
    addToast('success', 'Resale property updated successfully');
    setTimeout(() => router.back(), 500);
  };

  const handleCancel = () => {
    router.back();
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <BackButton onClick={handleCancel} />
        <Card>
          <CardContent className="p-6">
            <FormSkeleton />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="space-y-6">
        <BackButton onClick={handleCancel} />
        <Card>
          <CardContent className="p-6">
            <p className="text-destructive text-center">{error || 'Resale property not found'}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 w-full">
      <div className="flex items-center justify-between w-full">
        <BackButton onClick={handleCancel} />
      </div>

      <Card className="w-full">
        <CardContent className="p-6">
          <ResaleForm
            initialData={property as ResaleProperty}
            disabled={readonly}
            onSubmit={handleSubmit}
          />
        </CardContent>
      </Card>
    </div>
  );
}