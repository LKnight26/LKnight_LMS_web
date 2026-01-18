"use client";

import { useState } from "react";
import AdminCard from "@/components/admin/AdminCard";
import AdminButton from "@/components/admin/AdminButton";
import AdminInput from "@/components/admin/AdminInput";
import AdminSelect from "@/components/admin/AdminSelect";
import Badge from "@/components/admin/Badge";

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

// Mock data for existing course
const existingCourse = {
  title: "Web Development Masterclass",
  slug: "web-development-masterclass",
  summary: "Learn modern web development from scratch with HTML, CSS, JavaScript, and React",
  description: "This comprehensive course covers everything you need to know to become a professional web developer. From the basics of HTML and CSS to advanced React patterns, you'll learn by building real-world projects.",
  category: "web-development",
  level: "beginner",
  price: "99",
  status: "published",
  thumbnail: "/icon/bg.jpg",
  enrollments: 1234,
  revenue: 122166,
  createdAt: "2024-01-15",
};

export default function EditCoursePage() {
  const [formData, setFormData] = useState({
    title: existingCourse.title,
    slug: existingCourse.slug,
    summary: existingCourse.summary,
    description: existingCourse.description,
    category: existingCourse.category,
    level: existingCourse.level,
    price: existingCourse.price,
    status: existingCourse.status,
  });
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(
    existingCourse.thumbnail
  );
  const [saving, setSaving] = useState(false);

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
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSaving(false);
    console.log(formData);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
            <a href="/admin/courses" className="hover:text-primary">
              Courses
            </a>
            <span>/</span>
            <span>Edit Course</span>
          </div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-primary font-outfit">
              Edit Course
            </h1>
            <Badge
              variant={formData.status === "published" ? "success" : "warning"}
            >
              {formData.status === "published" ? "Published" : "Draft"}
            </Badge>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <AdminButton variant="ghost" href="/admin/courses">
            Cancel
          </AdminButton>
          <AdminButton
            variant="outline"
            href={`/admin/courses/1/modules`}
            icon={
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="8" y1="6" x2="21" y2="6" />
                <line x1="8" y1="12" x2="21" y2="12" />
                <line x1="8" y1="18" x2="21" y2="18" />
                <line x1="3" y1="6" x2="3.01" y2="6" />
                <line x1="3" y1="12" x2="3.01" y2="12" />
                <line x1="3" y1="18" x2="3.01" y2="18" />
              </svg>
            }
          >
            Manage Modules
          </AdminButton>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <p className="text-sm text-gray-500">Total Enrollments</p>
          <p className="text-2xl font-bold text-primary mt-1">
            {existingCourse.enrollments.toLocaleString()}
          </p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <p className="text-sm text-gray-500">Total Revenue</p>
          <p className="text-2xl font-bold text-green-600 mt-1">
            ${existingCourse.revenue.toLocaleString()}
          </p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <p className="text-sm text-gray-500">Created</p>
          <p className="text-2xl font-bold text-gray-600 mt-1">
            {new Date(existingCourse.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
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
                helperText="URL-friendly version of the title"
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
                  placeholder="Detailed description..."
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
                icon={<span className="text-gray-400 font-medium">$</span>}
              />

              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-gray-700">
                  Status
                </label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, status: "draft" }))
                    }
                    className={`flex-1 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                      formData.status === "draft"
                        ? "bg-yellow-100 text-yellow-700 border-2 border-yellow-300"
                        : "bg-gray-100 text-gray-600 border-2 border-transparent hover:bg-gray-200"
                    }`}
                  >
                    Draft
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, status: "published" }))
                    }
                    className={`flex-1 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                      formData.status === "published"
                        ? "bg-green-100 text-green-700 border-2 border-green-300"
                        : "bg-gray-100 text-gray-600 border-2 border-transparent hover:bg-gray-200"
                    }`}
                  >
                    Published
                  </button>
                </div>
              </div>
            </div>
          </AdminCard>

          {/* Thumbnail */}
          <AdminCard title="Course Thumbnail" subtitle="Upload an image for the course">
            <div className="flex items-start gap-6">
              {/* Preview */}
              <div className="w-48 h-28 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0 border border-gray-200">
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
              </div>
            </div>
          </AdminCard>

          {/* Actions */}
          <div className="flex items-center justify-between pt-4">
            <AdminButton
              variant="ghost"
              type="button"
              className="text-red-500 hover:bg-red-50"
              icon={
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                </svg>
              }
            >
              Delete Course
            </AdminButton>

            <div className="flex items-center gap-3">
              <AdminButton variant="outline" href="/admin/courses">
                Cancel
              </AdminButton>
              <AdminButton
                variant="secondary"
                type="submit"
                disabled={saving}
                icon={
                  saving ? (
                    <svg
                      className="animate-spin"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="12" y1="2" x2="12" y2="6" />
                      <line x1="12" y1="18" x2="12" y2="22" />
                      <line x1="4.93" y1="4.93" x2="7.76" y2="7.76" />
                      <line x1="16.24" y1="16.24" x2="19.07" y2="19.07" />
                      <line x1="2" y1="12" x2="6" y2="12" />
                      <line x1="18" y1="12" x2="22" y2="12" />
                      <line x1="4.93" y1="19.07" x2="7.76" y2="16.24" />
                      <line x1="16.24" y1="7.76" x2="19.07" y2="4.93" />
                    </svg>
                  ) : null
                }
              >
                {saving ? "Saving..." : "Save Changes"}
              </AdminButton>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
