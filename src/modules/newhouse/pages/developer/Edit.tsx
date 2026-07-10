'use client';

import { useEffect } from 'react';
import { Save } from 'lucide-react';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import { Button } from '@/src/ui/button';
import { Card, CardContent } from '@/src/ui/card';
import { useDeveloper } from '@/src/modules/newhouse/hooks/useDeveloper';
import DeveloperForm from '@/src/modules/newhouse/components/DeveloperForm';
import type { Developer } from '@/src/modules/newhouse/models';
import { FormSkeleton } from '@/src/components/form-skeleton';
import { BackButton } from '@/src/components/back-button';

export default function DeveloperEdit() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const id = params.id as string;
  const readonly = searchParams.get('readonly') === 'true';
  
  const { developer, loading, error, fetchDeveloperById, updateDeveloper } = useDeveloper();

  useEffect(() => {
    if (!id) return;
    fetchDeveloperById(id);
  }, [id, fetchDeveloperById]);

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
    if (!developer) return;
    
    const updatedData = {
      name: formData.name,
      logo: formData.logo || 'https://via.placeholder.com/100x100',
      description: formData.description,
      entryYears: parseInt(formData.entryYears) || 0,
      projectsCount: parseInt(formData.projectsCount) || 0,
      rating: parseFloat(formData.rating) || 0,
      status: formData.status,
      remark: formData.remark,
    };

    await updateDeveloper(developer.id, updatedData);
    router.push('/developers');
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

  if (error || !developer) {
    return (
      <div className="space-y-6">
        <BackButton onClick={handleCancel} />
        <Card>
          <CardContent className="p-6">
            <p className="text-destructive text-center">{error || 'Developer not found'}</p>
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
          <DeveloperForm
            initialData={developer as Developer}
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