import React, { useState, useRef } from 'react';
import { ProjectItem } from '../types/portfolio';
import { X, Upload, Check } from 'lucide-react';

interface ProjectEditModalProps {
  project: ProjectItem | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updated: ProjectItem) => void;
}

export const ProjectEditModal: React.FC<ProjectEditModalProps> = ({
  project,
  isOpen,
  onClose,
  onSave,
}) => {
  if (!isOpen || !project) return null;

  const [formData, setFormData] = useState<ProjectItem>({ ...project });
  const [tagsInput, setTagsInput] = useState<string>(project.tags.join(', '));
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData((prev) => ({
          ...prev,
          image: event.target?.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedTags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    onSave({
      ...formData,
      tags: parsedTags,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="w-full max-w-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
          <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
            Edit Case Study / Project
          </h3>
          <button onClick={onClose} className="p-1 text-neutral-400 hover:text-neutral-800 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />

          {/* Project Title & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1">
                Project Title
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 text-sm rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1">
                Category / Domain
              </label>
              <input
                type="text"
                required
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                placeholder="e.g. Product Design"
                className="w-full px-3 py-2 text-sm rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 outline-none"
              />
            </div>
          </div>

          {/* Year & Link */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1">
                Year
              </label>
              <input
                type="text"
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                placeholder="2026"
                className="w-full px-3 py-2 text-sm rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1">
                Live URL / Case Study Link
              </label>
              <input
                type="url"
                value={formData.link || ''}
                onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                placeholder="https://..."
                className="w-full px-3 py-2 text-sm rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 outline-none"
              />
            </div>
          </div>

          {/* Short Summary Description */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1">
              Brief Summary (Appears on Card)
            </label>
            <textarea
              rows={2}
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 text-sm rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 outline-none"
            />
          </div>

          {/* Full Case Study Article */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1">
              Full Case Study Narrative (Appears in Detail Modal)
            </label>
            <textarea
              rows={4}
              value={formData.fullContent || ''}
              onChange={(e) => setFormData({ ...formData, fullContent: e.target.value })}
              placeholder="Elaborate on research insights, engineering decisions, and measurable outcomes..."
              className="w-full px-3 py-2 text-sm rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 outline-none"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1">
              Tags (Comma separated)
            </label>
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="Interaction Design, React, Design Systems"
              className="w-full px-3 py-2 text-sm rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 outline-none"
            />
          </div>

          {/* Visual Presentation (Upload photo OR choose style) */}
          <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800">
            <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2">
              Visual Graphic / Cover Media
            </label>
            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>{formData.image ? 'Replace Uploaded Image' : 'Upload Image / Screenshot'}</span>
              </button>

              {formData.image && (
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, image: undefined })}
                  className="text-xs text-red-500 hover:underline"
                >
                  Remove custom photo
                </button>
              )}
            </div>

            {/* Pattern types */}
            <div className="mt-3">
              <span className="text-xs text-neutral-400 block mb-1.5">
                Or select geometric architectural pattern:
              </span>
              <div className="flex flex-wrap gap-2">
                {(['architectural', 'editorial', 'geometric', 'minimalist'] as const).map((pat) => (
                  <button
                    key={pat}
                    type="button"
                    onClick={() => setFormData({ ...formData, patternType: pat })}
                    className={`px-3 py-1.5 text-xs rounded-lg border capitalize transition-colors ${
                      formData.patternType === pat && !formData.image
                        ? 'border-neutral-900 bg-neutral-900 text-white dark:border-white dark:bg-white dark:text-neutral-900 font-medium'
                        : 'border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 hover:border-neutral-400'
                    }`}
                  >
                    {pat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-medium rounded-lg bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 hover:opacity-90 transition-opacity"
            >
              Save Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
