import type { WorkItem } from "../types/work";

export const workItems: WorkItem[] = [
  {
    id: "1",
    title: "Fix payment calculation issue in checkout",
    description: "Investigate incorrect total calculation.",
    status: "backlog",
    priority: "urgent",
    owner: {
      id: "1",
      name: "Shakib Hossain",
      email: "shakib@example.com",
    },
    dueDate: "2026-08-28",
  },
  {
    id: "2",
    title: "Update property listing API integration",
    status: "backlog",
    priority: "high",
    owner: {
      id: "2",
      name: "Abuzar Goljar",
      email: "abuzar@example.com",
    },
    dueDate: "2026-09-02",
  },
  {
    id: "3",
    title:
      "Review the new onboarding experience and provide feedback to the product team",
    status: "in_progress",
    priority: "medium",
    owner: {
      id: "3",
      name: "Tanvir Amme",
      email: "tanvir@example.com",
    },
    dueDate: "2026-09-05",
  },
  {
    id: "4",
    title: "Prepare Q4 project documentation",
    status: "in_progress",
    priority: "low",
    dueDate: "2026-09-15",
  },
  {
    id: "5",
    title: "Review authentication changes",
    status: "review",
    priority: "high",
    owner: {
      id: "4",
      name: "Alexandria Montgomery-Williams",
      email: "alex@example.com",
    },
    dueDate: "2026-09-01",
  },
  {
    id: "6",
    title: "Deploy latest dashboard changes",
    status: "done",
    priority: "medium",
    owner: {
      id: "1",
      name: "Shakib Hossain",
      email: "shakib@example.com",
    },
    dueDate: "2026-08-25",
  },
];