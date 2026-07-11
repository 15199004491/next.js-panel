'use client';

import { useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import { Input } from '@/src/ui/input';
import { Button } from '@/src/ui/button';
import { BackButton } from '@/src/components/back-button';
import type { Newhouse } from '@/src/modules/newhouse/models';

interface NewhouseFormProps {
  initialData?: Newhouse | null;
  disabled?: boolean;
  onSubmit: (data: FormData) => void;
}

interface FormData {
  name: string;
  address: string;
  price: string;
  developer: string;
  contactPhone: string;
  status: 'available' | 'sold' | 'reserved';
  images: string;
  description: string;
}

const defaultFormData: FormData = {
  name: '',
  address: '',
  price: '',
  developer: '',
  contactPhone: '',
  status: 'available',
  images: '',
  description: '',
};

export default function NewhouseForm({ initialData, disabled = false, onSubmit }: NewhouseFormProps) {
  const [formData, setFormData] = useState<FormData>(defaultFormData);

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        address: initialData.address,
        price: initialData.price.toString(),
        developer: initialData.developer,
        contactPhone: initialData.contactPhone,
        status: initialData.status,
        images: initialData.images?.[0] || '',
        description: initialData.description,
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
    <form id="newhouse-form" onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Name {!disabled && <span className="text-red-500">*</span>}
          </label>
          <Input
            type="text"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            placeholder="Enter newhouse name"
            required={!disabled}
            disabled={disabled}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Price {!disabled && <span className="text-red-500">*</span>}
          </label>
          <Input
            type="number"
            min="0"
            value={formData.price}
            onChange={(e) => handleChange('price', e.target.value)}
            placeholder="0"
            required={!disabled}
            disabled={disabled}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Address {!disabled && <span className="text-red-500">*</span>}
        </label>
        <textarea
          className="flex h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-none"
          value={formData.address}
          onChange={(e) => handleChange('address', e.target.value)}
          placeholder="Enter address"
          required={!disabled}
          disabled={disabled}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Developer
          </label>
          <Input
            type="text"
            value={formData.developer}
            onChange={(e) => handleChange('developer', e.target.value)}
            placeholder="Enter developer name"
            disabled={disabled}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Contact Phone
          </label>
          <Input
            type="tel"
            value={formData.contactPhone}
            onChange={(e) => handleChange('contactPhone', e.target.value)}
            placeholder="Enter contact phone"
            disabled={disabled}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Status
        </label>
        <select
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          value={formData.status}
          onChange={(e) => handleChange('status', e.target.value as 'available' | 'sold' | 'reserved')}
          disabled={disabled}
        >
          <option value="available">Available</option>
          <option value="sold">Sold</option>
          <option value="reserved">Reserved</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Image URL
        </label>
        <Input
          type="url"
          value={formData.images}
          onChange={(e) => handleChange('images', e.target.value)}
          placeholder="https://example.com/image.jpg"
          disabled={disabled}
        />
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