import * as Dialog from "@radix-ui/react-dialog";
import { Plus, Pencil, X } from "lucide-react";
import { useEffect, useState } from "react";
import type { Priority, WorkItem, WorkStatus } from "../../types/work";

type WorkFormData = {
  title: string;
  description: string;
  status: WorkStatus;
  priority: Priority;
  dueDate: string;
};

type Props = {
  mode: "create" | "edit";
  item?: WorkItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: WorkFormData) => void;
};

export default function WorkFormDialog({
  mode,
  item,
  open,
  onOpenChange,
  onSubmit,
}: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<WorkStatus>("backlog");
  const [priority, setPriority] = useState<Priority>("medium");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    if (!open) {
      return;
    }

    if (mode === "edit" && item) {
      setTitle(item.title);
      setDescription(item.description ?? "");
      setStatus(item.status);
      setPriority(item.priority);
      setDueDate(item.dueDate ?? "");

      return;
    }

    setTitle("");
    setDescription("");
    setStatus("backlog");
    setPriority("medium");
    setDueDate("");
  }, [open, mode, item]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!title.trim()) {
      return;
    }

    onSubmit({
      title: title.trim(),
      description: description.trim(),
      status,
      priority,
      dueDate,
    });
  }

  const isEdit = mode === "edit";

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay
          className="
            fixed
            inset-0
            z-50
            bg-black/30
            backdrop-blur-[2px]
          "
        />

        <Dialog.Content
          className="
            fixed
            left-1/2
            top-1/2
            z-50
            max-h-[90vh]
            w-[calc(100%-2rem)]
            max-w-lg
            -translate-x-1/2
            -translate-y-1/2
            overflow-y-auto
            rounded-2xl
            border
            border-gray-200
            bg-white
            shadow-2xl
            outline-none
          "
        >
          <div className="flex items-start justify-between border-b border-gray-100 px-5 py-4">
            <div>
              <Dialog.Title className="flex items-center gap-2 text-base font-semibold text-gray-900">
                {isEdit ? <Pencil size={17} /> : <Plus size={17} />}

                {isEdit ? "Edit work" : "Create work"}
              </Dialog.Title>

              <Dialog.Description className="mt-1 text-xs text-gray-500">
                {isEdit
                  ? "Update the details of this work item."
                  : "Add a new piece of work to the team backlog."}
              </Dialog.Description>
            </div>

            <Dialog.Close asChild>
              <button
                type="button"
                aria-label="Close"
                className="
                  rounded-lg
                  p-2
                  text-gray-400
                  transition
                  hover:bg-gray-100
                  hover:text-gray-700
                  focus-visible:outline-2
                "
              >
                <X size={18} />
              </button>
            </Dialog.Close>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-5 px-5 py-5">
              {/* Title */}
              <div>
                <label
                  htmlFor="work-title"
                  className="mb-2 block text-sm font-medium text-gray-800"
                >
                  Title
                </label>

                <input
                  id="work-title"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  required
                  placeholder="What needs to be done?"
                  className="
                    h-11
                    w-full
                    rounded-lg
                    border
                    border-gray-200
                    px-3
                    text-sm
                    outline-none
                    placeholder:text-gray-400
                    focus:border-gray-400
                    focus:ring-2
                    focus:ring-gray-200
                  "
                />
              </div>

              {/* Description */}
              <div>
                <label
                  htmlFor="work-description"
                  className="mb-2 block text-sm font-medium text-gray-800"
                >
                  Description
                </label>

                <textarea
                  id="work-description"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  rows={4}
                  placeholder="Add some context..."
                  className="
                    w-full
                    resize-none
                    rounded-lg
                    border
                    border-gray-200
                    px-3
                    py-3
                    text-sm
                    outline-none
                    placeholder:text-gray-400
                    focus:border-gray-400
                    focus:ring-2
                    focus:ring-gray-200
                  "
                />
              </div>

              {/* Status + Priority */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="work-status"
                    className="mb-2 block text-sm font-medium text-gray-800"
                  >
                    Status
                  </label>

                  <select
                    id="work-status"
                    value={status}
                    onChange={(event) =>
                      setStatus(event.target.value as WorkStatus)
                    }
                    className="
                      h-11
                      w-full
                      rounded-lg
                      border
                      border-gray-200
                      bg-white
                      px-3
                      text-sm
                      outline-none
                      focus:ring-2
                      focus:ring-gray-200
                    "
                  >
                    <option value="backlog">Backlog</option>

                    <option value="in_progress">In Progress</option>

                    <option value="review">Review</option>

                    <option value="done">Done</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="work-priority"
                    className="mb-2 block text-sm font-medium text-gray-800"
                  >
                    Priority
                  </label>

                  <select
                    id="work-priority"
                    value={priority}
                    onChange={(event) =>
                      setPriority(event.target.value as Priority)
                    }
                    className="
                      h-11
                      w-full
                      rounded-lg
                      border
                      border-gray-200
                      bg-white
                      px-3
                      text-sm
                      outline-none
                      focus:ring-2
                      focus:ring-gray-200
                    "
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
              </div>

              {/* Due date */}
              <div>
                <label
                  htmlFor="work-due-date"
                  className="mb-2 block text-sm font-medium text-gray-800"
                >
                  Due date
                </label>

                <input
                  id="work-due-date"
                  type="date"
                  value={dueDate}
                  onChange={(event) => setDueDate(event.target.value)}
                  className="
                    h-11
                    w-full
                    rounded-lg
                    border
                    border-gray-200
                    px-3
                    text-sm
                    outline-none
                    focus:ring-2
                    focus:ring-gray-200
                  "
                />
              </div>
            </div>

            <div className="flex gap-3 border-t border-gray-100 bg-gray-50 px-5 py-4">
              <Dialog.Close asChild>
                <button
                  type="button"
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
                  Cancel
                </button>
              </Dialog.Close>

              <button
                type="submit"
                disabled={!title.trim()}
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
                  disabled:cursor-not-allowed
                  disabled:opacity-40
                  focus-visible:outline-2
                  focus-visible:outline-offset-2
                "
              >
                {isEdit ? "Save changes" : "Create work"}
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
