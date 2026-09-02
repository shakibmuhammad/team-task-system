import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { useState } from "react";

import AppShell from "./components/layout/AppShell";
import WorkPage from "./pages/WorkPage";
import { workItems as initialWorkItems } from "./data/fixtures";
import type { WorkItem } from "./types/work";

function App() {
  const [workItems, setWorkItems] =
    useState<WorkItem[]>(initialWorkItems);

  function handleCreateWork(data: {
    title: string;
    description: string;
    status: WorkItem["status"];
    priority: WorkItem["priority"];
    dueDate: string;
  }) {
    const newItem: WorkItem = {
      id: crypto.randomUUID(),
      title: data.title,
      description: data.description,
      status: data.status,
      priority: data.priority,
      dueDate: data.dueDate || undefined,
    };

    setWorkItems((current) => [
      newItem,
      ...current,
    ]);
  }

  return (
    <BrowserRouter>
      <AppShell onCreateWork={handleCreateWork}>
        <Routes>
          <Route
            path="/"
            element={
              <Navigate
                to="/work"
                replace
              />
            }
          />

          <Route
            path="/work"
            element={
              <WorkPage
                workItems={workItems}
                setWorkItems={setWorkItems}
              />
            }
          />
        </Routes>
      </AppShell>
    </BrowserRouter>
  );
}

export default App;