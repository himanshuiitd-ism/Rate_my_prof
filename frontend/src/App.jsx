import React from "react";
import ProfList from "./pages/ProfList";
import ProfPage from "./pages/ProfPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProfList />} />
        <Route path="/prof/:id" element={<ProfPage />} />
      </Routes>
    </BrowserRouter>
  );
}
