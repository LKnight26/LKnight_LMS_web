"use client";

import { useState } from "react";
import AdminCard from "@/components/admin/AdminCard";
import AdminButton from "@/components/admin/AdminButton";
import StatsCard from "@/components/admin/StatsCard";
import RevenueChart from "@/components/admin/RevenueChart";
import LineChart from "@/components/admin/LineChart";
import Badge from "@/components/admin/Badge";

// Mock data
const monthlyRevenue = [
  { label: "Jan", value: 12500 },
  { label: "Feb", value: 15200 },
  { label: "Mar", value: 14800 },
  { label: "Apr", value: 18100 },
  { label: "May", value: 17800 },
  { label: "Jun", value: 21200 },
  { label: "Jul", value: 19900 },
  { label: "Aug", value: 23400 },
  { label: "Sep", value: 22100 },
  { label: "Oct", value: 25600 },
  { label: "Nov", value: 24300 },
  { label: "Dec", value: 28500 },
];

const userGrowth = [
  { label: "Jan", value: 320 },
  { label: "Feb", value: 480 },
  { label: "Mar", value: 650 },
  { label: "Apr", value: 820 },
  { label: "May", value: 1010 },
  { label: "Jun", value: 1320 },
  { label: "Jul", value: 1550 },
  { label: "Aug", value: 1840 },
  { label: "Sep", value: 2120 },
  { label: "Oct", value: 2450 },
  { label: "Nov", value: 2680 },
  { label: "Dec", value: 2847 },
];

const enrollmentsByMonth = [
  { label: "Jan", value: 245 },
  { label: "Feb", value: 312 },
  { label: "Mar", value: 289 },
  { label: "Apr", value: 378 },
  { label: "May", value: 356 },
  { label: "Jun", value: 423 },
  { label: "Jul", value: 401 },
  { label: "Aug", value: 467 },
  { label: "Sep", value: 445 },
  { label: "Oct", value: 512 },
  { label: "Nov", value: 489 },
  { label: "Dec", value: 534 },
];

const topCourses = [
  { name: "Web Development Masterclass", revenue: 45200, enrollments: 456, trend: 12 },
  { name: "React Advanced Patterns", revenue: 38900, enrollments: 312, trend: 8 },
  { name: "Python for Data Science", revenue: 32400, enrollments: 287, trend: 15 },
  { name: "Node.js Backend Development", revenue: 28700, enrollments: 234, trend: -3 },
  { name: "UI/UX Design Fundamentals", revenue: 24100, enrollments: 198, trend: 5 },
];

const revenueByCategory = [
  { name: "Web Development", value: 85400, percentage: 35 },
  { name: "Mobile Development", value: 48200, percentage: 20 },
  { name: "Data Science", value: 41600, percentage: 17 },
  { name: "Backend", value: 36400, percentage: 15 },
  { name: "Design", value: 31400, percentage: 13 },
];

type Period = "7d" | "30d" | "90d" | "12m" | "all";

