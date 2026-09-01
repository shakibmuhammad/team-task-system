import type { Member, WorkItem, WorkStatus, Priority } from "../types/work";

export const members: Member[] = [
  {
    id: "1",
    name: "Shakib Hossain",
    email: "shakib@example.com",
  },
  {
    id: "2",
    name: "Abuzar Goljar",
    email: "abuzar@example.com",
  },
  {
    id: "3",
    name: "Tanvir Amme",
    email: "tanvir@example.com",
  },
  {
    id: "4",
    name: "Alexandria Montgomery-Williams",
    email: "alex@example.com",
  },
  {
    id: "5",
    name: "Sarah Ahmed",
    email: "sarah@example.com",
  },
  {
    id: "6",
    name: "Michael Rahman",
    email: "michael@example.com",
  },
  {
    id: "7",
    name: "Nadia Karim",
    email: "nadia@example.com",
  },
  {
    id: "8",
    name: "Daniel Chowdhury",
    email: "daniel@example.com",
  },
];

const titles = [
  "Fix payment calculation issue in checkout",
  "Update property listing API integration",
  "Review the new onboarding experience",
  "Prepare Q4 project documentation",
  "Improve dashboard loading performance",
  "Add validation to customer registration",
  "Investigate failed email notifications",
  "Update user permission management",
  "Create property search experience",
  "Fix mobile navigation issue",
  "Review authentication changes",
  "Deploy latest dashboard changes",
  "Update project status reporting",
  "Improve task creation workflow",
  "Add notification preferences",
  "Fix incorrect property availability",
  "Optimize database queries",
  "Update team member profile page",
  "Add export functionality",
  "Review responsive layouts",
];

const descriptions = [
  "Investigate the current behaviour and implement a reliable solution.",
  "This needs to be reviewed and completed before the next release.",
  "Check the existing implementation and identify possible improvements.",
  "Make sure the implementation works correctly across supported devices.",
];

const statuses: WorkStatus[] = [
  "backlog",
  "in_progress",
  "review",
  "done",
];

const priorities: Priority[] = [
  "low",
  "medium",
  "high",
  "urgent",
];

function randomItem<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function generateDueDate(index: number): string | undefined {
  if (index % 17 === 0) {
    return undefined;
  }

  const today = new Date();

  const offset =
    index % 9 === 0
      ? -5
      : index % 7 === 0
        ? 0
        : (index % 30) + 1;

  const date = new Date(today);
  date.setDate(today.getDate() + offset);

  return date.toISOString().split("T")[0];
}

export const workItems: WorkItem[] = Array.from(
  { length: 350 },
  (_, index) => {
    const owner =
      index % 11 === 0
        ? undefined
        : randomItem(members);

    return {
      id: String(index + 1),
      title:
        index % 13 === 0
          ? `${randomItem(titles)} — This is an intentionally long work item title to test how the interface behaves with unusually long content`
          : randomItem(titles),
      description: randomItem(descriptions),
      status: randomItem(statuses),
      priority:
        index % 19 === 0
          ? "urgent"
          : randomItem(priorities),
      owner,
      dueDate: generateDueDate(index),
    };
  }
);