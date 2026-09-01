import type { WorkItem } from "../../types/work";

type Props = {
  item: WorkItem;
};

const priorityStyles = {
  low: "bg-gray-100 text-gray-600",
  medium: "bg-blue-50 text-blue-700",
  high: "bg-orange-50 text-orange-700",
  urgent: "bg-red-50 text-red-700",
};

export default function WorkCard({ item }: Props) {
  return (
    <article className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="mb-3 flex items-start justify-between gap-3">
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-medium capitalize ${
            priorityStyles[item.priority]
          }`}
        >
          {item.priority}
        </span>

        <button
          type="button"
          className="rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-700 focus-visible:outline-2"
          aria-label={`More options for ${item.title}`}
        >
          ⋮
        </button>
      </div>

      <h3 className="break-words text-sm font-semibold leading-5 text-gray-900">
        {item.title}
      </h3>

      {item.description && (
        <p className="mt-2 line-clamp-2 text-xs leading-5 text-gray-500">
          {item.description}
        </p>
      )}

      <div className="mt-4 flex items-center justify-between gap-3">
        <div className="min-w-0">
          {item.owner ? (
            <p className="truncate text-xs font-medium text-gray-700">
              {item.owner.name}
            </p>
          ) : (
            <p className="text-xs font-medium text-gray-400">
              Unassigned
            </p>
          )}
        </div>

        {item.dueDate && (
          <span className="shrink-0 text-xs text-gray-500">
            {item.dueDate}
          </span>
        )}
      </div>
    </article>
  );
}