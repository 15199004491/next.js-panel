'use client';

import { useState, useEffect } from 'react';
import { Send } from 'lucide-react';
import { Input } from '@/src/ui/input';
import { Checkbox } from '@/src/ui/checkbox';
import { Button } from '@/src/ui/button';
import { BackButton } from '@/src/components/back-button';
import type { ResaleProperty } from '@/src/modules/resale/models';

interface ResaleFormProps {
  initialData?: ResaleProperty | null;
  disabled?: boolean;
  onSubmit: (data: FormData) => void;
  showBackButton?: boolean;
}

interface FormData {
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
}

const defaultFormData: FormData = {
  title: '',
  address: '',
  price: '',
  area: '',
  layout: '',
  floor: '',
  totalFloors: '',
  age: '',
  buildYear: '',
  orientation: 'south',
  hasImages: false,
  source: 'agent',
  propertyType: 'apartment',
  decoration: 'medium',
  status: 'available',
  description: '',
  remark: '',
  contactName: '',
  contactPhone: '',
};

const propertyTypeOptions = [
  { value: 'apartment', label: 'Apartment' },
  { value: 'villa', label: 'Villa' },
  { value: 'townhouse', label: 'Townhouse' },
  { value: 'condo', label: 'Condo' },
];

const decorationOptions = [
  { value: 'luxury', label: 'Luxury' },
  { value: 'medium', label: 'Medium' },
  { value: 'simple', label: 'Simple' },
  { value: 'rough', label: 'Rough' },
];

const statusOptions = [
  { value: 'available', label: 'Available' },
  { value: 'sold', label: 'Sold' },
  { value: 'reserved', label: 'Reserved' },
];

const orientationOptions = [
  { value: 'east', label: 'East' },
  { value: 'west', label: 'West' },
  { value: 'south', label: 'South' },
  { value: 'north', label: 'North' },
  { value: 'southeast', label: 'Southeast' },
  { value: 'southwest', label: 'Southwest' },
  { value: 'northeast', label: 'Northeast' },
  { value: 'northwest', label: 'Northwest' },
];

const sourceOptions = [
  { value: 'agent', label: 'Agent' },
  { value: 'owner', label: 'Owner' },
];

const layoutOptions = [
  { value: '1-1-1', label: '1-1-1 (1 Bed, 1 Living, 1 Bath)' },
  { value: '2-1-1', label: '2-1-1 (2 Beds, 1 Living, 1 Bath)' },
  { value: '2-2-1', label: '2-2-1 (2 Beds, 2 Living, 1 Bath)' },
  { value: '3-1-1', label: '3-1-1 (3 Beds, 1 Living, 1 Bath)' },
  { value: '3-2-1', label: '3-2-1 (3 Beds, 2 Living, 1 Bath)' },
  { value: '3-2-2', label: '3-2-2 (3 Beds, 2 Living, 2 Baths)' },
  { value: '4-2-2', label: '4-2-2 (4 Beds, 2 Living, 2 Baths)' },
  { value: '4-3-2', label: '4-3-2 (4 Beds, 3 Living, 2 Baths)' },
  { value: '5-3-3', label: '5-3-3 (5 Beds, 3 Living, 3 Baths)' },
  { value: '6-4-4', label: '6-4-4 (6 Beds, 4 Living, 4 Baths)' },
];

