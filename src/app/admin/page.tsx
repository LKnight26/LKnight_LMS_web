"use client";

import { useState } from "react";
import StatsCard from "@/components/admin/StatsCard";
import AdminCard from "@/components/admin/AdminCard";
import AdminButton from "@/components/admin/AdminButton";
import Badge from "@/components/admin/Badge";
import RevenueChart from "@/components/admin/RevenueChart";
import LineChart from "@/components/admin/LineChart";

// Icons
const RevenueIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-green-600"
  >
    <line x1="12" y1="1" x2="12" y2="23" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);

const UsersIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-blue-600"
  >
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const CoursesIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-purple-600"
  >
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </svg>
);

const EnrollmentsIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-orange-600"
  >
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
    <path d="M6 12v5c3 3 9 3 12 0v-5" />
  </svg>
);

// Mock data
const revenueData = [
  { label: "Jan", value: 4500 },
  { label: "Feb", value: 5200 },
  { label: "Mar", value: 4800 },
  { label: "Apr", value: 6100 },
  { label: "May", value: 5800 },
  { label: "Jun", value: 7200 },
  { label: "Jul", value: 6900 },
  { label: "Aug", value: 8100 },
  { label: "Sep", value: 7400 },
  { label: "Oct", value: 8900 },
  { label: "Nov", value: 9200 },
  { label: "Dec", value: 10500 },
];

const userGrowthData = [
  { label: "Jan", value: 120 },
  { label: "Feb", value: 180 },
  { label: "Mar", value: 250 },
  { label: "Apr", value: 320 },
  { label: "May", value: 410 },
  { label: "Jun", value: 520 },
  { label: "Jul", value: 650 },
  { label: "Aug", value: 780 },
  { label: "Sep", value: 920 },
  { label: "Oct", value: 1100 },
  { label: "Nov", value: 1350 },
  { label: "Dec", value: 1650 },
];

const recentEnrollments = [
  {
    id: 1,
    user: "John Doe",
    avatar: "JD",
    course: "Web Development Masterclass",
    price: 99,
    date: "2 hours ago",
    status: "completed",
  },
  {
    id: 2,
    user: "Sarah Smith",
    avatar: "SS",
    course: "React Advanced Patterns",
    price: 149,
    date: "5 hours ago",
    status: "completed",
  },
  {
    id: 3,
    user: "Mike Johnson",
    avatar: "MJ",
    course: "Node.js Backend Development",
    price: 129,
    date: "1 day ago",
    status: "completed",
  },
  {
    id: 4,
    user: "Emily Brown",
    avatar: "EB",
    course: "UI/UX Design Fundamentals",
    price: 79,
    date: "1 day ago",
    status: "pending",
  },
  {
    id: 5,
    user: "David Wilson",
    avatar: "DW",
    course: "Python for Data Science",
    price: 119,
    date: "2 days ago",
    status: "completed",
  },
];

const topCourses = [
  {
    id: 1,
    title: "Web Development Masterclass",
    enrollments: 1234,
    revenue: 122166,
    trend: 12,
    rating: 4.9,
  },
  {
    id: 2,
    title: "React Advanced Patterns",
    enrollments: 892,
    revenue: 132908,
    trend: 8,
    rating: 4.8,
  },
  {
    id: 3,
    title: "UI/UX Design Fundamentals",
    enrollments: 756,
    revenue: 59724,
    trend: -3,
    rating: 4.7,
  },
  {
    id: 4,
    title: "Node.js Backend Development",
    enrollments: 654,
    revenue: 84366,
    trend: 5,
    rating: 4.6,
  },
];

type Period = "daily" | "weekly" | "monthly" | "yearly";

