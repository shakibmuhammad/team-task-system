import type { WorkItem, WorkStatus } from "../../types/work";
import WorkColumn from "./WorkColumn";

type Props = {
  items: WorkItem[];
  onItemClick: (item: WorkItem) => void;
  onStatusChange: (item: WorkItem, status: WorkStatus) => void;
};

const columns: {
  title: string;
  status: WorkStatus;
}[] = [
  {
    title: "Backlog",
    status: "backlog",
  },
  {
    title: "In Progress",
    status: "in_progress",
  },
  {
    title: "Review",
    status: "review",
  },
  {
    title: "Done",
    status: "done",
  },
];

export default function WorkBoard({
  items,
  onItemClick,
  onStatusChange,
}: Props) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
      {columns.map((column) => {
        const columnItems = items.filter(
          (item) => item.status === column.status,
        );

        return (
          <WorkColumn
            key={column.status}
            title={column.title}
            status={column.status}
            items={columnItems}
            onItemClick={onItemClick}
            onStatusChange={onStatusChange}
          />
        );
      })}
    </div>
  );
}