export default function ResaleForm({ initialData, disabled = false, onSubmit, showBackButton = true }: ResaleFormProps) {
  const [formData, setFormData] = useState<FormData>(defaultFormData);

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title,
        address: initialData.address,
        price: initialData.price.toString(),
        area: initialData.area.toString(),
        layout: initialData.layout,
        floor: initialData.floor,
        totalFloors: initialData.totalFloors.toString(),
        age: initialData.age.toString(),
        buildYear: initialData.buildYear?.toString() || '',
        orientation: initialData.orientation,
        hasImages: initialData.hasImages,
        source: initialData.source,
        propertyType: initialData.propertyType,
        decoration: initialData.decoration,
        status: initialData.status,
        description: initialData.description,
        remark: initialData.remark,
        contactName: initialData.contactName,
        contactPhone: initialData.contactPhone,
      });
    } else {
      setFormData(defaultFormData);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (field: keyof FormData, value: string | boolean) => {
    if (!disabled) {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  return (
    <form id="resale-form" onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Title {!disabled && <span className="text-red-500">*</span>}
          </label>
          <Input
            type="text"
            value={formData.title}
            onChange={(e) => handleChange('title', e.target.value)}
            placeholder="Enter property title"
            required={!disabled}
            disabled={disabled}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Price (USD) {!disabled && <span className="text-red-500">*</span>}
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
          placeholder="Enter full address"
          required={!disabled}
          disabled={disabled}
        />
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Area (m²)</label>
          <Input
            type="number"
            min="0"
            value={formData.area}
            onChange={(e) => handleChange('area', e.target.value)}
            placeholder="0"
            disabled={disabled}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Layout</label>
          <select
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            value={formData.layout}
            onChange={(e) => handleChange('layout', e.target.value)}
            disabled={disabled}
          >
            <option value="">Select layout</option>
            {layoutOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Floor</label>
          <Input
            type="text"
            value={formData.floor}
            onChange={(e) => handleChange('floor', e.target.value)}
            placeholder="e.g. 5/10"
            disabled={disabled}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Total Floors</label>
          <Input
            type="number"
            min="1"
            value={formData.totalFloors}
            onChange={(e) => handleChange('totalFloors', e.target.value)}
            placeholder="0"
            disabled={disabled}
          />
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Age (Years)</label>
          <Input
            type="number"
            min="0"
            value={formData.age}
            onChange={(e) => handleChange('age', e.target.value)}
            placeholder="0"
            disabled={disabled}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Build Year</label>
          <Input
            type="number"
            min="1900"
            max="2025"
            value={formData.buildYear}
            onChange={(e) => handleChange('buildYear', e.target.value)}
            placeholder="2000"
            disabled={disabled}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Orientation</label>
          <select
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            value={formData.orientation}
            onChange={(e) => handleChange('orientation', e.target.value as 'east' | 'west' | 'south' | 'north' | 'southeast' | 'southwest' | 'northeast' | 'northwest')}
            disabled={disabled}
          >
            {orientationOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Property Type</label>
          <select
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            value={formData.propertyType}
            onChange={(e) => handleChange('propertyType', e.target.value as 'apartment' | 'villa' | 'townhouse' | 'condo')}
            disabled={disabled}
          >
            {propertyTypeOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Source</label>
          <select
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            value={formData.source}
            onChange={(e) => handleChange('source', e.target.value as 'agent' | 'owner')}
            disabled={disabled}
          >
            {sourceOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Decoration</label>
          <select
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            value={formData.decoration}
            onChange={(e) => handleChange('decoration', e.target.value as 'luxury' | 'medium' | 'simple' | 'rough')}
            disabled={disabled}
          >
            {decorationOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
          <select
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            value={formData.status}
            onChange={(e) => handleChange('status', e.target.value as 'available' | 'sold' | 'reserved')}
            disabled={disabled}
          >
            {statusOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
        <div className="flex items-end">
          <label className="flex items-center gap-2 space-y-0 cursor-pointer">
            <Checkbox 
              checked={formData.hasImages} 
              onCheckedChange={(checked) => handleChange('hasImages', checked === true)}
              disabled={disabled}
            />
            <span className="text-sm font-medium text-gray-700">Has Images</span>
          </label>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
        <textarea
          className="flex h-24 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-none"
          value={formData.description}
          onChange={(e) => handleChange('description', e.target.value)}
          placeholder="Enter description"
          disabled={disabled}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Remark</label>
        <Input
          type="text"
          value={formData.remark}
          onChange={(e) => handleChange('remark', e.target.value)}
          placeholder="Enter remark"
          disabled={disabled}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Contact Phone</label>
          <Input
            type="text"
            value={formData.contactPhone}
            onChange={(e) => handleChange('contactPhone', e.target.value)}
            placeholder="Enter contact phone"
            disabled={disabled}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Contact Name</label>
          <Input
            type="text"
            value={formData.contactName}
            onChange={(e) => handleChange('contactName', e.target.value)}
            placeholder="Enter contact name"
            disabled={disabled}
          />
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4">
          {showBackButton && <BackButton onClick={() => window.history.back()} variant="outline" />}
          {!disabled && (
            <Button type="submit">
              <Send className="w-4 h-4 mr-2" />
              Submit
            </Button>
          )}
        </div>
      </form>
    );
  }