export default function AdminDashboard() {
  const [period, setPeriod] = useState<Period>("monthly");

  return (
    <div className="space-y-6 lg:space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-primary font-outfit">
            Dashboard Overview
          </h1>
          <p className="text-gray-500 text-xs sm:text-sm mt-1">
            Welcome back! Here&apos;s what&apos;s happening with your LMS.
          </p>
        </div>
        <div className="flex items-center gap-1 bg-gray-100/80 p-1 rounded-xl overflow-x-auto">
          {(["daily", "weekly", "monthly", "yearly"] as Period[]).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium rounded-lg transition-all duration-200 whitespace-nowrap ${
                period === p
                  ? "bg-white text-primary shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
        <StatsCard
          title="Total Revenue"
          value="$84,574"
          change={{ value: 12.5, type: "increase" }}
          icon={<RevenueIcon />}
          iconBgColor="bg-green-50"
        />
        <StatsCard
          title="Total Users"
          value="2,847"
          change={{ value: 8.2, type: "increase" }}
          icon={<UsersIcon />}
          iconBgColor="bg-blue-50"
        />
        <StatsCard
          title="Total Courses"
          value="156"
          change={{ value: 3, type: "increase" }}
          icon={<CoursesIcon />}
          iconBgColor="bg-purple-50"
        />
        <StatsCard
          title="Enrollments"
          value="4,532"
          change={{ value: 2.1, type: "decrease" }}
          icon={<EnrollmentsIcon />}
          iconBgColor="bg-orange-50"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
        {/* Revenue Chart - Takes 2 columns on xl */}
        <AdminCard
          title="Revenue Overview"
          subtitle="Monthly revenue performance"
          action={
            <AdminButton variant="ghost" size="sm" className="hidden sm:inline-flex">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="mr-1.5"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Export
            </AdminButton>
          }
          className="xl:col-span-2"
        >
          <div className="h-64 sm:h-72 lg:h-80">
            <RevenueChart data={revenueData} />
          </div>
        </AdminCard>

        {/* User Growth Chart */}
        <AdminCard
          title="User Growth"
          subtitle="New registrations trend"
          action={
            <Badge variant="success" size="sm">
              +24.5%
            </Badge>
          }
        >
          <div className="h-64 sm:h-72 lg:h-80">
            <LineChart data={userGrowthData} color="#3B82F6" valuePrefix="" />
          </div>
        </AdminCard>
      </div>

      {/* Recent Activity Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Recent Enrollments */}
        <AdminCard
          title="Recent Enrollments"
          subtitle="Latest course purchases"
          action={
            <AdminButton variant="ghost" size="sm" href="/admin/users" className="hidden sm:inline-flex">
              View All
            </AdminButton>
          }
          padding="none"
        >
          <div className="divide-y divide-gray-50">
            {recentEnrollments.slice(0, 4).map((enrollment) => (
              <div
                key={enrollment.id}
                className="flex items-center gap-3 sm:gap-4 px-4 sm:px-6 py-3 sm:py-4 hover:bg-gray-50/50 transition-colors"
              >
                <div className="w-9 h-9 sm:w-11 sm:h-11 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                  <span className="text-white text-xs sm:text-sm font-semibold">
                    {enrollment.avatar}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm font-semibold text-gray-900 truncate">
                    {enrollment.user}
                  </p>
                  <p className="text-[10px] sm:text-xs text-gray-500 truncate mt-0.5">
                    {enrollment.course}
                  </p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-xs sm:text-sm font-bold text-primary">
                    ${enrollment.price}
                  </p>
                  <p className="text-[10px] sm:text-xs text-gray-400 mt-0.5">{enrollment.date}</p>
                </div>
              </div>
            ))}
          </div>
        </AdminCard>

        {/* Top Courses */}
        <AdminCard
          title="Top Performing Courses"
          subtitle="Ranked by revenue"
          action={
            <AdminButton variant="ghost" size="sm" href="/admin/courses" className="hidden sm:inline-flex">
              View All
            </AdminButton>
          }
          padding="none"
        >
          <div className="divide-y divide-gray-50">
            {topCourses.map((course, index) => (
              <div
                key={course.id}
                className="flex items-center gap-3 sm:gap-4 px-4 sm:px-6 py-3 sm:py-4 hover:bg-gray-50/50 transition-colors"
              >
                <div
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0 font-bold text-xs sm:text-sm shadow-sm ${
                    index === 0
                      ? "bg-gradient-to-br from-yellow-400 to-yellow-500 text-white"
                      : index === 1
                      ? "bg-gradient-to-br from-gray-300 to-gray-400 text-white"
                      : index === 2
                      ? "bg-gradient-to-br from-orange-400 to-orange-500 text-white"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm font-semibold text-gray-900 truncate">
                    {course.title}
                  </p>
                  <div className="flex items-center gap-1 sm:gap-2 mt-1">
                    <span className="text-[10px] sm:text-xs text-gray-500">
                      {course.enrollments.toLocaleString()} students
                    </span>
                    <span className="text-gray-300 hidden sm:inline">|</span>
                    <span className="text-[10px] sm:text-xs text-yellow-500 hidden sm:flex items-center gap-0.5">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                      {course.rating}
                    </span>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-xs sm:text-sm font-bold text-primary">
                    ${course.revenue.toLocaleString()}
                  </p>
                  <Badge
                    variant={course.trend >= 0 ? "success" : "danger"}
                    size="sm"
                  >
                    {course.trend >= 0 ? "+" : ""}
                    {course.trend}%
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </AdminCard>
      </div>

      {/* Quick Actions */}
      <AdminCard title="Quick Actions" subtitle="Frequently used shortcuts">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <AdminButton
            variant="outline"
            href="/admin/courses/new"
            icon={
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <line x1="12" y1="8" x2="12" y2="16" />
                <line x1="8" y1="12" x2="16" y2="12" />
              </svg>
            }
            className="justify-center flex-col gap-1.5 sm:gap-2 py-4 sm:py-6 hover:border-primary hover:bg-primary/5 text-xs sm:text-sm"
          >
            <span>Add Course</span>
          </AdminButton>
          <AdminButton
            variant="outline"
            href="/admin/categories"
            icon={
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
              </svg>
            }
            className="justify-center flex-col gap-1.5 sm:gap-2 py-4 sm:py-6 hover:border-primary hover:bg-primary/5 text-xs sm:text-sm"
          >
            <span>Categories</span>
          </AdminButton>
          <AdminButton
            variant="outline"
            href="/admin/users"
            icon={
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            }
            className="justify-center flex-col gap-1.5 sm:gap-2 py-4 sm:py-6 hover:border-primary hover:bg-primary/5 text-xs sm:text-sm"
          >
            <span>View Users</span>
          </AdminButton>
          <AdminButton
            variant="outline"
            href="/admin/analytics"
            icon={
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="20" x2="18" y2="10" />
                <line x1="12" y1="20" x2="12" y2="4" />
                <line x1="6" y1="20" x2="6" y2="14" />
              </svg>
            }
            className="justify-center flex-col gap-1.5 sm:gap-2 py-4 sm:py-6 hover:border-primary hover:bg-primary/5 text-xs sm:text-sm"
          >
            <span>Analytics</span>
          </AdminButton>
        </div>
      </AdminCard>
    </div>
  );
}
