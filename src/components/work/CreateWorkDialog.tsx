import * as Dialog from "@radix-ui/react-dialog";
import { Plus, X } from "lucide-react";
import { useState } from "react";
import type {
  Priority,
  WorkStatus,
} from "../../types/work";

type Props = {
  onCreate: (data: {
    title: string;
    description: string;
    status: WorkStatus;
    priority: Priority;
    dueDate: string;
  }) => void;
};

export default function CreateWorkDialog({
  onCreate,
}: Props) {
  const [open, setOpen] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] =
    useState("");
  const [status, setStatus] =
    useState<WorkStatus>("backlog");
  const [priority, setPriority] =
    useState<Priority>("medium");
  const [dueDate, setDueDate] = useState("");

  function resetForm() {
    setTitle("");
    setDescription("");
    setStatus("backlog");
    setPriority("medium");
    setDueDate("");
  }

  function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (!title.trim()) {
      return;
    }

    onCreate({
      title: title.trim(),
      description: description.trim(),
      status,
      priority,
      dueDate,
    });

    resetForm();
    setOpen(false);
  }

  return (
    <Dialog.Root
      open={open}
      onOpenChange={setOpen}
    >
      <Dialog.Trigger asChild>
        <button
          type="button"
          className="
            inline-flex
            min-h-10
            items-center
            gap-2
            rounded-lg
            bg-gray-900
            px-4
            py-2
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
          <Plus size={16} />
          <span className="hidden sm:inline">
            New work
          </span>
          <span className="sm:hidden">
            New
          </span>
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
          "
        />

        <Dialog.Content
          className="
            fixed
            left-1/2
            top-1/2
            z-50
            w-[calc(100%-2rem)]
            max-w-lg
            -translate-x-1/2
            -translate-y-1/2
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
              <Dialog.Title className="text-base font-semibold text-gray-900">
                Create work
              </Dialog.Title>

              <Dialog.Description className="mt-1 text-xs text-gray-500">
                Add a new piece of work to the team backlog.
              </Dialog.Description>
            </div>

            <Dialog.Close asChild>
              <button
                type="button"
                className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 focus-visible:outline-2"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </Dialog.Close>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-5 px-5 py-5">
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
                  onChange={(event) =>
                    setTitle(event.target.value)
                  }
                  placeholder="What needs to be done?"
                  required
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
                  onChange={(event) =>
                    setDescription(event.target.value)
                  }
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
                      setStatus(
                        event.target.value as WorkStatus
                      )
                    }
                    className="h-11 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-gray-200"
                  >
                    <option value="backlog">
                      Backlog
                    </option>
                    <option value="in_progress">
                      In Progress
                    </option>
                    <option value="review">
                      Review
                    </option>
                    <option value="done">
                      Done
                    </option>
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
                      setPriority(
                        event.target.value as Priority
                      )
                    }
                    className="h-11 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-gray-200"
                  >
                    <option value="low">Low</option>
                    <option value="medium">
                      Medium
                    </option>
                    <option value="high">High</option>
                    <option value="urgent">
                      Urgent
                    </option>
                  </select>
                </div>
              </div>

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
                  onChange={(event) =>
                    setDueDate(event.target.value)
                  }
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
                  className="min-h-11 flex-1 rounded-lg border border-gray-200 bg-white px-4 text-sm font-medium text-gray-700 hover:bg-gray-50 focus-visible:outline-2"
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
                  disabled:cursor-not-allowed
                  disabled:opacity-40
                  focus-visible:outline-2
                "
              >
                Create work
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}