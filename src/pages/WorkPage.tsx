import { Search, X } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import WorkBoard from "../components/work/WorkBoard";
import { members } from "../data/fixtures";
import type { Priority, WorkItem, WorkStatus } from "../types/work";
import MobileFilterSheet from "../components/work/MobileFilterSheet";
import { useState } from "react";
import WorkDetailDrawer from "../components/work/WorkDetailDrawer";

const PAGE_SIZE = 20;

const statusOptions: {
  label: string;
  value: WorkStatus;
}[] = [
  { label: "Backlog", value: "backlog" },
  { label: "In Progress", value: "in_progress" },
  { label: "Review", value: "review" },
  { label: "Done", value: "done" },
];

const priorityOptions: {
  label: string;
  value: Priority;
}[] = [
  { label: "Low", value: "low" },
  { label: "Medium", value: "medium" },
  { label: "High", value: "high" },
  { label: "Urgent", value: "urgent" },
];

type Props = {
  workItems: WorkItem[];
  setWorkItems: React.Dispatch<
    React.SetStateAction<WorkItem[]>
  >;
};

export default function WorkPage({ workItems, setWorkItems }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedItem, setSelectedItem] = useState<WorkItem | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  const query = searchParams.get("q") ?? "";
  const status = searchParams.get("status") as WorkStatus | null;
  const owner = searchParams.get("owner");
  const priority = searchParams.get("priority") as Priority | null;
  const sort = searchParams.get("sort") ?? "created";
  const page = Number(searchParams.get("page") ?? "1");

  function handleItemClick(item: WorkItem) {
    setSelectedItem(item);
    setDetailOpen(true);
  }

  const filteredItems = workItems
    .filter((item) => {
      if (!query) return true;

      const searchText = [item.title, item.description, item.owner?.name]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return searchText.includes(query.toLowerCase());
    })
    .filter((item) => {
      if (!status) return true;
      return item.status === status;
    })
    .filter((item) => {
      if (!owner) return true;
      return item.owner?.id === owner;
    })
    .filter((item) => {
      if (!priority) return true;
      return item.priority === priority;
    })
    .sort((a, b) => {
      if (sort === "title") {
        return a.title.localeCompare(b.title);
      }

      if (sort === "dueDate") {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;

        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      }

      return Number(b.id) - Number(a.id);
    });

  const totalItems = filteredItems.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / PAGE_SIZE));

  const safePage = Math.min(Math.max(page, 1), totalPages);

  const paginatedItems = filteredItems.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE,
  );

  function updateParam(key: string, value: string | null) {
    const nextParams = new URLSearchParams(searchParams);

    if (value) {
      nextParams.set(key, value);
    } else {
      nextParams.delete(key);
    }

    if (key !== "page") {
      nextParams.delete("page");
    }

    setSearchParams(nextParams);
  }

  function clearFilters() {
    setSearchParams({});
  }

  const hasFilters =
    Boolean(query) || Boolean(status) || Boolean(owner) || Boolean(priority);

  return (
    <div>
      {/* Page heading */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Work
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          {totalItems} {totalItems === 1 ? "item" : "items"} found
        </p>
      </div>

      {/* Search + filters */}
      <div className="mb-5">
        <div className="flex flex-col gap-3 lg:flex-row">
          {/* Search */}
          <div className="relative min-w-0 flex-1">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="search"
              value={query}
              onChange={(event) => updateParam("q", event.target.value)}
              placeholder="Search work or owner..."
              className="
                h-11
                w-full
                rounded-lg
                border
                border-gray-200
                bg-white
                pl-10
                pr-4
                text-sm
                outline-none
                transition
                placeholder:text-gray-400
                focus:border-gray-400
                focus:ring-2
                focus:ring-gray-200
              "
            />
          </div>

          {/* Desktop filters */}
          <div className="hidden gap-2 lg:flex">
            <select
              value={status ?? ""}
              onChange={(event) =>
                updateParam("status", event.target.value || null)
              }
              className="h-11 rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-gray-200"
              aria-label="Filter by status"
            >
              <option value="">All status</option>

              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <select
              value={owner ?? ""}
              onChange={(event) =>
                updateParam("owner", event.target.value || null)
              }
              className="h-11 max-w-[180px] rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-gray-200"
              aria-label="Filter by owner"
            >
              <option value="">All owners</option>

              {members.map((member) => (
                <option key={member.id} value={member.id}>
                  {member.name}
                </option>
              ))}
            </select>

            <select
              value={priority ?? ""}
              onChange={(event) =>
                updateParam("priority", event.target.value || null)
              }
              className="h-11 rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-gray-200"
              aria-label="Filter by priority"
            >
              <option value="">All priority</option>

              {priorityOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <select
              value={sort}
              onChange={(event) => updateParam("sort", event.target.value)}
              className="h-11 rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-gray-200"
              aria-label="Sort work"
            >
              <option value="created">Newest</option>
              <option value="title">Title</option>
              <option value="dueDate">Due date</option>
            </select>
          </div>

          {/* Mobile controls */}
          <div className="flex gap-2 lg:hidden">
            <MobileFilterSheet
              status={status}
              owner={owner}
              priority={priority}
              onApply={({ status, owner, priority }) => {
                const nextParams = new URLSearchParams(searchParams);

                if (status) {
                  nextParams.set("status", status);
                } else {
                  nextParams.delete("status");
                }

                if (owner) {
                  nextParams.set("owner", owner);
                } else {
                  nextParams.delete("owner");
                }

                if (priority) {
                  nextParams.set("priority", priority);
                } else {
                  nextParams.delete("priority");
                }

                nextParams.delete("page");

                setSearchParams(nextParams);
              }}
              onReset={() => {
                const nextParams = new URLSearchParams(searchParams);

                nextParams.delete("status");
                nextParams.delete("owner");
                nextParams.delete("priority");
                nextParams.delete("page");

                setSearchParams(nextParams);
              }}
            />

            <select
              value={sort}
              onChange={(event) => updateParam("sort", event.target.value)}
              className="
                min-h-11
                flex-1
                rounded-lg
                border
                border-gray-200
                bg-white
                px-3
                text-sm
                text-gray-700
                outline-none
                focus:ring-2
                focus:ring-gray-200
              "
              aria-label="Sort work"
            >
              <option value="created">Newest</option>
              <option value="title">Title</option>
              <option value="dueDate">Due date</option>
            </select>
          </div>
        </div>

        {/* Active filters */}
        {hasFilters && (
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {query && (
              <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700">
                Search: {query}
              </span>
            )}

            {status && (
              <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700">
                Status:{" "}
                {statusOptions.find((item) => item.value === status)?.label}
              </span>
            )}

            {owner && (
              <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700">
                Owner: {members.find((member) => member.id === owner)?.name}
              </span>
            )}

            {priority && (
              <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-700">
                Priority: {priority}
              </span>
            )}

            <button
              type="button"
              onClick={clearFilters}
              className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-gray-500 hover:text-gray-900 focus-visible:outline-2"
            >
              <X size={13} />
              Clear
            </button>
          </div>
        )}
      </div>

      {/* Board */}
      <WorkBoard items={paginatedItems} onItemClick={handleItemClick} />
      <WorkDetailDrawer
        item={selectedItem}
        open={detailOpen}
        onOpenChange={setDetailOpen}
        onEdit={() => {
          console.log("Edit:", selectedItem);
        }}
      />

      {/* Pagination */}
      <div className="mt-6 flex flex-col gap-3 border-t border-gray-200 pt-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-gray-500">
          {totalItems === 0
            ? "No items"
            : `Showing ${(safePage - 1) * PAGE_SIZE + 1}–${Math.min(
                safePage * PAGE_SIZE,
                totalItems,
              )} of ${totalItems}`}
        </p>

        <div className="flex gap-2">
          <button
            type="button"
            disabled={safePage === 1}
            onClick={() => updateParam("page", String(safePage - 1))}
            className="
              min-h-10
              rounded-lg
              border
              border-gray-200
              bg-white
              px-4
              text-sm
              font-medium
              text-gray-700
              transition
              hover:bg-gray-50
              disabled:cursor-not-allowed
              disabled:opacity-40
              focus-visible:outline-2
            "
          >
            Previous
          </button>

          <span className="flex min-h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-700">
            {safePage} / {totalPages}
          </span>

          <button
            type="button"
            disabled={safePage === totalPages}
            onClick={() => updateParam("page", String(safePage + 1))}
            className="
              min-h-10
              rounded-lg
              border
              border-gray-200
              bg-white
              px-4
              text-sm
              font-medium
              text-gray-700
              transition
              hover:bg-gray-50
              disabled:cursor-not-allowed
              disabled:opacity-40
              focus-visible:outline-2
            "
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
