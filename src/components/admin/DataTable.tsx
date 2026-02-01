"use client";

import { useState } from "react";

interface Column<T> {
  key: string;
  header: string;
  render?: (item: T) => React.ReactNode;
  sortable?: boolean;
  className?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  onRowClick?: (item: T) => void;
  emptyMessage?: string;
}

export default function DataTable<T extends { id: string | number }>({
  columns,
  data,
  onRowClick,
  emptyMessage = "No data available",
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
  };

  const sortedData = [...data].sort((a, b) => {
    if (!sortKey) return 0;
    const aValue = (a as Record<string, unknown>)[sortKey];
    const bValue = (b as Record<string, unknown>)[sortKey];

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortDirection === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
    }
    return 0;
  });

  return (
    <div className="overflow-x-auto -mx-4 sm:mx-0">
      <div className="inline-block min-w-full align-middle">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-gray-100">
              {columns.map((column) => (
                <th
                  key={column.key}
                  onClick={() => column.sortable && handleSort(column.key)}
                  className={`px-3 sm:px-4 py-2.5 sm:py-3 text-left text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap ${
                    column.sortable ? "cursor-pointer hover:text-primary select-none" : ""
                  } ${column.className || ""}`}
                >
                  <div className="flex items-center gap-1">
                    {column.header}
                    {column.sortable && sortKey === column.key && (
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={`transition-transform duration-200 w-3 h-3 sm:w-3.5 sm:h-3.5 ${
                          sortDirection === "desc" ? "rotate-180" : ""
                        }`}
                      >
                        <polyline points="18 15 12 9 6 15" />
                      </svg>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-8 sm:py-12 text-center text-gray-500"
                >
                  <div className="flex flex-col items-center gap-2">
                    <svg
                      width="48"
                      height="48"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-gray-300 w-10 h-10 sm:w-12 sm:h-12"
                    >
                      <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
                      <polyline points="13 2 13 9 20 9" />
                    </svg>
                    <p className="text-sm">{emptyMessage}</p>
                  </div>
                </td>
              </tr>
            ) : (
              sortedData.map((item, index) => (
                <tr
                  key={item.id}
                  onClick={() => onRowClick?.(item)}
                  className={`border-b border-gray-50 transition-colors duration-150 ${
                    onRowClick
                      ? "cursor-pointer hover:bg-gray-50"
                      : ""
                  } ${index % 2 === 0 ? "bg-white" : "bg-gray-50/50"}`}
                >
                  {columns.map((column) => (
                    <td key={column.key} className={`px-3 sm:px-4 py-3 sm:py-4 text-xs sm:text-sm text-gray-700 ${column.className || ""}`}>
                      {column.render
                        ? column.render(item)
                        : String((item as Record<string, unknown>)[column.key] ?? "")}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
