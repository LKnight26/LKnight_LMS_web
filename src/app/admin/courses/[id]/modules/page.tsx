"use client";

import { useState } from "react";
import AdminCard from "@/components/admin/AdminCard";
import AdminButton from "@/components/admin/AdminButton";
import AdminInput from "@/components/admin/AdminInput";
import Badge from "@/components/admin/Badge";

interface Lesson {
  id: string;
  title: string;
  videoUrl: string;
  duration: number;
  order: number;
}

interface Module {
  id: string;
  title: string;
  summary: string;
  order: number;
  lessons: Lesson[];
  isExpanded: boolean;
}

// Mock data
const initialModules: Module[] = [
  {
    id: "1",
    title: "Getting Started",
    summary: "Introduction to the course and setup",
    order: 1,
    isExpanded: true,
    lessons: [
      {
        id: "1-1",
        title: "Welcome to the Course",
        videoUrl: "https://example.com/video1.mp4",
        duration: 180,
        order: 1,
      },
      {
        id: "1-2",
        title: "Setting Up Your Development Environment",
        videoUrl: "https://example.com/video2.mp4",
        duration: 600,
        order: 2,
      },
      {
        id: "1-3",
        title: "Course Overview and Resources",
        videoUrl: "https://example.com/video3.mp4",
        duration: 420,
        order: 3,
      },
    ],
  },
  {
    id: "2",
    title: "Core Fundamentals",
    summary: "Learn the essential building blocks",
    order: 2,
    isExpanded: false,
    lessons: [
      {
        id: "2-1",
        title: "Understanding the Basics",
        videoUrl: "https://example.com/video4.mp4",
        duration: 900,
        order: 1,
      },
      {
        id: "2-2",
        title: "Working with Data",
        videoUrl: "https://example.com/video5.mp4",
        duration: 1200,
        order: 2,
      },
    ],
  },
  {
    id: "3",
    title: "Advanced Concepts",
    summary: "Deep dive into advanced topics",
    order: 3,
    isExpanded: false,
    lessons: [
      {
        id: "3-1",
        title: "Advanced Patterns",
        videoUrl: "https://example.com/video6.mp4",
        duration: 1500,
        order: 1,
      },
    ],
  },
];

const formatDuration = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

