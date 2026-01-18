"use client";

import { useState } from "react";
import AdminCard from "@/components/admin/AdminCard";
import AdminButton from "@/components/admin/AdminButton";
import AdminInput from "@/components/admin/AdminInput";
import AdminSelect from "@/components/admin/AdminSelect";

const categoryOptions = [
  { value: "web-development", label: "Web Development" },
  { value: "design", label: "Design" },
  { value: "backend", label: "Backend" },
  { value: "data-science", label: "Data Science" },
  { value: "mobile-development", label: "Mobile Development" },
];

const levelOptions = [
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
];

export default function NewCoursePage() {
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    summary: "",
    description: "",
    category: "",
    level: "",
    price: "",
    status: "draft",
  });
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "title" && {
        slug: value
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, ""),
      }),
    }));
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnail(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent, status: "draft" | "published") => {
    e.preventDefault();
    console.log({ ...formData, status, thumbnail });
    // Here you would submit to your API
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-primary font-outfit">
            Add New Course
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Create a new course for your LMS
          </p>
        </div>
        <AdminButton
          variant="ghost"
          href="/admin/courses"
          icon={
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
          }
        >
          Back to Courses
        </AdminButton>
      </div>

      <form onSubmit={(e) => handleSubmit(e, "draft")}>
        <div className="space-y-6">
          {/* Basic Information */}
          <AdminCard title="Basic Information" subtitle="Course title and description">
            <div className="space-y-4">
              <AdminInput
                label="Course Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., Web Development Masterclass"
                required
              />

              <AdminInput
                label="Slug"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                placeholder="web-development-masterclass"
                helperText="URL-friendly version of the title (auto-generated)"
              />

              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-gray-700">
                  Course Summary <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="summary"
                  value={formData.summary}
                  onChange={handleChange}
                  placeholder="Brief description of the course (max 200 characters)"
                  maxLength={200}
                  rows={2}
                  required
                  className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-900 placeholder:text-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                />
                <p className="text-xs text-gray-400 text-right">
                  {formData.summary.length}/200
                </p>
              </div>

              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-gray-700">
                  Full Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Detailed description of the course content, what students will learn, prerequisites, etc."
                  rows={6}
                  className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-900 placeholder:text-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                />
              </div>
            </div>
          </AdminCard>

          {/* Course Details */}
          <AdminCard title="Course Details" subtitle="Category, level, and pricing">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <AdminSelect
                label="Category"
                name="category"
                options={categoryOptions}
                value={formData.category}
                onChange={handleChange}
                required
              />

              <AdminSelect
                label="Level"
                name="level"
                options={levelOptions}
                value={formData.level}
                onChange={handleChange}
                required
              />

              <AdminInput
                label="Price"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                placeholder="99"
                helperText="Set to 0 for free courses"
                icon={
                  <span className="text-gray-400 font-medium">$</span>
                }
              />
            </div>
          </AdminCard>

          {/* Thumbnail */}
          <AdminCard title="Course Thumbnail" subtitle="Upload an image for the course">
            <div className="space-y-4">
              <div className="flex items-start gap-6">
                {/* Preview */}
                <div className="w-48 h-28 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0 border-2 border-dashed border-gray-200">
                  {thumbnailPreview ? (
                    <img
                      src={thumbnailPreview}
                      alt="Thumbnail preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <svg
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <polyline points="21 15 16 10 5 21" />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Upload */}
                <div className="flex-1">
                  <label className="block">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleThumbnailChange}
                      className="hidden"
                    />
                    <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-all duration-200">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mx-auto text-gray-400 mb-2"
                      >
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="17 8 12 3 7 8" />
                        <line x1="12" y1="3" x2="12" y2="15" />
                      </svg>
                      <p className="text-sm text-gray-600">
                        <span className="text-primary font-medium">
                          Click to upload
                        </span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        PNG, JPG up to 2MB (Recommended: 1280x720)
                      </p>
                    </div>
                  </label>
                  {thumbnail && (
                    <p className="text-sm text-gray-500 mt-2">
                      Selected: {thumbnail.name}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </AdminCard>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4">
            <AdminButton variant="outline" href="/admin/courses">
              Cancel
            </AdminButton>
            <AdminButton
              variant="ghost"
              type="submit"
              onClick={(e) => handleSubmit(e, "draft")}
            >
              Save as Draft
            </AdminButton>
            <AdminButton
              variant="secondary"
              type="button"
              onClick={(e) => handleSubmit(e, "published")}
            >
              Publish Course
            </AdminButton>
          </div>
        </div>
      </form>
    </div>
  );
}
