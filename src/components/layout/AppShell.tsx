import CreateWorkDialog from "../work/CreateWorkDialog";

type Props = {
  children: React.ReactNode;
  onCreateWork: (data: {
    title: string;
    description: string;
    status: "backlog" | "in_progress" | "review" | "done";
    priority: "low" | "medium" | "high" | "urgent";
    dueDate: string;
  }) => void;
};

export default function AppShell({ children, onCreateWork }: Props) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-4 sm:px-6 lg:px-8">
          <div>
            <h1 className="text-lg font-bold tracking-tight text-gray-900">
              TeamFlow
            </h1>

            <p className="hidden text-xs text-gray-500 sm:block">
              Team task management
            </p>
          </div>

          <CreateWorkDialog onCreate={onCreateWork} />
        </div>
      </header>

      <main className="mx-auto max-w-[1400px] px-4 py-2 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}
