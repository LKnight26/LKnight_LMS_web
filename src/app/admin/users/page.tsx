"use client";

import { useState } from "react";
import AdminCard from "@/components/admin/AdminCard";
import AdminButton from "@/components/admin/AdminButton";
import AdminInput from "@/components/admin/AdminInput";
import AdminSelect from "@/components/admin/AdminSelect";
import Badge from "@/components/admin/Badge";
import DataTable from "@/components/admin/DataTable";

// Mock data
const usersData = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "JD",
    role: "Student",
    enrolledCourses: 5,
    status: "Active",
    joinedAt: "2024-01-15",
  },
  {
    id: "2",
    name: "Sarah Smith",
    email: "sarah.smith@example.com",
    avatar: "SS",
    role: "Student",
    enrolledCourses: 3,
    status: "Active",
    joinedAt: "2024-02-20",
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike.j@example.com",
    avatar: "MJ",
    role: "Instructor",
    enrolledCourses: 0,
    status: "Active",
    joinedAt: "2023-12-10",
  },
  {
    id: "4",
    name: "Emily Brown",
    email: "emily.b@example.com",
    avatar: "EB",
    role: "Student",
    enrolledCourses: 8,
    status: "Active",
    joinedAt: "2024-01-25",
  },
  {
    id: "5",
    name: "David Wilson",
    email: "david.w@example.com",
    avatar: "DW",
    role: "Student",
    enrolledCourses: 2,
    status: "Inactive",
    joinedAt: "2024-03-05",
  },
  {
    id: "6",
    name: "Jessica Taylor",
    email: "jessica.t@example.com",
    avatar: "JT",
    role: "Admin",
    enrolledCourses: 0,
    status: "Active",
    joinedAt: "2023-06-15",
  },
  {
    id: "7",
    name: "Chris Anderson",
    email: "chris.a@example.com",
    avatar: "CA",
    role: "Instructor",
    enrolledCourses: 0,
    status: "Active",
    joinedAt: "2024-02-01",
  },
  {
    id: "8",
    name: "Amanda Martinez",
    email: "amanda.m@example.com",
    avatar: "AM",
    role: "Student",
    enrolledCourses: 12,
    status: "Active",
    joinedAt: "2023-11-20",
  },
];

const roleOptions = [
  { value: "all", label: "All Roles" },
  { value: "admin", label: "Admin" },
  { value: "instructor", label: "Instructor" },
  { value: "student", label: "Student" },
];

const statusOptions = [
  { value: "all", label: "All Status" },
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
];

