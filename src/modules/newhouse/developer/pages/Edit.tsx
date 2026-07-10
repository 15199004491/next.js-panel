'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, Save } from 'lucide-react';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import { Button } from '@/src/ui/button';
import { Input } from '@/src/ui/input';
import { Card, CardContent } from '@/src/ui/card';
import { useNewhouseStore } from '@/src/modules/newhouse/store';
import type { Developer } from '@/src/modules/newhouse/models';

export default function DeveloperEdit() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const id = params.id as string;
  const readonly = searchParams.get('readonly') === 'true';
  
  const { developer, loading, error, fetchDeveloperById, handleUpdateDeveloper } = useNewhouseStore();
  
  const [formData, setFormData] = useState({
    name: '',
    logo: '',
    description: '',
    entryYears: '',
    projectsCount: '',
    rating: '',
    status: 'active' as 'active' | 'inactive',
    remark: '',
  });

  useEffect(() => {
    if (!id) return;
    fetchDeveloperById(id);
  }, [id, fetchDeveloperById]);

  useEffect(() => {
    if (developer) {
      setFormData({
        name: developer.name,
        logo: developer.logo,
        description: developer.description,
        entryYears: developer.entryYears.toString(),
        projectsCount: developer.projectsCount.toString(),
        rating: developer.rating.toString(),
        status: developer.status,
        remark: developer.remark,
      });
    }
  }, [developer]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
      updatedAt: new Date().toISOString().replace('T', ' ').slice(0, 19),
    };

    await handleUpdateDeveloper(developer.id, updatedData);
    router.push('/developers');
  };

  const handleCancel = () => {
    router.push('/developers');
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <Button variant="ghost" onClick={handleCancel}>
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>
        <Card>
          <CardContent className="p-6">
            <div className="animate-pulse space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="h-10 bg-gray-200 rounded" />
                <div className="h-10 bg-gray-200 rounded" />
              </div>
              <div className="h-10 bg-gray-200 rounded" />
              <div className="h-24 bg-gray-200 rounded" />
              <div className="grid grid-cols-3 gap-4">
                <div className="h-10 bg-gray-200 rounded" />
                <div className="h-10 bg-gray-200 rounded" />
                <div className="h-10 bg-gray-200 rounded" />
              </div>
              <div className="h-20 bg-gray-200 rounded" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error || !developer) {
    return (
      <div className="space-y-6">
        <Button variant="ghost" onClick={handleCancel}>
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>
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
        <Button variant="ghost" onClick={handleCancel}>
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>
      </div>

      <Card className="w-full">
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6 w-full">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name {!readonly && <span className="text-red-500">*</span>}
                </label>
                <Input
                  type="text"
                  value={formData.name}
                  onChange={(e) => !readonly && setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter developer name"
                  required={!readonly}
                  disabled={readonly}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Logo URL
                </label>
                <Input
                  type="url"
                  value={formData.logo}
                  onChange={(e) => !readonly && setFormData({ ...formData, logo: e.target.value })}
                  placeholder="https://example.com/logo.png"
                  disabled={readonly}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                className="flex h-24 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-none"
                value={formData.description}
                onChange={(e) => !readonly && setFormData({ ...formData, description: e.target.value })}
                placeholder="Enter description"
                disabled={readonly}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Entry Years
                </label>
                <Input
                  type="number"
                  min="0"
                  value={formData.entryYears}
                  onChange={(e) => !readonly && setFormData({ ...formData, entryYears: e.target.value })}
                  placeholder="0"
                  disabled={readonly}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Projects Count
                </label>
                <Input
                  type="number"
                  min="0"
                  value={formData.projectsCount}
                  onChange={(e) => !readonly && setFormData({ ...formData, projectsCount: e.target.value })}
                  placeholder="0"
                  disabled={readonly}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rating
                </label>
                <Input
                  type="number"
                  min="0"
                  max="5"
                  step="0.1"
                  value={formData.rating}
                  onChange={(e) => !readonly && setFormData({ ...formData, rating: e.target.value })}
                  placeholder="0.0"
                  disabled={readonly}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  value={formData.status}
                  onChange={(e) => !readonly && setFormData({ ...formData, status: e.target.value as 'active' | 'inactive' })}
                  disabled={readonly}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Remark
              </label>
              <textarea
                className="flex h-16 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-none"
                value={formData.remark}
                onChange={(e) => !readonly && setFormData({ ...formData, remark: e.target.value })}
                placeholder="Enter remark"
                disabled={readonly}
              />
            </div>

            {!readonly && (
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={handleCancel}>
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </Button>
                <Button onClick={handleSubmit}>
                  <Save className="w-4 h-4" />
                  Save Changes
                </Button>
              </div>
            )}

            <input type="submit" className="hidden" />
          </form>
        </CardContent>
      </Card>
    </div>
  );
}