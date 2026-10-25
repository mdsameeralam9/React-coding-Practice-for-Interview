import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext.jsx";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const notice = location.state?.notice;

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    try {
      await login({
        email: formData.get("email"),
        password: formData.get("password"),
      });
      navigate("/profile", { replace: true });
    } catch (submitError) {
      setError(submitError.message || "Unable to sign in.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="mx-auto w-full max-w-md rounded-3xl border border-slate-200 bg-white p-7 shadow-xl shadow-slate-200/60 sm:p-10">
      <div className="mb-8">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">
          Welcome back
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Sign in to your account
        </h1>
        <p className="mt-2 text-slate-500">
          Enter your email and password to continue.
        </p>
      </div>

      {notice && (
        <p className="mb-5 rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700" role="status">
          {notice}
        </p>
      )}

      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="login-email">
            Email address
          </label>
          <input
            autoComplete="email"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            id="login-email"
            name="email"
            placeholder="you@example.com"
            required
            type="email"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="login-password">
            Password
          </label>
          <input
            autoComplete="current-password"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            id="login-password"
            name="password"
            placeholder="Your password"
            required
            type="password"
          />
        </div>

        {error && (
          <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
            {error}
          </p>
        )}

        <button
          className="w-full rounded-xl bg-indigo-600 px-4 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
          disabled={isSubmitting}
          type="submit"
        >
          {isSubmitting ? "Signing in..." : "Sign in"}
        </button>
      </form>

      <p className="mt-7 text-center text-sm text-slate-500">
        Don&apos;t have an account?{" "}
        <Link className="font-semibold text-indigo-600 hover:text-indigo-700" to="/register">
          Create one
        </Link>
      </p>
    </section>
  );
}
