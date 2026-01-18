"use client";

import { useState } from "react";
import AdminCard from "@/components/admin/AdminCard";
import AdminButton from "@/components/admin/AdminButton";
import AdminInput from "@/components/admin/AdminInput";
import Badge from "@/components/admin/Badge";

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  iconBgColor: string;
  courseCount: number;
  order: number;
}

const initialCategories: Category[] = [
  {
    id: "1",
    name: "Web Development",
    slug: "web-development",
    description: "Build modern web applications",
    icon: "code",
    iconBgColor: "bg-blue-500",
    courseCount: 45,
    order: 1,
  },
  {
    id: "2",
    name: "Mobile Development",
    slug: "mobile-development",
    description: "Create iOS and Android apps",
    icon: "smartphone",
    iconBgColor: "bg-green-500",
    courseCount: 28,
    order: 2,
  },
  {
    id: "3",
    name: "Data Science",
    slug: "data-science",
    description: "Analyze and visualize data",
    icon: "chart",
    iconBgColor: "bg-purple-500",
    courseCount: 32,
    order: 3,
  },
  {
    id: "4",
    name: "Design",
    slug: "design",
    description: "UI/UX and graphic design",
    icon: "palette",
    iconBgColor: "bg-pink-500",
    courseCount: 24,
    order: 4,
  },
  {
    id: "5",
    name: "Backend Development",
    slug: "backend-development",
    description: "Server-side programming",
    icon: "server",
    iconBgColor: "bg-orange-500",
    courseCount: 38,
    order: 5,
  },
  {
    id: "6",
    name: "DevOps",
    slug: "devops",
    description: "CI/CD and cloud infrastructure",
    icon: "cloud",
    iconBgColor: "bg-cyan-500",
    courseCount: 15,
    order: 6,
  },
];

const iconOptions = [
  { value: "code", icon: "code", label: "Code" },
  { value: "smartphone", icon: "smartphone", label: "Mobile" },
  { value: "chart", icon: "chart", label: "Chart" },
  { value: "palette", icon: "palette", label: "Design" },
  { value: "server", icon: "server", label: "Server" },
  { value: "cloud", icon: "cloud", label: "Cloud" },
  { value: "book", icon: "book", label: "Book" },
  { value: "video", icon: "video", label: "Video" },
];

const colorOptions = [
  { value: "bg-blue-500", color: "#3B82F6" },
  { value: "bg-green-500", color: "#22C55E" },
  { value: "bg-purple-500", color: "#A855F7" },
  { value: "bg-pink-500", color: "#EC4899" },
  { value: "bg-orange-500", color: "#F97316" },
  { value: "bg-cyan-500", color: "#06B6D4" },
  { value: "bg-red-500", color: "#EF4444" },
  { value: "bg-yellow-500", color: "#EAB308" },
];

