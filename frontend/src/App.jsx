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
import MakeupPage from "./pages/MakeupPage";
import IechmBannerPage from "./pages/IechmBannerPage";

const ADMIN_EMAIL = "priyadarshihimanshu6@gmail.com";

function Shell({ children }) {
  const location = useLocation();
  const { user } = useUser();
  const isAdmin = user?.primaryEmailAddress?.emailAddress === ADMIN_EMAIL;

  const onRateMode =
    location.pathname === "/" || location.pathname.startsWith("/prof");
  const onCommunityMode = location.pathname.startsWith("/media");
  const onMakeupMode = location.pathname.startsWith("/makeup");

  const mobileTabClass = (isActive) =>
    `flex-1 px-4 py-2 font-medium rounded-lg text-center transition border ${
      isActive
        ? "bg-sky-600 text-white border-sky-500 shadow-sm"
        : "bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700"
    }`;

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      <header className="hidden md:block w-full border-b border-slate-800 bg-slate-950/90 backdrop-blur z-20">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="font-semibold text-lg tracking-tight text-slate-100">
            Rate My Prof &amp; College Media
          </div>
          <div className="flex items-center gap-4">
            <div className="inline-flex rounded-full bg-slate-800 p-1 text-xs border border-slate-700">
              <Link
                to="/"
                className={`rounded-full px-3 py-1 font-medium ${
                  onRateMode
                    ? "bg-sky-600 text-white shadow-sm"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                Rate mode
              </Link>
              <Link
                to="/media"
                className={`rounded-full px-3 py-1 font-medium ${
                  onCommunityMode
                    ? "bg-sky-600 text-white shadow-sm"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                Community mode
              </Link>
              <Link
                to="/makeup"
                className={`rounded-full px-3 py-1 font-medium ${
                  onMakeupMode
                    ? "bg-sky-600 text-white shadow-sm"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                Makeup
              </Link>
            </div>
            <SignedIn>
              {isAdmin && (
                <Link
                  to="/admin/ads"
                  className="inline-flex items-center rounded-full bg-slate-800 border border-slate-700 px-3 py-1.5 text-xs font-semibold text-sky-300 hover:bg-slate-700 transition"
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
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 w-full border-t border-slate-800 bg-slate-950/95 backdrop-blur">
        <div className="flex gap-2 px-3 py-3">
          <Link
            to="/"
            aria-label="Home"
            title="Home"
            className={mobileTabClass(onRateMode)}
          >
            🏠
          </Link>
          <Link
            to="/media"
            aria-label="Community"
            title="Community"
            className={mobileTabClass(onCommunityMode)}
          >
            💬
          </Link>
          <Link
            to="/makeup"
            aria-label="Makeup"
            title="Makeup"
            className={mobileTabClass(onMakeupMode)}
          >
            ✨
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
            <Route path="/makeup" element={<MakeupPage />} />
            <Route path="/iechm-banner" element={<IechmBannerPage />} />
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
