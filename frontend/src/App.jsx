import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProfList from "./pages/ProfList";
import ProfPage from "./pages/ProfPage";
import LandingPage from "./pages/LandingPage";
import { store } from "./redux/store";
import Footer from "./Footer";

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/profs" element={<ProfList />} />
              <Route path="/prof/:id" element={<ProfPage />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </Provider>
  );
}