const IconComponent = ({ type }: { type: string }) => {
  switch (type) {
    case "code":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      );
    case "smartphone":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
          <line x1="12" y1="18" x2="12.01" y2="18" />
        </svg>
      );
    case "chart":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      );
    case "palette":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
          <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
          <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
          <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
          <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.555C21.965 6.012 17.461 2 12 2z" />
        </svg>
      );
    case "server":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
          <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
          <line x1="6" y1="6" x2="6.01" y2="6" />
          <line x1="6" y1="18" x2="6.01" y2="18" />
        </svg>
      );
    case "cloud":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
        </svg>
      );
    case "book":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </svg>
      );
    case "video":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="23 7 16 12 23 17 23 7" />
          <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
        </svg>
      );
    default:
      return null;
  }
};

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    icon: "code",
    iconBgColor: "bg-blue-500",
  });

  const handleAdd = () => {
    if (!formData.name) return;

    const newCategory: Category = {
      id: Date.now().toString(),
      name: formData.name,
      slug: formData.name.toLowerCase().replace(/\s+/g, "-"),
      description: formData.description,
      icon: formData.icon,
      iconBgColor: formData.iconBgColor,
      courseCount: 0,
      order: categories.length + 1,
    };

    setCategories([...categories, newCategory]);
    setFormData({ name: "", description: "", icon: "code", iconBgColor: "bg-blue-500" });
    setShowAddModal(false);
  };

  const handleEdit = () => {
    if (!editingCategory || !formData.name) return;

    setCategories((prev) =>
      prev.map((c) =>
        c.id === editingCategory.id
          ? {
              ...c,
              name: formData.name,
              slug: formData.name.toLowerCase().replace(/\s+/g, "-"),
              description: formData.description,
              icon: formData.icon,
              iconBgColor: formData.iconBgColor,
            }
          : c
      )
    );
    setEditingCategory(null);
    setFormData({ name: "", description: "", icon: "code", iconBgColor: "bg-blue-500" });
  };

  const handleDelete = (id: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
    setDeleteConfirm(null);
  };

  const openEditModal = (category: Category) => {
    setFormData({
      name: category.name,
      description: category.description,
      icon: category.icon,
      iconBgColor: category.iconBgColor,
    });
    setEditingCategory(category);
  };

  const totalCourses = categories.reduce((sum, c) => sum + c.courseCount, 0);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-primary font-outfit">
            Category Management
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Organize your courses into categories
          </p>
        </div>
        <AdminButton
          variant="secondary"
          onClick={() => setShowAddModal(true)}
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
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          }
        >
          Add Category
        </AdminButton>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <p className="text-sm text-gray-500">Total Categories</p>
          <p className="text-2xl font-bold text-primary mt-1">
            {categories.length}
          </p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <p className="text-sm text-gray-500">Total Courses</p>
          <p className="text-2xl font-bold text-secondary mt-1">{totalCourses}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 hidden sm:block">
          <p className="text-sm text-gray-500">Avg Courses/Category</p>
          <p className="text-2xl font-bold text-blue-600 mt-1">
            {Math.round(totalCourses / categories.length)}
          </p>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => (
          <AdminCard key={category.id} padding="md" className="group">
            <div className="flex items-start gap-4">
              {/* Icon */}
              <div
                className={`w-12 h-12 ${category.iconBgColor} rounded-xl flex items-center justify-center text-white flex-shrink-0`}
              >
                <IconComponent type={category.icon} />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold text-gray-900 truncate">
                    {category.name}
                  </h3>
                  <Badge variant="gray" size="sm">
                    {category.courseCount} courses
                  </Badge>
                </div>
                <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                  {category.description}
                </p>
                <p className="text-xs text-gray-400 mt-2">
                  /{category.slug}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100 opacity-0 group-hover:opacity-100 transition-opacity">
              <AdminButton
                variant="ghost"
                size="sm"
                className="flex-1"
                onClick={() => openEditModal(category)}
                icon={
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                }
              >
                Edit
              </AdminButton>
              <AdminButton
                variant="ghost"
                size="sm"
                className="text-red-500 hover:bg-red-50"
                onClick={() => setDeleteConfirm(category.id)}
                icon={
                  <svg
                    width="14"
                    height="14"
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
                Delete
              </AdminButton>
            </div>
          </AdminCard>
        ))}

        {/* Add Card */}
        <button
          onClick={() => setShowAddModal(true)}
          className="border-2 border-dashed border-gray-200 rounded-2xl p-6 flex flex-col items-center justify-center gap-3 text-gray-400 hover:border-primary hover:text-primary hover:bg-primary/5 transition-all duration-200 min-h-[180px]"
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          <span className="font-medium">Add New Category</span>
        </button>
      </div>

      {/* Add/Edit Modal */}
      {(showAddModal || editingCategory) && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => {
            setShowAddModal(false);
            setEditingCategory(null);
            setFormData({ name: "", description: "", icon: "code", iconBgColor: "bg-blue-500" });
          }}
        >
          <div
            className="bg-white rounded-2xl max-w-md w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              {editingCategory ? "Edit Category" : "Add New Category"}
            </h3>

            <div className="space-y-4">
              <AdminInput
                label="Category Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="e.g., Web Development"
                required
              />

              <AdminInput
                label="Description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Brief description of this category"
              />

              {/* Icon Selection */}
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-gray-700">
                  Icon
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {iconOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() =>
                        setFormData({ ...formData, icon: option.value })
                      }
                      className={`p-3 rounded-xl border-2 transition-all duration-200 ${
                        formData.icon === option.value
                          ? "border-primary bg-primary/5"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex flex-col items-center gap-1">
                        <IconComponent type={option.value} />
                        <span className="text-xs text-gray-500">
                          {option.label}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Selection */}
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-gray-700">
                  Icon Color
                </label>
                <div className="flex gap-2">
                  {colorOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() =>
                        setFormData({ ...formData, iconBgColor: option.value })
                      }
                      className={`w-8 h-8 rounded-full transition-all duration-200 ${
                        formData.iconBgColor === option.value
                          ? "ring-2 ring-offset-2 ring-primary scale-110"
                          : "hover:scale-105"
                      }`}
                      style={{ backgroundColor: option.color }}
                    />
                  ))}
                </div>
              </div>

              {/* Preview */}
              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-xs text-gray-500 mb-2">Preview</p>
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 ${formData.iconBgColor} rounded-lg flex items-center justify-center text-white`}
                  >
                    <IconComponent type={formData.icon} />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {formData.name || "Category Name"}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formData.description || "Description"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <AdminButton
                variant="outline"
                className="flex-1"
                onClick={() => {
                  setShowAddModal(false);
                  setEditingCategory(null);
                  setFormData({ name: "", description: "", icon: "code", iconBgColor: "bg-blue-500" });
                }}
              >
                Cancel
              </AdminButton>
              <AdminButton
                variant="primary"
                className="flex-1"
                onClick={editingCategory ? handleEdit : handleAdd}
              >
                {editingCategory ? "Save Changes" : "Add Category"}
              </AdminButton>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setDeleteConfirm(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-sm w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-red-500"
              >
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 text-center mb-2">
              Delete Category?
            </h3>
            <p className="text-sm text-gray-500 text-center mb-6">
              This action cannot be undone. All courses in this category will be
              uncategorized.
            </p>
            <div className="flex gap-3">
              <AdminButton
                variant="outline"
                className="flex-1"
                onClick={() => setDeleteConfirm(null)}
              >
                Cancel
              </AdminButton>
              <AdminButton
                variant="danger"
                className="flex-1"
                onClick={() => handleDelete(deleteConfirm)}
              >
                Delete
              </AdminButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
