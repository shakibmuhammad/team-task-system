import * as Dialog from "@radix-ui/react-dialog";
import { Calendar, CircleUserRound, Clock3, Pencil, X } from "lucide-react";
import type { WorkItem } from "../../types/work";

type Props = {
  item: WorkItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit: () => void;
};

const statusLabels = {
  backlog: "Backlog",
  in_progress: "In Progress",
  review: "Review",
  done: "Done",
};

const priorityStyles = {
  low: "bg-gray-100 text-gray-600",
  medium: "bg-blue-50 text-blue-700",
  high: "bg-orange-50 text-orange-700",
  urgent: "bg-red-50 text-red-700",
};

export default function WorkDetailDrawer({
  item,
  open,
  onOpenChange,
  onEdit,
}: Props) {
  if (!item) {
    return null;
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay
          className="
            fixed
            inset-0
            z-40
            bg-black/30
            backdrop-blur-[2px]
          "
        />

        <Dialog.Content
          className="
            fixed
            right-0
            top-0
            z-50
            flex
            h-full
            w-full
            max-w-xl
            flex-col
            border-l
            border-gray-200
            bg-white
            shadow-2xl
            outline-none
          "
        >
          {/* Header */}
          <div className="flex items-start justify-between border-b border-gray-100 px-5 py-5 sm:px-6">
            <div className="min-w-0 pr-4">
              <Dialog.Title className="break-words text-lg font-semibold leading-6 text-gray-900">
                {item.title}
              </Dialog.Title>

              <Dialog.Description className="mt-1 text-sm text-gray-500">
                Work item details
              </Dialog.Description>
            </div>

            <Dialog.Close asChild>
              <button
                type="button"
                className="
                  shrink-0
                  rounded-lg
                  p-2
                  text-gray-400
                  transition
                  hover:bg-gray-100
                  hover:text-gray-700
                  focus-visible:outline-2
                "
                aria-label="Close details"
              >
                <X size={18} />
              </button>
            </Dialog.Close>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-5 py-6 sm:px-6">
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                {statusLabels[item.status]}
              </span>

              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${priorityStyles[item.priority]}`}
              >
                {item.priority}
              </span>
            </div>

            {item.description && (
              <section className="mt-7">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                  Description
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-700">
                  {item.description}
                </p>
              </section>
            )}

            <div className="mt-7 divide-y divide-gray-100 rounded-xl border border-gray-200">
              <div className="flex items-center gap-3 px-4 py-4">
                <CircleUserRound size={18} className="text-gray-400" />

                <div>
                  <p className="text-xs text-gray-400">Owner</p>

                  <p className="mt-0.5 text-sm font-medium text-gray-800">
                    {item.owner?.name ?? "Unassigned"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 px-4 py-4">
                <Calendar size={18} className="text-gray-400" />

                <div>
                  <p className="text-xs text-gray-400">Due date</p>

                  <p className="mt-0.5 text-sm font-medium text-gray-800">
                    {item.dueDate ?? "No due date"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 px-4 py-4">
                <Clock3 size={18} className="text-gray-400" />

                <div>
                  <p className="text-xs text-gray-400">Status</p>

                  <p className="mt-0.5 text-sm font-medium text-gray-800">
                    {statusLabels[item.status]}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex gap-3 border-t border-gray-100 bg-gray-50 px-5 py-4 sm:px-6">
            <button
              type="button"
              onClick={onEdit}
              className="
                inline-flex
                min-h-11
                flex-1
                items-center
                justify-center
                gap-2
                rounded-lg
                bg-gray-900
                px-4
                text-sm
                font-medium
                text-white
                transition
                hover:bg-gray-800
                focus-visible:outline-2
                focus-visible:outline-offset-2
              "
            >
              <Pencil size={16} />
              Edit work
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
