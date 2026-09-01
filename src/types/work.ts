export type WorkStatus = "backlog" | "in_progress" | "review" | "done";

export type Priority = "low" | "medium" | "high" | "urgent";

export type Member = {
  id: string;
  name: string;
  email: string;
};

export type WorkItem = {
  id: string;
  title: string;
  description?: string;
  status: WorkStatus;
  priority: Priority;
  owner?: Member;
  dueDate?: string;
};