export default function ModulesPage() {
  const [modules, setModules] = useState<Module[]>(initialModules);
  const [editingModule, setEditingModule] = useState<string | null>(null);
  const [editingLesson, setEditingLesson] = useState<string | null>(null);
  const [showAddModule, setShowAddModule] = useState(false);
  const [showAddLesson, setShowAddLesson] = useState<string | null>(null);

  const [newModule, setNewModule] = useState({ title: "", summary: "" });
  const [newLesson, setNewLesson] = useState({
    title: "",
    videoUrl: "",
    duration: 0,
  });

  const toggleModule = (moduleId: string) => {
    setModules((prev) =>
      prev.map((m) =>
        m.id === moduleId ? { ...m, isExpanded: !m.isExpanded } : m
      )
    );
  };

  const handleAddModule = () => {
    if (!newModule.title) return;

    const module: Module = {
      id: Date.now().toString(),
      title: newModule.title,
      summary: newModule.summary,
      order: modules.length + 1,
      lessons: [],
      isExpanded: true,
    };

    setModules([...modules, module]);
    setNewModule({ title: "", summary: "" });
    setShowAddModule(false);
  };

  const handleAddLesson = (moduleId: string) => {
    if (!newLesson.title) return;

    setModules((prev) =>
      prev.map((m) => {
        if (m.id === moduleId) {
          const lesson: Lesson = {
            id: `${moduleId}-${Date.now()}`,
            title: newLesson.title,
            videoUrl: newLesson.videoUrl,
            duration: newLesson.duration,
            order: m.lessons.length + 1,
          };
          return { ...m, lessons: [...m.lessons, lesson] };
        }
        return m;
      })
    );

    setNewLesson({ title: "", videoUrl: "", duration: 0 });
    setShowAddLesson(null);
  };

  const deleteModule = (moduleId: string) => {
    setModules((prev) => prev.filter((m) => m.id !== moduleId));
  };

  const deleteLesson = (moduleId: string, lessonId: string) => {
    setModules((prev) =>
      prev.map((m) => {
        if (m.id === moduleId) {
          return { ...m, lessons: m.lessons.filter((l) => l.id !== lessonId) };
        }
        return m;
      })
    );
  };

  const totalLessons = modules.reduce((sum, m) => sum + m.lessons.length, 0);
  const totalDuration = modules.reduce(
    (sum, m) => sum + m.lessons.reduce((lSum, l) => lSum + l.duration, 0),
    0
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
            <a href="/admin/courses" className="hover:text-primary">
              Courses
            </a>
            <span>/</span>
            <span>Web Development Masterclass</span>
          </div>
          <h1 className="text-2xl font-bold text-primary font-outfit">
            Module Management
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Organize your course content into modules and lessons
          </p>
        </div>
        <AdminButton
          variant="secondary"
          onClick={() => setShowAddModule(true)}
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
          Add Module
        </AdminButton>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <p className="text-sm text-gray-500">Modules</p>
          <p className="text-2xl font-bold text-primary mt-1">{modules.length}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <p className="text-sm text-gray-500">Total Lessons</p>
          <p className="text-2xl font-bold text-primary mt-1">{totalLessons}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100">
          <p className="text-sm text-gray-500">Total Duration</p>
          <p className="text-2xl font-bold text-primary mt-1">
            {Math.floor(totalDuration / 3600)}h{" "}
            {Math.floor((totalDuration % 3600) / 60)}m
          </p>
        </div>
      </div>

      {/* Add Module Form */}
      {showAddModule && (
        <AdminCard title="Add New Module" padding="md">
          <div className="space-y-4">
            <AdminInput
              label="Module Title"
              value={newModule.title}
              onChange={(e) =>
                setNewModule({ ...newModule, title: e.target.value })
              }
              placeholder="e.g., Getting Started"
              required
            />
            <AdminInput
              label="Module Summary"
              value={newModule.summary}
              onChange={(e) =>
                setNewModule({ ...newModule, summary: e.target.value })
              }
              placeholder="Brief description of this module"
            />
            <div className="flex justify-end gap-2">
              <AdminButton
                variant="ghost"
                onClick={() => setShowAddModule(false)}
              >
                Cancel
              </AdminButton>
              <AdminButton variant="primary" onClick={handleAddModule}>
                Add Module
              </AdminButton>
            </div>
          </div>
        </AdminCard>
      )}

      {/* Modules List */}
      <div className="space-y-4">
        {modules.map((module, index) => (
          <AdminCard key={module.id} padding="none" className="overflow-hidden">
            {/* Module Header */}
            <div
              className="flex items-center gap-4 px-6 py-4 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
              onClick={() => toggleModule(module.id)}
            >
              {/* Drag Handle */}
              <div className="text-gray-400 cursor-grab">
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
                  <circle cx="9" cy="5" r="1" />
                  <circle cx="9" cy="12" r="1" />
                  <circle cx="9" cy="19" r="1" />
                  <circle cx="15" cy="5" r="1" />
                  <circle cx="15" cy="12" r="1" />
                  <circle cx="15" cy="19" r="1" />
                </svg>
              </div>

              {/* Module Info */}
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <Badge variant="primary" size="sm">
                    Module {index + 1}
                  </Badge>
                  <h3 className="font-semibold text-gray-900">{module.title}</h3>
                </div>
                <p className="text-sm text-gray-500 mt-0.5">{module.summary}</p>
              </div>

              {/* Lesson Count */}
              <div className="text-sm text-gray-500">
                {module.lessons.length} lessons
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                <AdminButton
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAddLesson(module.id)}
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
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  }
                >
                  Add Lesson
                </AdminButton>
                <button
                  onClick={() => deleteModule(module.id)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
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
                </button>
              </div>

              {/* Expand/Collapse */}
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`text-gray-400 transition-transform duration-200 ${
                  module.isExpanded ? "rotate-180" : ""
                }`}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>

            {/* Lessons */}
            {module.isExpanded && (
              <div className="border-t border-gray-100">
                {/* Add Lesson Form */}
                {showAddLesson === module.id && (
                  <div className="p-4 bg-blue-50 border-b border-blue-100">
                    <div className="space-y-3">
                      <AdminInput
                        label="Lesson Title"
                        value={newLesson.title}
                        onChange={(e) =>
                          setNewLesson({ ...newLesson, title: e.target.value })
                        }
                        placeholder="e.g., Introduction to Variables"
                        required
                      />
                      <div className="grid grid-cols-2 gap-3">
                        <AdminInput
                          label="Video URL"
                          value={newLesson.videoUrl}
                          onChange={(e) =>
                            setNewLesson({ ...newLesson, videoUrl: e.target.value })
                          }
                          placeholder="https://..."
                        />
                        <AdminInput
                          label="Duration (seconds)"
                          type="number"
                          value={newLesson.duration}
                          onChange={(e) =>
                            setNewLesson({
                              ...newLesson,
                              duration: parseInt(e.target.value) || 0,
                            })
                          }
                          placeholder="600"
                        />
                      </div>
                      <div className="flex justify-end gap-2">
                        <AdminButton
                          variant="ghost"
                          size="sm"
                          onClick={() => setShowAddLesson(null)}
                        >
                          Cancel
                        </AdminButton>
                        <AdminButton
                          variant="primary"
                          size="sm"
                          onClick={() => handleAddLesson(module.id)}
                        >
                          Add Lesson
                        </AdminButton>
                      </div>
                    </div>
                  </div>
                )}

                {/* Lessons List */}
                {module.lessons.length === 0 ? (
                  <div className="p-8 text-center text-gray-500">
                    <svg
                      width="48"
                      height="48"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mx-auto text-gray-300 mb-2"
                    >
                      <polygon points="23 7 16 12 23 17 23 7" />
                      <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                    </svg>
                    <p>No lessons yet. Add your first lesson to this module.</p>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-50">
                    {module.lessons.map((lesson, lessonIndex) => (
                      <div
                        key={lesson.id}
                        className="flex items-center gap-4 px-6 py-3 hover:bg-gray-50 transition-colors group"
                      >
                        {/* Order */}
                        <span className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-xs font-medium text-gray-500">
                          {lessonIndex + 1}
                        </span>

                        {/* Video Icon */}
                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-primary"
                          >
                            <polygon points="5 3 19 12 5 21 5 3" />
                          </svg>
                        </div>

                        {/* Lesson Info */}
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">
                            {lesson.title}
                          </p>
                          {lesson.videoUrl && (
                            <p className="text-xs text-gray-400 truncate max-w-xs">
                              {lesson.videoUrl}
                            </p>
                          )}
                        </div>

                        {/* Duration */}
                        <span className="text-sm text-gray-500">
                          {formatDuration(lesson.duration)}
                        </span>

                        {/* Actions */}
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-1.5 text-gray-400 hover:text-primary hover:bg-gray-100 rounded-lg transition-colors">
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
                          </button>
                          <button
                            onClick={() => deleteLesson(module.id, lesson.id)}
                            className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          >
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
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </AdminCard>
        ))}
      </div>

      {modules.length === 0 && !showAddModule && (
        <AdminCard padding="lg">
          <div className="text-center py-8">
            <svg
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mx-auto text-gray-300 mb-4"
            >
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            </svg>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              No modules yet
            </h3>
            <p className="text-gray-500 mb-4">
              Start organizing your course by adding the first module.
            </p>
            <AdminButton
              variant="secondary"
              onClick={() => setShowAddModule(true)}
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
              Add First Module
            </AdminButton>
          </div>
        </AdminCard>
      )}
    </div>
  );
}
