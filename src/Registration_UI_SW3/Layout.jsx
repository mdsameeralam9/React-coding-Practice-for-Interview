import { BrowserRouter, Link, Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider, useAuth } from "./AuthContext.jsx";
import LoginPage from "./LoginPage.jsx";
import ProfilePage from "./ProfilePage.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import RegistrationPage from "./RegistrationPage.jsx";

function PageLayout() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
          <Link className="flex items-center gap-2 font-bold tracking-tight text-slate-900" to="/">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-lg text-white">
              A
            </span>
            Acme
          </Link>
          <div className="flex items-center gap-3 text-sm font-medium">
            {isAuthenticated ? (
              <Link className="rounded-lg px-4 py-2 text-slate-600 hover:bg-slate-100" to="/profile">
                Profile
              </Link>
            ) : (
              <>
                <Link className="rounded-lg px-4 py-2 text-slate-600 hover:bg-slate-100" to="/login">
                  Sign in
                </Link>
                <Link
                  className="rounded-lg bg-indigo-600 px-4 py-2 text-white transition hover:bg-indigo-700"
                  to="/register"
                >
                  Get started
                </Link>
              </>
            )}
          </div>
        </nav>
      </header>

      <main className="mx-auto flex min-h-[calc(100vh-73px)] max-w-6xl items-center justify-center px-5 py-12 sm:px-8">
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default function Layout() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <PageLayout />
      </BrowserRouter>
    </AuthProvider>
  );
}