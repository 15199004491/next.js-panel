'use client';

import { useEffect } from 'react';
import { Save } from 'lucide-react';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import { Button } from '@/src/ui/button';
import { Card, CardContent } from '@/src/ui/card';
import { useNewhouse } from '@/src/modules/newhouse/hooks/useNewhouse';
import NewhouseForm from '@/src/modules/newhouse/components/NewhouseForm';
import type { Newhouse } from '@/src/modules/newhouse/models';
import { FormSkeleton } from '@/src/components/form-skeleton';
import { BackButton } from '@/src/components/back-button';

export default function NewhouseEdit() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const id = params.id as string;
  const readonly = searchParams.get('readonly') === 'true';
  
  const { newhouse, loading, error, fetchNewhouseById, updateNewhouse } = useNewhouse();

  useEffect(() => {
    if (!id) return;
    fetchNewhouseById(id);
  }, [id, fetchNewhouseById]);

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
    if (!newhouse) return;
    
    const updatedData = {
      name: formData.name,
      address: formData.address,
      price: parseInt(formData.price) || 0,
      developer: formData.developer,
      contactPhone: formData.contactPhone,
      status: formData.status,
      images: formData.images ? [formData.images] : [],
      description: formData.description,
    };

    await updateNewhouse(newhouse.id, updatedData);
    router.push('/newhouses');
  };

  const handleCancel = () => {
    router.push('/newhouses');
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

  if (error || !newhouse) {
    return (
      <div className="space-y-6">
        <BackButton onClick={handleCancel} />
        <Card>
          <CardContent className="p-6">
            <p className="text-destructive text-center">{error || 'Newhouse not found'}</p>
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
          <NewhouseForm
            initialData={newhouse as Newhouse}
            disabled={readonly}
            onSubmit={handleSubmit}
          />
          
          <div className="flex justify-end gap-3 pt-4">
            <BackButton onClick={handleCancel} variant="outline" />
            {!readonly && (
              <Button onClick={(e) => {
                e.preventDefault();
                const form = document.querySelector('form') as HTMLFormElement;
                form?.submit();
              }}>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}