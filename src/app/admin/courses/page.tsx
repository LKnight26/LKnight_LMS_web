"use client";

import { useState } from "react";
import Image from "next/image";
import AdminCard from "@/components/admin/AdminCard";
import AdminButton from "@/components/admin/AdminButton";
import AdminInput from "@/components/admin/AdminInput";
import AdminSelect from "@/components/admin/AdminSelect";
import Badge from "@/components/admin/Badge";
import DataTable from "@/components/admin/DataTable";

// Mock data
const coursesData = [
  {
    id: "1",
    title: "Web Development Masterclass",
    thumbnail: "/icon/bg.jpg",
    category: "Web Development",
    level: "Beginner",
    price: 99,
    status: "Published",
    enrollments: 1234,
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    title: "React Advanced Patterns",
    thumbnail: "/icon/bg.jpg",
    category: "Web Development",
    level: "Advanced",
    price: 149,
    status: "Published",
    enrollments: 892,
    createdAt: "2024-02-20",
  },
  {
    id: "3",
    title: "UI/UX Design Fundamentals",
    thumbnail: "/icon/bg.jpg",
    category: "Design",
    level: "Beginner",
    price: 79,
    status: "Draft",
    enrollments: 0,
    createdAt: "2024-03-10",
  },
  {
    id: "4",
    title: "Node.js Backend Development",
    thumbnail: "/icon/bg.jpg",
    category: "Backend",
    level: "Intermediate",
    price: 129,
    status: "Published",
    enrollments: 654,
    createdAt: "2024-01-25",
  },
  {
    id: "5",
    title: "Python for Data Science",
    thumbnail: "/icon/bg.jpg",
    category: "Data Science",
    level: "Intermediate",
    price: 119,
    status: "Published",
    enrollments: 789,
    createdAt: "2024-02-05",
  },
  {
    id: "6",
    title: "Mobile App Development with Flutter",
    thumbnail: "/icon/bg.jpg",
    category: "Mobile Development",
    level: "Intermediate",
    price: 139,
    status: "Draft",
    enrollments: 0,
    createdAt: "2024-03-15",
  },
];

const categoryOptions = [
  { value: "all", label: "All Categories" },
  { value: "web-development", label: "Web Development" },
  { value: "design", label: "Design" },
  { value: "backend", label: "Backend" },
  { value: "data-science", label: "Data Science" },
  { value: "mobile-development", label: "Mobile Development" },
];

const levelOptions = [
  { value: "all", label: "All Levels" },
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
];

const statusOptions = [
  { value: "all", label: "All Status" },
  { value: "published", label: "Published" },
  { value: "draft", label: "Draft" },
];

