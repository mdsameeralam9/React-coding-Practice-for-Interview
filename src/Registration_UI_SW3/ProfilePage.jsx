import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext.jsx";

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  async function handleLogout() {
    setIsLoggingOut(true);
    try {
      await logout();
      navigate("/login", { replace: true });
    } catch (logoutError) {
      navigate("/login", {
        replace: true,
        state: {
          notice: `You were signed out locally, but the server sign-out failed: ${
            logoutError.message || "Please try again."
          }`,
        },
      });
    } finally {
      setIsLoggingOut(false);
    }
  }

  return (
    <section className="mx-auto w-full max-w-2xl rounded-3xl border border-slate-200 bg-white p-7 shadow-xl shadow-slate-200/60 sm:p-10">
      <div className="flex flex-col items-center text-center">
        {user.image ? (
          <img
            alt={`${user.name} profile`}
            className="mb-5 h-24 w-24 rounded-full object-cover"
            src={user.image}
          />
        ) : (
          <div className="mb-5 flex h-24 w-24 items-center justify-center rounded-full bg-indigo-100 text-3xl font-bold text-indigo-700">
            {user.name
              .split(" ")
              .map((part) => part[0])
              .join("")}
          </div>
        )}
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">
          Your profile
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
          {user.name}
        </h1>
        {user.role && <p className="mt-1 text-slate-500">{user.role}</p>}
      </div>

      <dl className="mt-8 divide-y divide-slate-100 rounded-2xl bg-slate-50 px-5">
        <div className="flex flex-col gap-1 py-4 sm:flex-row sm:justify-between">
          <dt className="text-sm font-medium text-slate-500">Email</dt>
          <dd className="text-sm font-semibold text-slate-800">{user.email}</dd>
        </div>
        <div className="flex flex-col gap-1 py-4 sm:flex-row sm:justify-between">
          <dt className="text-sm font-medium text-slate-500">Member since</dt>
          <dd className="text-sm font-semibold text-slate-800">
            {user.memberSince
              ? new Date(user.memberSince).toLocaleDateString()
              : "—"}
          </dd>
        </div>
      </dl>

      <button
        className="mt-7 w-full rounded-xl border border-slate-300 px-4 py-3 font-semibold text-slate-700 transition hover:border-red-200 hover:bg-red-50 hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-60"
        disabled={isLoggingOut}
        onClick={handleLogout}
        type="button"
      >
        {isLoggingOut ? "Signing out..." : "Log out"}
      </button>
    </section>
  );
}
