import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProfList from "./pages/ProfList";
import ProfPage from "./pages/ProfPage";
import { store } from "./redux/store";

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProfList />} />
          <Route path="/prof/:id" element={<ProfPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}
