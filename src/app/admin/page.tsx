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
];

const userGrowthData = [
  { label: "Jan", value: 120 },
  { label: "Feb", value: 180 },
  { label: "Mar", value: 250 },
  { label: "Apr", value: 320 },
  { label: "May", value: 410 },
  { label: "Jun", value: 520 },
  { label: "Jul", value: 650 },
];

const recentEnrollments = [
  {
    id: 1,
    user: "John Doe",
    avatar: "JD",
    course: "Web Development Masterclass",
    price: 99,
    date: "2 hours ago",
  },
  {
    id: 2,
    user: "Sarah Smith",
    avatar: "SS",
    course: "React Advanced Patterns",
    price: 149,
    date: "5 hours ago",
  },
  {
    id: 3,
    user: "Mike Johnson",
    avatar: "MJ",
    course: "Node.js Backend Development",
    price: 129,
    date: "1 day ago",
  },
  {
    id: 4,
    user: "Emily Brown",
    avatar: "EB",
    course: "UI/UX Design Fundamentals",
    price: 79,
    date: "1 day ago",
  },
  {
    id: 5,
    user: "David Wilson",
    avatar: "DW",
    course: "Python for Data Science",
    price: 119,
    date: "2 days ago",
  },
];

const topCourses = [
  {
    id: 1,
    title: "Web Development Masterclass",
    enrollments: 1234,
    revenue: 122166,
    trend: "up",
  },
  {
    id: 2,
    title: "React Advanced Patterns",
    enrollments: 892,
    revenue: 132908,
    trend: "up",
  },
  {
    id: 3,
    title: "UI/UX Design Fundamentals",
    enrollments: 756,
    revenue: 59724,
    trend: "down",
  },
  {
    id: 4,
    title: "Node.js Backend Development",
    enrollments: 654,
    revenue: 84366,
    trend: "up",
  },
];

type Period = "daily" | "weekly" | "monthly" | "yearly";

export default function AdminDashboard() {
  const [period, setPeriod] = useState<Period>("monthly");

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-primary font-outfit">
            Dashboard Overview
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Welcome back! Here&apos;s what&apos;s happening with your LMS.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {(["daily", "weekly", "monthly", "yearly"] as Period[]).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 ${
                period === p
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <StatsCard
          title="Total Revenue"
          value="$48,574"
          change={{ value: 12.5, type: "increase" }}
          icon={<RevenueIcon />}
          iconBgColor="bg-green-100"
        />
        <StatsCard
          title="Total Users"
          value="2,847"
          change={{ value: 8.2, type: "increase" }}
          icon={<UsersIcon />}
          iconBgColor="bg-blue-100"
        />
        <StatsCard
          title="Total Courses"
          value="156"
          change={{ value: 3, type: "increase" }}
          icon={<CoursesIcon />}
          iconBgColor="bg-purple-100"
        />
        <StatsCard
          title="Enrollments"
          value="4,532"
          change={{ value: 2.1, type: "decrease" }}
          icon={<EnrollmentsIcon />}
          iconBgColor="bg-orange-100"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <AdminCard
          title="Revenue Overview"
          subtitle="Monthly revenue for the current year"
          action={
            <AdminButton variant="ghost" size="sm">
              View Report
            </AdminButton>
          }
        >
          <div className="h-64">
            <RevenueChart data={revenueData} />
          </div>
        </AdminCard>

        {/* User Growth Chart */}
        <AdminCard
          title="User Growth"
          subtitle="New user registrations over time"
          action={
            <AdminButton variant="ghost" size="sm">
              View All
            </AdminButton>
          }
        >
          <div className="h-64 pb-6">
            <LineChart data={userGrowthData} />
          </div>
        </AdminCard>
      </div>

      {/* Recent Activity Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Enrollments */}
        <AdminCard
          title="Recent Enrollments"
          subtitle="Latest course purchases"
          action={
            <AdminButton variant="ghost" size="sm" href="/admin/users">
              View All
            </AdminButton>
          }
          padding="none"
        >
          <div className="divide-y divide-gray-100">
            {recentEnrollments.map((enrollment) => (
              <div
                key={enrollment.id}
                className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-colors"
              >
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm font-medium">
                    {enrollment.avatar}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {enrollment.user}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {enrollment.course}
                  </p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-semibold text-primary">
                    ${enrollment.price}
                  </p>
                  <p className="text-xs text-gray-400">{enrollment.date}</p>
                </div>
              </div>
            ))}
          </div>
        </AdminCard>

        {/* Top Courses */}
        <AdminCard
          title="Top Performing Courses"
          subtitle="Courses with highest enrollments"
          action={
            <AdminButton variant="ghost" size="sm" href="/admin/courses">
              View All
            </AdminButton>
          }
          padding="none"
        >
          <div className="divide-y divide-gray-100">
            {topCourses.map((course, index) => (
              <div
                key={course.id}
                className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-colors"
              >
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 font-bold text-sm ${
                    index === 0
                      ? "bg-yellow-100 text-yellow-700"
                      : index === 1
                      ? "bg-gray-200 text-gray-600"
                      : index === 2
                      ? "bg-orange-100 text-orange-700"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  #{index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {course.title}
                  </p>
                  <p className="text-xs text-gray-500">
                    {course.enrollments.toLocaleString()} enrollments
                  </p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-semibold text-primary">
                    ${course.revenue.toLocaleString()}
                  </p>
                  <Badge
                    variant={course.trend === "up" ? "success" : "danger"}
                    size="sm"
                  >
                    {course.trend === "up" ? "+" : "-"}
                    {Math.floor(Math.random() * 10 + 1)}%
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </AdminCard>
      </div>

      {/* Quick Actions */}
      <AdminCard title="Quick Actions" subtitle="Frequently used actions">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <AdminButton
            variant="outline"
            href="/admin/courses/new"
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
            className="justify-start"
          >
            Add Course
          </AdminButton>
          <AdminButton
            variant="outline"
            href="/admin/categories"
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
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
              </svg>
            }
            className="justify-start"
          >
            Categories
          </AdminButton>
          <AdminButton
            variant="outline"
            href="/admin/users"
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
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
              </svg>
            }
            className="justify-start"
          >
            View Users
          </AdminButton>
          <AdminButton
            variant="outline"
            href="/admin/analytics"
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
                <line x1="18" y1="20" x2="18" y2="10" />
                <line x1="12" y1="20" x2="12" y2="4" />
                <line x1="6" y1="20" x2="6" y2="14" />
              </svg>
            }
            className="justify-start"
          >
            Analytics
          </AdminButton>
        </div>
      </AdminCard>
    </div>
  );
}