export default function AnalyticsPage() {
  const [period, setPeriod] = useState<Period>("30d");

  const totalRevenue = monthlyRevenue.reduce((sum, m) => sum + m.value, 0);
  const totalEnrollments = enrollmentsByMonth.reduce((sum, m) => sum + m.value, 0);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-primary font-outfit">
            Analytics & Reports
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Track your LMS performance and insights
          </p>
        </div>
        <div className="flex items-center gap-2">
          {(
            [
              { value: "7d", label: "7 Days" },
              { value: "30d", label: "30 Days" },
              { value: "90d", label: "90 Days" },
              { value: "12m", label: "12 Months" },
              { value: "all", label: "All Time" },
            ] as { value: Period; label: string }[]
          ).map((p) => (
            <button
              key={p.value}
              onClick={() => setPeriod(p.value)}
              className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                period === p.value
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Revenue"
          value={`$${totalRevenue.toLocaleString()}`}
          change={{ value: 18.2, type: "increase" }}
          icon={
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
          }
          iconBgColor="bg-green-100"
        />
        <StatsCard
          title="Total Users"
          value="2,847"
          change={{ value: 12.5, type: "increase" }}
          icon={
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
          }
          iconBgColor="bg-blue-100"
        />
        <StatsCard
          title="Enrollments"
          value={totalEnrollments.toLocaleString()}
          change={{ value: 8.7, type: "increase" }}
          icon={
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
              <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
              <path d="M6 12v5c3 3 9 3 12 0v-5" />
            </svg>
          }
          iconBgColor="bg-purple-100"
        />
        <StatsCard
          title="Avg Order Value"
          value="$87.50"
          change={{ value: 3.2, type: "decrease" }}
          icon={
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
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
          }
          iconBgColor="bg-orange-100"
        />
      </div>

      {/* Revenue Chart */}
      <AdminCard
        title="Revenue Overview"
        subtitle="Monthly revenue for the current year"
        action={
          <AdminButton
            variant="outline"
            size="sm"
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
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            }
          >
            Export CSV
          </AdminButton>
        }
      >
        <div className="h-72">
          <RevenueChart data={monthlyRevenue} />
        </div>
      </AdminCard>

      {/* Two Column Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Growth */}
        <AdminCard
          title="User Growth"
          subtitle="Cumulative user registrations"
        >
          <div className="h-64 pb-6">
            <LineChart data={userGrowth} color="#3B82F6" fillColor="rgba(59, 130, 246, 0.1)" />
          </div>
        </AdminCard>

        {/* Enrollments */}
        <AdminCard
          title="Monthly Enrollments"
          subtitle="Course enrollments per month"
        >
          <div className="h-64 pb-6">
            <LineChart data={enrollmentsByMonth} color="#A855F7" fillColor="rgba(168, 85, 247, 0.1)" />
          </div>
        </AdminCard>
      </div>

      {/* Top Courses & Revenue by Category */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Courses */}
        <AdminCard
          title="Top Performing Courses"
          subtitle="Ranked by revenue"
          padding="none"
        >
          <div className="divide-y divide-gray-50">
            {topCourses.map((course, index) => (
              <div
                key={course.name}
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
                    {course.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {course.enrollments} enrollments
                  </p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-semibold text-primary">
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

        {/* Revenue by Category */}
        <AdminCard
          title="Revenue by Category"
          subtitle="Distribution across categories"
        >
          <div className="space-y-4">
            {revenueByCategory.map((category) => (
              <div key={category.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">
                    {category.name}
                  </span>
                  <span className="text-sm text-gray-500">
                    ${category.value.toLocaleString()} ({category.percentage}%)
                  </span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-500"
                    style={{ width: `${category.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Pie Chart Visualization */}
          <div className="mt-6 pt-6 border-t border-gray-100">
            <div className="flex items-center justify-center">
              <div className="relative w-40 h-40">
                <svg viewBox="0 0 100 100" className="transform -rotate-90">
                  {revenueByCategory.reduce(
                    (acc, category, index) => {
                      const startAngle = acc.angle;
                      const sliceAngle = (category.percentage / 100) * 360;
                      const endAngle = startAngle + sliceAngle;

                      const colors = [
                        "#000E51",
                        "#FF6F00",
                        "#3B82F6",
                        "#A855F7",
                        "#22C55E",
                      ];

                      const x1 = 50 + 40 * Math.cos((startAngle * Math.PI) / 180);
                      const y1 = 50 + 40 * Math.sin((startAngle * Math.PI) / 180);
                      const x2 = 50 + 40 * Math.cos((endAngle * Math.PI) / 180);
                      const y2 = 50 + 40 * Math.sin((endAngle * Math.PI) / 180);

                      const largeArc = sliceAngle > 180 ? 1 : 0;

                      acc.paths.push(
                        <path
                          key={category.name}
                          d={`M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArc} 1 ${x2} ${y2} Z`}
                          fill={colors[index]}
                          className="hover:opacity-80 transition-opacity cursor-pointer"
                        />
                      );

                      return { paths: acc.paths, angle: endAngle };
                    },
                    { paths: [] as React.ReactNode[], angle: 0 }
                  ).paths}
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-lg font-bold text-primary">
                        ${(totalRevenue / 1000).toFixed(0)}k
                      </p>
                      <p className="text-xs text-gray-500">Total</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap justify-center gap-4 mt-4">
              {revenueByCategory.map((category, index) => {
                const colors = [
                  "#000E51",
                  "#FF6F00",
                  "#3B82F6",
                  "#A855F7",
                  "#22C55E",
                ];
                return (
                  <div key={category.name} className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: colors[index] }}
                    />
                    <span className="text-xs text-gray-600">{category.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </AdminCard>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <AdminCard padding="md">
          <div className="text-center">
            <p className="text-3xl font-bold text-primary">87%</p>
            <p className="text-sm text-gray-500 mt-1">Course Completion Rate</p>
          </div>
        </AdminCard>
        <AdminCard padding="md">
          <div className="text-center">
            <p className="text-3xl font-bold text-secondary">4.8</p>
            <p className="text-sm text-gray-500 mt-1">Average Rating</p>
          </div>
        </AdminCard>
        <AdminCard padding="md">
          <div className="text-center">
            <p className="text-3xl font-bold text-blue-600">2.5h</p>
            <p className="text-sm text-gray-500 mt-1">Avg Session Duration</p>
          </div>
        </AdminCard>
        <AdminCard padding="md">
          <div className="text-center">
            <p className="text-3xl font-bold text-green-600">92%</p>
            <p className="text-sm text-gray-500 mt-1">Student Satisfaction</p>
          </div>
        </AdminCard>
      </div>
    </div>
  );
}
