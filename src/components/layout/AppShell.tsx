import { Plus } from "lucide-react";

type Props = {
  children: React.ReactNode;
};

export default function AppShell({ children }: Props) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-4 sm:px-6 lg:px-8">
          <div>
            <h1 className="text-lg font-bold tracking-tight text-gray-900">
              TeamFlow
            </h1>

            <p className="hidden text-xs text-gray-500 sm:block">
              Team task management
            </p>
          </div>

          <button
            type="button"
            className="inline-flex min-h-10 items-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98]"
          >
            <Plus size={16} />
            <span className="hidden sm:inline">New work</span>
            <span className="sm:hidden">New</span>
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}