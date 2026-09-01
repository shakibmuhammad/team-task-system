export type DueDateStatus =
  | "overdue"
  | "today"
  | "upcoming"
  | "none";

export function getDueDateStatus(
  dueDate?: string
): DueDateStatus {
  if (!dueDate) {
    return "none";
  }

  const today = new Date();
  const due = new Date(`${dueDate}T00:00:00`);

  today.setHours(0, 0, 0, 0);
  due.setHours(0, 0, 0, 0);

  if (due < today) {
    return "overdue";
  }

  if (due.getTime() === today.getTime()) {
    return "today";
  }

  return "upcoming";
}