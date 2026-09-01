import { Calendar, UserRound } from "lucide-react";
import type { WorkItem } from "../../types/work";
import { getDueDateStatus } from "../../lib/date";

type Props = {
  item: WorkItem;
};

const priorityStyles = {
  low: "bg-gray-100 text-gray-600",
  medium: "bg-blue-50 text-blue-700",
  high: "bg-orange-50 text-orange-700",
  urgent: "bg-red-50 text-red-700",
};

const dueDateStyles = {
  overdue: "text-red-600 font-medium",
  today: "text-orange-600 font-medium",
  upcoming: "text-gray-500",
  none: "text-gray-400",
};

function formatDate(date?: string) {
  if (!date) {
    return "No due date";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(new Date(`${date}T00:00:00`));
}

export default function WorkCard({ item }: Props) {
  const dueStatus = getDueDateStatus(item.dueDate);

  return (
    <article
      className="
        group
        rounded-xl
        border border-gray-200
        bg-white
        p-4
        shadow-sm
        transition
        hover:-translate-y-0.5
        hover:border-gray-300
        hover:shadow-md
      "
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <span
          className={`
            rounded-full
            px-2.5
            py-1
            text-[11px]
            font-semibold
            uppercase
            tracking-wide
            ${priorityStyles[item.priority]}
          `}
        >
          {item.priority}
        </span>

        <button
          type="button"
          className="
            rounded-md
            p-1.5
            text-gray-400
            opacity-70
            transition
            hover:bg-gray-100
            hover:text-gray-700
            focus-visible:opacity-100
            focus-visible:outline
          "
          aria-label={`More options for ${item.title}`}
        >
          <span aria-hidden="true">⋮</span>
        </button>
      </div>

      <h3
        className="
          break-words
          text-sm
          font-semibold
          leading-5
          text-gray-900
        "
      >
        {item.title}
      </h3>

      {item.description && (
        <p className="mt-2 line-clamp-2 text-xs leading-5 text-gray-500">
          {item.description}
        </p>
      )}

      <div className="mt-4 space-y-2 border-t border-gray-100 pt-3">
        <div className="flex min-w-0 items-center gap-2">
          <UserRound
            size={14}
            className="shrink-0 text-gray-400"
          />

          {item.owner ? (
            <span className="truncate text-xs font-medium text-gray-700">
              {item.owner.name}
            </span>
          ) : (
            <span className="text-xs font-medium text-orange-600">
              Unassigned
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Calendar
            size={14}
            className="shrink-0 text-gray-400"
          />

          <span
            className={`text-xs ${dueDateStyles[dueStatus]}`}
          >
            {dueStatus === "overdue" && "Overdue · "}
            {dueStatus === "today" && "Due today · "}
            {formatDate(item.dueDate)}
          </span>
        </div>
      </div>
    </article>
  );
}