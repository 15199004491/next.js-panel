import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/src/ui/dialog';
import { Input } from '@/src/ui/input';
import { Button } from '@/src/ui/button';
import type { Developer } from '@/src/modules/newhouse/models';

interface DeveloperModalProps {
  open: boolean;
  mode: 'create' | 'edit';
  initialData?: Developer | null;
  onClose: () => void;
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

export function DeveloperModal({ open, mode, initialData, onClose, onSubmit }: DeveloperModalProps) {
  const [formData, setFormData] = useState<FormData>(defaultFormData);

  useEffect(() => {
    if (initialData && mode === 'edit') {
      setFormData({
        name: initialData.name,
        logo: initialData.logo || '',
        description: initialData.description || '',
        entryYears: initialData.entryYears.toString(),
        projectsCount: initialData.projectsCount.toString(),
        rating: initialData.rating.toString(),
        status: initialData.status,
        remark: initialData.remark || '',
      });
    } else {
      setFormData(defaultFormData);
    }
  }, [initialData, mode, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{mode === 'create' ? 'Create Developer' : 'Edit Developer'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Name *</label>
              <Input
                type="text"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                required
                placeholder="Developer name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Logo URL</label>
              <Input
                type="url"
                value={formData.logo}
                onChange={(e) => handleChange('logo', e.target.value)}
                placeholder="https://example.com/logo.png"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              className="flex h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm resize-none"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Enter description"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Entry Years</label>
              <Input
                type="number"
                min="0"
                value={formData.entryYears}
                onChange={(e) => handleChange('entryYears', e.target.value)}
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Projects</label>
              <Input
                type="number"
                min="0"
                value={formData.projectsCount}
                onChange={(e) => handleChange('projectsCount', e.target.value)}
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Rating</label>
              <Input
                type="number"
                min="0"
                max="5"
                step="0.1"
                value={formData.rating}
                onChange={(e) => handleChange('rating', e.target.value)}
                placeholder="0.0"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Status</label>
            <select
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={formData.status}
              onChange={(e) => handleChange('status', e.target.value)}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Remark</label>
            <textarea
              className="flex h-16 w-full rounded-md border border-input bg-background px-3 py-2 text-sm resize-none"
              value={formData.remark}
              onChange={(e) => handleChange('remark', e.target.value)}
              placeholder="Enter remark"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">{mode === 'create' ? 'Create' : 'Update'}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}