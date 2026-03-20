import React from "react";
import { Provider } from "react-redux";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import { SignedIn, UserButton, useUser } from "@clerk/clerk-react";
import ProfList from "./pages/ProfList";
import ProfPage from "./pages/ProfPage";
import LandingPage from "./pages/LandingPage";
import CommunityHome from "./pages/CommunityHome";
import CommunityPage from "./pages/CommunityPage";
import AdminAds from "./pages/AdminAds";
import AdminAdSlots from "./pages/AdminAdSlots";
import { store } from "./redux/store";
import Footer from "./Footer";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";

const ADMIN_EMAIL = "priyadarshihimanshu6@gmail.com";

function Shell({ children }) {
  const location = useLocation();
  const { user } = useUser();
  const isAdmin = user?.primaryEmailAddress?.emailAddress === ADMIN_EMAIL;

  const onRateMode =
    location.pathname === "/" || location.pathname.startsWith("/prof");
  const onCommunityMode = location.pathname.startsWith("/media");

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      <header className="hidden md:block w-full border-b border-gray-200 bg-white/80 backdrop-blur z-20">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="font-semibold text-lg tracking-tight">
            Rate My Prof &amp; College Media
          </div>
          <div className="flex items-center gap-4">
            <div className="inline-flex rounded-full bg-gray-100 p-1 text-xs">
              <Link
                to="/"
                className={`rounded-full px-3 py-1 font-medium ${
                  onRateMode
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Rate mode
              </Link>
              <Link
                to="/media"
                className={`rounded-full px-3 py-1 font-medium ${
                  onCommunityMode
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Community mode
              </Link>
            </div>
            <SignedIn>
              {isAdmin && (
                <Link
                  to="/admin/ads"
                  className="inline-flex items-center rounded-full bg-purple-100 px-3 py-1.5 text-xs font-semibold text-purple-700 hover:bg-purple-200 transition"
                >
                  ⚙️ Admin
                </Link>
              )}
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>
        </div>
      </header>
      <div className="flex-grow pb-0 md:pb-0">{children}</div>

      {/* Mobile Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 w-full border-t border-gray-200 bg-white">
        <div className="flex gap-2 px-3 py-3">
          <Link
            to="/"
            className="flex-1 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg text-center hover:bg-blue-700 transition"
          >
            🏠 Home
          </Link>
          <Link
            to="/media"
            className="flex-1 px-4 py-2 bg-green-600 text-white font-medium rounded-lg text-center hover:bg-green-700 transition"
          >
            💬 About Community
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Shell>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/profs" element={<ProfList />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/prof/:id" element={<ProfPage />} />
            <Route path="/media" element={<CommunityHome />} />
            <Route path="/media/community/:id" element={<CommunityPage />} />
            <Route path="/sign-in" element={<SignInPage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
            <Route path="/admin/ads" element={<AdminAds />} />
            <Route path="/admin/ad-slots" element={<AdminAdSlots />} />
          </Routes>
        </Shell>
      </BrowserRouter>
    </Provider>
  );
}
