import * as Dialog from "@radix-ui/react-dialog";
import { SlidersHorizontal, X } from "lucide-react";
import { useState } from "react";
import type { Priority, WorkStatus } from "../../types/work";
import { members } from "../../data/fixtures";

type Props = {
  status: WorkStatus | null;
  owner: string | null;
  priority: Priority | null;

  onApply: (filters: {
    status: WorkStatus | null;
    owner: string | null;
    priority: Priority | null;
  }) => void;

  onReset: () => void;
};

const statusOptions = [
  { label: "All status", value: "" },
  { label: "Backlog", value: "backlog" },
  { label: "In Progress", value: "in_progress" },
  { label: "Review", value: "review" },
  { label: "Done", value: "done" },
];

const priorityOptions = [
  { label: "All priorities", value: "" },
  { label: "Low", value: "low" },
  { label: "Medium", value: "medium" },
  { label: "High", value: "high" },
  { label: "Urgent", value: "urgent" },
];

export default function MobileFilterSheet({
  status,
  owner,
  priority,
  onApply,
  onReset,
}: Props) {
  const [open, setOpen] = useState(false);

  const [draftStatus, setDraftStatus] =
    useState<WorkStatus | null>(status);

  const [draftOwner, setDraftOwner] =
    useState<string | null>(owner);

  const [draftPriority, setDraftPriority] =
    useState<Priority | null>(priority);

  function handleOpenChange(value: boolean) {
    if (value) {
      setDraftStatus(status);
      setDraftOwner(owner);
      setDraftPriority(priority);
    }

    setOpen(value);
  }

  function handleApply() {
    onApply({
      status: draftStatus,
      owner: draftOwner,
      priority: draftPriority,
    });

    setOpen(false);
  }

  function handleReset() {
    setDraftStatus(null);
    setDraftOwner(null);
    setDraftPriority(null);

    onReset();

    setOpen(false);
  }

  const activeFilterCount =
    Number(Boolean(status)) +
    Number(Boolean(owner)) +
    Number(Boolean(priority));

  return (
    <Dialog.Root
      open={open}
      onOpenChange={handleOpenChange}
    >
      <Dialog.Trigger asChild>
        <button
          type="button"
          className="
            inline-flex
            min-h-11
            flex-1
            items-center
            justify-center
            gap-2
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
            active:bg-gray-100
            focus-visible:outline-2
            focus-visible:outline-offset-2
          "
        >
          <SlidersHorizontal size={16} />

          Filters

          {activeFilterCount > 0 && (
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-gray-900 px-1.5 text-[11px] font-semibold text-white">
              {activeFilterCount}
            </span>
          )}
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay
          className="
            fixed
            inset-0
            z-40
            bg-black/30
            backdrop-blur-[2px]
            data-[state=open]:animate-in
          "
        />

        <Dialog.Content
          className="
            fixed
            inset-x-0
            bottom-0
            z-50
            rounded-t-2xl
            border
            border-gray-200
            bg-white
            shadow-2xl
            outline-none
          "
        >
          <div className="mx-auto max-w-lg">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
              <div>
                <Dialog.Title className="text-base font-semibold text-gray-900">
                  Filters
                </Dialog.Title>

                <Dialog.Description className="mt-0.5 text-xs text-gray-500">
                  Narrow down the work you need to see.
                </Dialog.Description>
              </div>

              <Dialog.Close asChild>
                <button
                  type="button"
                  className="
                    rounded-lg
                    p-2
                    text-gray-400
                    transition
                    hover:bg-gray-100
                    hover:text-gray-700
                    focus-visible:outline-2
                  "
                  aria-label="Close filters"
                >
                  <X size={18} />
                </button>
              </Dialog.Close>
            </div>

            {/* Filter fields */}
            <div className="space-y-5 px-5 py-5">
              {/* Status */}
              <div>
                <label
                  htmlFor="mobile-status"
                  className="mb-2 block text-sm font-medium text-gray-800"
                >
                  Status
                </label>

                <select
                  id="mobile-status"
                  value={draftStatus ?? ""}
                  onChange={(event) =>
                    setDraftStatus(
                      event.target.value
                        ? (event.target.value as WorkStatus)
                        : null
                    )
                  }
                  className="
                    min-h-11
                    w-full
                    rounded-lg
                    border
                    border-gray-200
                    bg-white
                    px-3
                    text-sm
                    text-gray-700
                    outline-none
                    focus:border-gray-400
                    focus:ring-2
                    focus:ring-gray-200
                  "
                >
                  {statusOptions.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Owner */}
              <div>
                <label
                  htmlFor="mobile-owner"
                  className="mb-2 block text-sm font-medium text-gray-800"
                >
                  Owner
                </label>

                <select
                  id="mobile-owner"
                  value={draftOwner ?? ""}
                  onChange={(event) =>
                    setDraftOwner(
                      event.target.value || null
                    )
                  }
                  className="
                    min-h-11
                    w-full
                    rounded-lg
                    border
                    border-gray-200
                    bg-white
                    px-3
                    text-sm
                    text-gray-700
                    outline-none
                    focus:border-gray-400
                    focus:ring-2
                    focus:ring-gray-200
                  "
                >
                  <option value="">All owners</option>

                  {members.map((member) => (
                    <option
                      key={member.id}
                      value={member.id}
                    >
                      {member.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Priority */}
              <div>
                <label
                  htmlFor="mobile-priority"
                  className="mb-2 block text-sm font-medium text-gray-800"
                >
                  Priority
                </label>

                <select
                  id="mobile-priority"
                  value={draftPriority ?? ""}
                  onChange={(event) =>
                    setDraftPriority(
                      event.target.value
                        ? (event.target.value as Priority)
                        : null
                    )
                  }
                  className="
                    min-h-11
                    w-full
                    rounded-lg
                    border
                    border-gray-200
                    bg-white
                    px-3
                    text-sm
                    text-gray-700
                    outline-none
                    focus:border-gray-400
                    focus:ring-2
                    focus:ring-gray-200
                  "
                >
                  {priorityOptions.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Footer */}
            <div className="flex gap-3 border-t border-gray-100 bg-gray-50 px-5 py-4">
              <button
                type="button"
                onClick={handleReset}
                className="
                  min-h-11
                  flex-1
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
                  focus-visible:outline-2
                "
              >
                Reset
              </button>

              <button
                type="button"
                onClick={handleApply}
                className="
                  min-h-11
                  flex-1
                  rounded-lg
                  bg-gray-900
                  px-4
                  text-sm
                  font-medium
                  text-white
                  transition
                  hover:bg-gray-800
                  active:bg-gray-700
                  focus-visible:outline-2
                  focus-visible:outline-offset-2
                "
              >
                Apply filters
              </button>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}