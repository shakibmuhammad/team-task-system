import { workItems } from "../../data/fixtures";
import type { WorkStatus } from "../../types/work";
import WorkColumn from "./WorkColumn";

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

export default function WorkBoard() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
      {columns.map((column) => {
        const items = workItems.filter(
          (item) => item.status === column.status
        );

        return (
          <WorkColumn
            key={column.status}
            title={column.title}
            status={column.status}
            items={items}
          />
        );
      })}
    </div>
  );
}