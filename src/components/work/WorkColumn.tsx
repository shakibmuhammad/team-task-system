import type { WorkItem, WorkStatus } from "../../types/work";
import WorkCard from "./WorkCard";

type Props = {
  title: string;
  status: WorkStatus;
  items: WorkItem[];
};

export default function WorkColumn({
  title,
  items,
}: Props) {
  return (
    <section className="flex min-w-0 flex-col">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-semibold text-gray-900">
            {title}
          </h2>

          <span className="rounded-md bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-500">
            {items.length}
          </span>
        </div>

        <button
          type="button"
          className="
            rounded-md
            p-1.5
            text-gray-400
            transition
            hover:bg-gray-200
            hover:text-gray-700
            focus-visible:outline-2
          "
          aria-label={`Add work to ${title}`}
        >
          +
        </button>
      </div>

      <div
        className="
          flex
          max-h-[calc(100vh-230px)]
          min-h-[200px]
          flex-col
          gap-3
          overflow-y-auto
          pr-1
        "
      >
        {items.map((item) => (
          <WorkCard
            key={item.id}
            item={item}
          />
        ))}
      </div>
    </section>
  );
}