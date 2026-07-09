'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/src/ui/button';
import { Input } from '@/src/ui/input';
import { useNewhouseStore } from '../../store';
import type { Developer } from '../../models';

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  developer: Developer | null;
}

export default function EditModal({ isOpen, onClose, developer }: EditModalProps) {
  const { handleUpdateDeveloper } = useNewhouseStore();
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
  }, [developer, isOpen]);

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
    onClose();
  };

  if (!isOpen || !developer) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Background overlay */}
      <div 
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />
      
      {/* Modal content */}
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-lg mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold">Edit Developer</h3>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name <span className="text-red-500">*</span>
            </label>
            <Input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter developer name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Logo URL
            </label>
            <Input
              type="url"
              value={formData.logo}
              onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
              placeholder="https://example.com/logo.png"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              className="flex h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-none"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Enter description"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Entry Years
              </label>
              <Input
                type="number"
                min="0"
                value={formData.entryYears}
                onChange={(e) => setFormData({ ...formData, entryYears: e.target.value })}
                placeholder="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Projects Count
              </label>
              <Input
                type="number"
                min="0"
                value={formData.projectsCount}
                onChange={(e) => setFormData({ ...formData, projectsCount: e.target.value })}
                placeholder="0"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rating
            </label>
            <Input
              type="number"
              min="0"
              max="5"
              step="0.1"
              value={formData.rating}
              onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
              placeholder="0.0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as 'active' | 'inactive' })}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Remark
            </label>
            <textarea
              className="flex h-16 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-none"
              value={formData.remark}
              onChange={(e) => setFormData({ ...formData, remark: e.target.value })}
              placeholder="Enter remark"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button type="submit">
              Update
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}