"use client";

import { useState, useEffect } from "react";
import AdminCard from "@/components/admin/AdminCard";
import AdminButton from "@/components/admin/AdminButton";
import AdminInput from "@/components/admin/AdminInput";
import Badge from "@/components/admin/Badge";
import { categoryApi, Category } from "@/lib/api";

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
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    icon: "code",
    iconBgColor: "bg-blue-500",
  });

  // Fetch categories on mount
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      const response = await categoryApi.getAll();
      if (response.success && response.data) {
        setCategories(response.data);
      }
    } catch (err) {
      console.error("Failed to fetch categories:", err);
      setError("Failed to load categories");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdd = async () => {
    if (!formData.name) return;

    setIsSaving(true);
    setError(null);
    try {
      const response = await categoryApi.create({
        name: formData.name,
        description: formData.description,
        icon: formData.icon,
        iconBgColor: formData.iconBgColor,
      });

      if (response.success && response.data) {
        setCategories([...categories, response.data]);
        setFormData({ name: "", description: "", icon: "code", iconBgColor: "bg-blue-500" });
        setShowAddModal(false);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create category");
    } finally {
      setIsSaving(false);
    }
  };

  const handleEdit = async () => {
    if (!editingCategory || !formData.name) return;

    setIsSaving(true);
    setError(null);
    try {
      const response = await categoryApi.update(editingCategory.id, {
        name: formData.name,
        description: formData.description,
        icon: formData.icon,
        iconBgColor: formData.iconBgColor,
      });

      if (response.success && response.data) {
        setCategories((prev) =>
          prev.map((c) => (c.id === editingCategory.id ? response.data! : c))
        );
        setEditingCategory(null);
        setFormData({ name: "", description: "", icon: "code", iconBgColor: "bg-blue-500" });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update category");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    setIsSaving(true);
    setError(null);
    try {
      const response = await categoryApi.delete(id);
      if (response.success) {
        setCategories((prev) => prev.filter((c) => c.id !== id));
        setDeleteConfirm(null);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete category");
    } finally {
      setIsSaving(false);
    }
  };

  const openEditModal = (category: Category) => {
    setFormData({
      name: category.name,
      description: category.description || "",
      icon: category.icon || "code",
      iconBgColor: category.iconBgColor || "bg-blue-500",
    });
    setEditingCategory(category);
  };

  const totalCourses = categories.reduce((sum, c) => sum + (c.courseCount || 0), 0);

  // Loading skeleton
  if (isLoading) {
    return (
      <div className="space-y-4 sm:space-y-6 animate-pulse">
        <div className="flex justify-between">
          <div>
            <div className="h-8 bg-gray-200 rounded w-48 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-64"></div>
          </div>
          <div className="h-10 bg-gray-200 rounded w-32"></div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-xl p-4 h-24"></div>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white rounded-xl p-6 h-40"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Error Message */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
          {error}
          <button onClick={() => setError(null)} className="ml-2 underline">
            Dismiss
          </button>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-primary font-outfit">
            Category Management
          </h1>
          <p className="text-gray-500 text-xs sm:text-sm mt-1">
            Organize your courses into categories
          </p>
        </div>
        <AdminButton
          variant="secondary"
          onClick={() => setShowAddModal(true)}
          size="sm"
          className="self-start sm:self-auto"
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
              className="sm:w-4.5 sm:h-4.5"
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
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
        <div className="bg-white rounded-xl p-3 sm:p-4 border border-gray-100">
          <p className="text-xs sm:text-sm text-gray-500">Total Categories</p>
          <p className="text-xl sm:text-2xl font-bold text-primary mt-0.5 sm:mt-1">
            {categories.length}
          </p>
        </div>
        <div className="bg-white rounded-xl p-3 sm:p-4 border border-gray-100">
          <p className="text-xs sm:text-sm text-gray-500">Total Courses</p>
          <p className="text-xl sm:text-2xl font-bold text-secondary mt-0.5 sm:mt-1">{totalCourses}</p>
        </div>
        <div className="bg-white rounded-xl p-3 sm:p-4 border border-gray-100 hidden sm:block">
          <p className="text-xs sm:text-sm text-gray-500">Avg Courses/Category</p>
          <p className="text-xl sm:text-2xl font-bold text-blue-600 mt-0.5 sm:mt-1">
            {categories.length > 0 ? Math.round(totalCourses / categories.length) : 0}
          </p>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {categories.map((category) => (
          <AdminCard key={category.id} padding="md" className="group">
            <div className="flex items-start gap-3 sm:gap-4">
              {/* Icon */}
              <div
                className={`w-10 h-10 sm:w-12 sm:h-12 ${category.iconBgColor || "bg-blue-500"} rounded-lg sm:rounded-xl flex items-center justify-center text-white shrink-0`}
              >
                <IconComponent type={category.icon || "code"} />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold text-gray-900 truncate text-sm sm:text-base">
                    {category.name}
                  </h3>
                  <Badge variant="gray" size="sm">
                    {category.courseCount || 0}
                  </Badge>
                </div>
                <p className="text-xs sm:text-sm text-gray-500 mt-0.5 sm:mt-1 line-clamp-2">
                  {category.description || "No description"}
                </p>
                <p className="text-[10px] sm:text-xs text-gray-400 mt-1.5 sm:mt-2">
                  /{category.slug}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
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
          className="border-2 border-dashed border-gray-200 rounded-xl sm:rounded-2xl p-4 sm:p-6 flex flex-col items-center justify-center gap-2 sm:gap-3 text-gray-400 hover:border-primary hover:text-primary hover:bg-primary/5 transition-all duration-200 min-h-[140px] sm:min-h-[180px]"
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="sm:w-8 sm:h-8"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          <span className="font-medium text-sm sm:text-base">Add New Category</span>
        </button>
      </div>

      {/* Add/Edit Modal */}
      {(showAddModal || editingCategory) && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-3 sm:p-4"
          onClick={() => {
            setShowAddModal(false);
            setEditingCategory(null);
            setFormData({ name: "", description: "", icon: "code", iconBgColor: "bg-blue-500" });
          }}
        >
          <div
            className="bg-white rounded-xl sm:rounded-2xl max-w-md w-full p-4 sm:p-6 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4">
              {editingCategory ? "Edit Category" : "Add New Category"}
            </h3>

            <div className="space-y-3 sm:space-y-4">
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
                <label className="block text-xs sm:text-sm font-medium text-gray-700">
                  Icon
                </label>
                <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
                  {iconOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() =>
                        setFormData({ ...formData, icon: option.value })
                      }
                      className={`p-2 sm:p-3 rounded-lg sm:rounded-xl border-2 transition-all duration-200 ${
                        formData.icon === option.value
                          ? "border-primary bg-primary/5"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex flex-col items-center gap-0.5 sm:gap-1">
                        <IconComponent type={option.value} />
                        <span className="text-[10px] sm:text-xs text-gray-500">
                          {option.label}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Selection */}
              <div className="space-y-1.5">
                <label className="block text-xs sm:text-sm font-medium text-gray-700">
                  Icon Color
                </label>
                <div className="flex gap-1.5 sm:gap-2 flex-wrap">
                  {colorOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() =>
                        setFormData({ ...formData, iconBgColor: option.value })
                      }
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full transition-all duration-200 ${
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
              <div className="p-3 sm:p-4 bg-gray-50 rounded-lg sm:rounded-xl">
                <p className="text-[10px] sm:text-xs text-gray-500 mb-1.5 sm:mb-2">Preview</p>
                <div className="flex items-center gap-2 sm:gap-3">
                  <div
                    className={`w-8 h-8 sm:w-10 sm:h-10 ${formData.iconBgColor} rounded-lg flex items-center justify-center text-white`}
                  >
                    <IconComponent type={formData.icon} />
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium text-gray-900 text-sm sm:text-base truncate">
                      {formData.name || "Category Name"}
                    </p>
                    <p className="text-[10px] sm:text-xs text-gray-500 truncate">
                      {formData.description || "Description"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-2 sm:gap-3 mt-4 sm:mt-6">
              <AdminButton
                variant="outline"
                className="flex-1"
                size="sm"
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
                size="sm"
                onClick={editingCategory ? handleEdit : handleAdd}
                disabled={isSaving}
              >
                {isSaving ? "Saving..." : editingCategory ? "Save Changes" : "Add Category"}
              </AdminButton>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-3 sm:p-4"
          onClick={() => setDeleteConfirm(null)}
        >
          <div
            className="bg-white rounded-xl sm:rounded-2xl max-w-sm w-full p-4 sm:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-red-500 sm:w-6 sm:h-6"
              >
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-gray-900 text-center mb-1.5 sm:mb-2">
              Delete Category?
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 text-center mb-4 sm:mb-6">
              This action cannot be undone. All courses in this category will be
              uncategorized.
            </p>
            <div className="flex gap-2 sm:gap-3">
              <AdminButton
                variant="outline"
                className="flex-1"
                size="sm"
                onClick={() => setDeleteConfirm(null)}
              >
                Cancel
              </AdminButton>
              <AdminButton
                variant="danger"
                className="flex-1"
                size="sm"
                onClick={() => handleDelete(deleteConfirm)}
                disabled={isSaving}
              >
                {isSaving ? "Deleting..." : "Delete"}
              </AdminButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