type User = (typeof usersData)[0];

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const filteredUsers = usersData.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole =
      roleFilter === "all" || user.role.toLowerCase() === roleFilter;
    const matchesStatus =
      statusFilter === "all" || user.status.toLowerCase() === statusFilter;

    return matchesSearch && matchesRole && matchesStatus;
  });

  const columns = [
    {
      key: "name",
      header: "User",
      render: (user: User) => (
        <div className="flex items-center gap-2 sm:gap-3">
          <div
            className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shrink-0 ${
              user.role === "Admin"
                ? "bg-purple-100 text-purple-700"
                : user.role === "Instructor"
                ? "bg-blue-100 text-blue-700"
                : "bg-primary/10 text-primary"
            }`}
          >
            <span className="text-xs sm:text-sm font-semibold">{user.avatar}</span>
          </div>
          <div className="min-w-0">
            <p className="font-medium text-gray-900 text-xs sm:text-sm truncate">{user.name}</p>
            <p className="text-[10px] sm:text-xs text-gray-500 truncate">{user.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: "role",
      header: "Role",
      sortable: true,
      render: (user: User) => (
        <Badge
          variant={
            user.role === "Admin"
              ? "secondary"
              : user.role === "Instructor"
              ? "primary"
              : "gray"
          }
          size="sm"
        >
          {user.role}
        </Badge>
      ),
    },
    {
      key: "enrolledCourses",
      header: "Enrolled",
      sortable: true,
      render: (user: User) => (
        <span className="text-gray-700 text-xs sm:text-sm">
          {user.enrolledCourses > 0
            ? `${user.enrolledCourses} courses`
            : "-"}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      sortable: true,
      render: (user: User) => (
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span
            className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${
              user.status === "Active" ? "bg-green-500" : "bg-gray-400"
            }`}
          />
          <span
            className={`text-xs sm:text-sm ${
              user.status === "Active" ? "text-green-600" : "text-gray-500"
            }`}
          >
            {user.status}
          </span>
        </div>
      ),
    },
    {
      key: "joinedAt",
      header: "Joined",
      sortable: true,
      render: (user: User) => (
        <span className="text-gray-500 text-xs sm:text-sm">
          {new Date(user.joinedAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      render: (user: User) => (
        <div className="flex items-center gap-1 sm:gap-2">
          <AdminButton
            variant="ghost"
            size="sm"
            onClick={() => setSelectedUser(user)}
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
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            }
            className="px-2 sm:px-3"
          >
            <span className="hidden sm:inline">View</span>
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
            User Management
          </h1>
          <p className="text-gray-500 text-xs sm:text-sm mt-1">
            View and manage all registered users
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white rounded-xl p-3 sm:p-4 border border-gray-100">
          <p className="text-xs sm:text-sm text-gray-500">Total Users</p>
          <p className="text-xl sm:text-2xl font-bold text-primary mt-0.5 sm:mt-1">
            {usersData.length}
          </p>
        </div>
        <div className="bg-white rounded-xl p-3 sm:p-4 border border-gray-100">
          <p className="text-xs sm:text-sm text-gray-500">Students</p>
          <p className="text-xl sm:text-2xl font-bold text-blue-600 mt-0.5 sm:mt-1">
            {usersData.filter((u) => u.role === "Student").length}
          </p>
        </div>
        <div className="bg-white rounded-xl p-3 sm:p-4 border border-gray-100">
          <p className="text-xs sm:text-sm text-gray-500">Instructors</p>
          <p className="text-xl sm:text-2xl font-bold text-purple-600 mt-0.5 sm:mt-1">
            {usersData.filter((u) => u.role === "Instructor").length}
          </p>
        </div>
        <div className="bg-white rounded-xl p-3 sm:p-4 border border-gray-100">
          <p className="text-xs sm:text-sm text-gray-500">Active</p>
          <p className="text-xl sm:text-2xl font-bold text-green-600 mt-0.5 sm:mt-1">
            {usersData.filter((u) => u.status === "Active").length}
          </p>
        </div>
      </div>

      {/* Filters */}
      <AdminCard padding="md">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className="sm:col-span-2 lg:col-span-2">
            <AdminInput
              placeholder="Search by name or email..."
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
            options={roleOptions}
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            placeholder="Role"
          />
          <AdminSelect
            options={statusOptions}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            placeholder="Status"
          />
        </div>
      </AdminCard>

      {/* Users Table */}
      <AdminCard padding="none">
        <DataTable
          columns={columns}
          data={filteredUsers}
          emptyMessage="No users found matching your criteria"
        />

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 px-4 sm:px-6 py-3 sm:py-4 border-t border-gray-100">
          <p className="text-xs sm:text-sm text-gray-500">
            Showing {filteredUsers.length} of {usersData.length} users
          </p>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <AdminButton variant="outline" size="sm" disabled>
              Previous
            </AdminButton>
            <AdminButton variant="primary" size="sm">
              1
            </AdminButton>
            <AdminButton variant="outline" size="sm">
              Next
            </AdminButton>
          </div>
        </div>
      </AdminCard>

      {/* User Detail Modal */}
      {selectedUser && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-3 sm:p-4"
          onClick={() => setSelectedUser(null)}
        >
          <div
            className="bg-white rounded-xl sm:rounded-2xl max-w-md w-full p-4 sm:p-6 animate-in fade-in zoom-in duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4 sm:mb-6">
              <div className="flex items-center gap-3 sm:gap-4">
                <div
                  className={`w-10 h-10 sm:w-14 sm:h-14 rounded-full flex items-center justify-center ${
                    selectedUser.role === "Admin"
                      ? "bg-purple-100 text-purple-700"
                      : selectedUser.role === "Instructor"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-primary/10 text-primary"
                  }`}
                >
                  <span className="text-base sm:text-xl font-bold">{selectedUser.avatar}</span>
                </div>
                <div className="min-w-0">
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 truncate">
                    {selectedUser.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 truncate">{selectedUser.email}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedUser(null)}
                className="p-1.5 sm:p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="sm:w-5 sm:h-5"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Details */}
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center justify-between py-2 sm:py-3 border-b border-gray-100">
                <span className="text-xs sm:text-sm text-gray-500">Role</span>
                <Badge
                  variant={
                    selectedUser.role === "Admin"
                      ? "secondary"
                      : selectedUser.role === "Instructor"
                      ? "primary"
                      : "gray"
                  }
                  size="sm"
                >
                  {selectedUser.role}
                </Badge>
              </div>
              <div className="flex items-center justify-between py-2 sm:py-3 border-b border-gray-100">
                <span className="text-xs sm:text-sm text-gray-500">Status</span>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span
                    className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${
                      selectedUser.status === "Active"
                        ? "bg-green-500"
                        : "bg-gray-400"
                    }`}
                  />
                  <span className="text-xs sm:text-sm font-medium">
                    {selectedUser.status}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between py-2 sm:py-3 border-b border-gray-100">
                <span className="text-xs sm:text-sm text-gray-500">Enrolled Courses</span>
                <span className="text-xs sm:text-sm font-medium">
                  {selectedUser.enrolledCourses}
                </span>
              </div>
              <div className="flex items-center justify-between py-2 sm:py-3 border-b border-gray-100">
                <span className="text-xs sm:text-sm text-gray-500">Joined</span>
                <span className="text-xs sm:text-sm font-medium">
                  {new Date(selectedUser.joinedAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 sm:gap-3 mt-4 sm:mt-6">
              <AdminButton
                variant="outline"
                className="flex-1"
                size="sm"
                onClick={() => setSelectedUser(null)}
              >
                Close
              </AdminButton>
              {selectedUser.status === "Active" ? (
                <AdminButton variant="danger" className="flex-1" size="sm">
                  Deactivate
                </AdminButton>
              ) : (
                <AdminButton variant="primary" className="flex-1" size="sm">
                  Activate
                </AdminButton>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
