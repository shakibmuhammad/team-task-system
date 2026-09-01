import { Search, SlidersHorizontal, ArrowUpDown } from "lucide-react";
import WorkBoard from "../components/work/WorkBoard";
import { workItems } from "../data/fixtures";

export default function WorkPage() {
  return (
    <div>
      <div className="mb-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              Work
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {workItems.length} items · 8 members
            </p>
          </div>
        </div>
      </div>

      <div className="mb-6 flex flex-col gap-3 sm:flex-row">
        <div className="relative min-w-0 flex-1">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="search"
            placeholder="Search work..."
            className="h-11 w-full rounded-lg border border-gray-200 bg-white pl-10 pr-4 text-sm outline-none transition placeholder:text-gray-400 focus:border-gray-400 focus:ring-2 focus:ring-gray-200"
          />
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 text-sm font-medium text-gray-700 hover:bg-gray-50 focus-visible:outline-2 sm:flex-none"
          >
            <SlidersHorizontal size={16} />
            Filters
          </button>

          <button
            type="button"
            className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 text-sm font-medium text-gray-700 hover:bg-gray-50 focus-visible:outline-2 sm:flex-none"
          >
            <ArrowUpDown size={16} />
            Sort
          </button>
        </div>
      </div>

      <WorkBoard />
    </div>
  );
}
