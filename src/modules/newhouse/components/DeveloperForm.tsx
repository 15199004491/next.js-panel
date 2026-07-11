'use client';

import { useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import { Input } from '@/src/ui/input';
import { Button } from '@/src/ui/button';
import { BackButton } from '@/src/components/back-button';
import type { Developer } from '@/src/modules/newhouse/models';

interface DeveloperFormProps {
  initialData?: Developer | null;
  disabled?: boolean;
  onSubmit: (data: FormData) => void;
}

interface FormData {
  name: string;
  logo: string;
  description: string;
  entryYears: string;
  projectsCount: string;
  rating: string;
  status: 'active' | 'inactive';
  remark: string;
}

const defaultFormData: FormData = {
  name: '',
  logo: '',
  description: '',
  entryYears: '',
  projectsCount: '',
  rating: '',
  status: 'active',
  remark: '',
};

export default function DeveloperForm({ initialData, disabled = false, onSubmit }: DeveloperFormProps) {
  const [formData, setFormData] = useState<FormData>(defaultFormData);

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        logo: initialData.logo,
        description: initialData.description,
        entryYears: initialData.entryYears.toString(),
        projectsCount: initialData.projectsCount.toString(),
        rating: initialData.rating.toString(),
        status: initialData.status,
        remark: initialData.remark,
      });
    } else {
      setFormData(defaultFormData);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (field: keyof FormData, value: string) => {
    if (!disabled) {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  return (
    <form id="developer-form" onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Name {!disabled && <span className="text-red-500">*</span>}
          </label>
          <Input
            type="text"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            placeholder="Enter developer name"
            required={!disabled}
            disabled={disabled}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Logo URL
          </label>
          <Input
            type="url"
            value={formData.logo}
            onChange={(e) => handleChange('logo', e.target.value)}
            placeholder="https://example.com/logo.png"
            disabled={disabled}
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
          onChange={(e) => handleChange('description', e.target.value)}
          placeholder="Enter description"
          disabled={disabled}
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
            onChange={(e) => handleChange('entryYears', e.target.value)}
            placeholder="0"
            disabled={disabled}
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
            onChange={(e) => handleChange('projectsCount', e.target.value)}
            placeholder="0"
            disabled={disabled}
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
            onChange={(e) => handleChange('rating', e.target.value)}
            placeholder="0.0"
            disabled={disabled}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status
          </label>
          <select
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            value={formData.status}
            onChange={(e) => handleChange('status', e.target.value as 'active' | 'inactive')}
            disabled={disabled}
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
          onChange={(e) => handleChange('remark', e.target.value)}
          placeholder="Enter remark"
          disabled={disabled}
        />
      </div>

      <div className="flex justify-end gap-3 pt-4">
          <BackButton onClick={() => window.history.back()} variant="outline" />
          {!disabled && (
            <Button type="submit">
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          )}
        </div>
      </form>
    );
  }