type Course = (typeof coursesData)[0];

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [levelFilter, setLevelFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredCourses = coursesData.filter((course) => {
    const matchesSearch = course.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" ||
      course.category.toLowerCase().replace(" ", "-") === categoryFilter;
    const matchesLevel =
      levelFilter === "all" ||
      course.level.toLowerCase() === levelFilter;
    const matchesStatus =
      statusFilter === "all" ||
      course.status.toLowerCase() === statusFilter;

    return matchesSearch && matchesCategory && matchesLevel && matchesStatus;
  });

  const columns = [
    {
      key: "title",
      header: "Course",
      render: (course: Course) => (
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-12 h-8 sm:w-16 sm:h-10 rounded-lg overflow-hidden bg-gray-100 shrink-0">
            <Image
              src={course.thumbnail}
              alt={course.title}
              width={64}
              height={40}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="min-w-0">
            <p className="font-medium text-gray-900 text-xs sm:text-sm line-clamp-1">
              {course.title}
            </p>
            <p className="text-[10px] sm:text-xs text-gray-500">{course.category}</p>
          </div>
        </div>
      ),
    },
    {
      key: "level",
      header: "Level",
      sortable: true,
      render: (course: Course) => (
        <Badge
          variant={
            course.level === "Beginner"
              ? "success"
              : course.level === "Intermediate"
              ? "warning"
              : "danger"
          }
          size="sm"
        >
          {course.level}
        </Badge>
      ),
    },
    {
      key: "price",
      header: "Price",
      sortable: true,
      render: (course: Course) => (
        <span className="font-semibold text-gray-900 text-xs sm:text-sm">${course.price}</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      sortable: true,
      render: (course: Course) => (
        <Badge variant={course.status === "Published" ? "primary" : "gray"} size="sm">
          {course.status}
        </Badge>
      ),
    },
    {
      key: "enrollments",
      header: "Enrollments",
      sortable: true,
      render: (course: Course) => (
        <span className="text-gray-700 text-xs sm:text-sm">
          {course.enrollments.toLocaleString()}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      render: (course: Course) => (
        <div className="flex items-center gap-1 sm:gap-2">
          <AdminButton
            variant="ghost"
            size="sm"
            href={`/admin/courses/${course.id}`}
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
                className="sm:w-4 sm:h-4"
              >
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
            }
            className="px-2 sm:px-3"
          >
            <span className="hidden sm:inline">Edit</span>
          </AdminButton>
          <AdminButton
            variant="ghost"
            size="sm"
            href={`/admin/courses/${course.id}/modules`}
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
                className="sm:w-4 sm:h-4"
              >
                <line x1="8" y1="6" x2="21" y2="6" />
                <line x1="8" y1="12" x2="21" y2="12" />
                <line x1="8" y1="18" x2="21" y2="18" />
                <line x1="3" y1="6" x2="3.01" y2="6" />
                <line x1="3" y1="12" x2="3.01" y2="12" />
                <line x1="3" y1="18" x2="3.01" y2="18" />
              </svg>
            }
            className="hidden sm:inline-flex"
          >
            Modules
          </AdminButton>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-primary font-outfit">
            Course Management
          </h1>
          <p className="text-gray-500 text-xs sm:text-sm mt-1">
            Manage all courses, modules, and lessons
          </p>
        </div>
        <AdminButton
          variant="secondary"
          href="/admin/courses/new"
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
          Add New Course
        </AdminButton>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white rounded-xl p-3 sm:p-4 border border-gray-100">
          <p className="text-xs sm:text-sm text-gray-500">Total Courses</p>
          <p className="text-xl sm:text-2xl font-bold text-primary mt-0.5 sm:mt-1">
            {coursesData.length}
          </p>
        </div>
        <div className="bg-white rounded-xl p-3 sm:p-4 border border-gray-100">
          <p className="text-xs sm:text-sm text-gray-500">Published</p>
          <p className="text-xl sm:text-2xl font-bold text-green-600 mt-0.5 sm:mt-1">
            {coursesData.filter((c) => c.status === "Published").length}
          </p>
        </div>
        <div className="bg-white rounded-xl p-3 sm:p-4 border border-gray-100">
          <p className="text-xs sm:text-sm text-gray-500">Drafts</p>
          <p className="text-xl sm:text-2xl font-bold text-yellow-600 mt-0.5 sm:mt-1">
            {coursesData.filter((c) => c.status === "Draft").length}
          </p>
        </div>
        <div className="bg-white rounded-xl p-3 sm:p-4 border border-gray-100">
          <p className="text-xs sm:text-sm text-gray-500">Total Enrollments</p>
          <p className="text-xl sm:text-2xl font-bold text-secondary mt-0.5 sm:mt-1">
            {coursesData
              .reduce((sum, c) => sum + c.enrollments, 0)
              .toLocaleString()}
          </p>
        </div>
      </div>

      {/* Filters */}
      <AdminCard padding="md">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
          <div className="sm:col-span-2 lg:col-span-2">
            <AdminInput
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              }
            />
          </div>
          <AdminSelect
            options={categoryOptions}
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            placeholder="Category"
          />
          <AdminSelect
            options={levelOptions}
            value={levelFilter}
            onChange={(e) => setLevelFilter(e.target.value)}
            placeholder="Level"
          />
          <AdminSelect
            options={statusOptions}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            placeholder="Status"
          />
        </div>
      </AdminCard>

      {/* Courses Table */}
      <AdminCard padding="none">
        <DataTable
          columns={columns}
          data={filteredCourses}
          emptyMessage="No courses found matching your criteria"
        />

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 px-4 sm:px-6 py-3 sm:py-4 border-t border-gray-100">
          <p className="text-xs sm:text-sm text-gray-500">
            Showing {filteredCourses.length} of {coursesData.length} courses
          </p>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <AdminButton variant="outline" size="sm" disabled>
              Previous
            </AdminButton>
            <AdminButton variant="primary" size="sm">
              1
            </AdminButton>
            <AdminButton variant="outline" size="sm" className="hidden sm:inline-flex">
              2
            </AdminButton>
            <AdminButton variant="outline" size="sm">
              Next
            </AdminButton>
          </div>
        </div>
      </AdminCard>
    </div>
  );
}
