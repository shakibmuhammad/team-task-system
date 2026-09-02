import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppShell from "./components/layout/AppShell";
import WorkPage from "./pages/WorkPage";

function App() {
  return (
    <BrowserRouter>
      <AppShell>
        <Routes>
          <Route path="/" element={<Navigate to="/work" replace />} />
          <Route path="/work" element={<WorkPage />} />
        </Routes>
      </AppShell>
    </BrowserRouter>
  );
}

export default App;
