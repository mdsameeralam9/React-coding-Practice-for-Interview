import { FormEvent, useEffect, useState } from "react";

const API_BASE_URL = "http://localhost:5000/api/auth";

type Profile = Record<string, unknown>;

type ViewState = "checking" | "login" | "profile";

const getErrorMessage = (error: unknown) =>
  error instanceof Error ? error.message : "Something went wrong. Please try again.";

const getProfileLabel = (profile: Profile, key: string) => {
  const value = profile[key];
  return typeof value === "string" || typeof value === "number" ? String(value) : null;
};

const LoginScreen = () => {
  const [view, setView] = useState<ViewState>("checking");
  const [profile, setProfile] = useState<Profile | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadProfile = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/profile`, {
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("No active session found.");
      }

      const profileData = (await response.json()) as Profile;
      setProfile(profileData);
      setView("profile");
      setError("");
    } catch {
      setProfile(null);
      setView("login");
    }
  };

  useEffect(() => {
    void Promise.resolve().then(loadProfile);
  }, []);

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const responseData = (await response.json().catch(() => null)) as
          | { message?: string }
          | null;
        throw new Error(responseData?.message ?? "Invalid email or password.");
      }

      await loadProfile();
    } catch (loginError) {
      setError(getErrorMessage(loginError));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = async () => {
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_BASE_URL}/logout`, {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Unable to log out. Please try again.");
      }

      setProfile(null);
      setView("login");
      setPassword("");
    } catch (logoutError) {
      setError(getErrorMessage(logoutError));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (view === "checking") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-slate-100">
        <p className="text-sm text-slate-400">Checking your session...</p>
      </main>
    );
  }

  if (view === "profile" && profile) {
    const name =
      getProfileLabel(profile, "name") ??
      getProfileLabel(profile, "username") ??
      getProfileLabel(profile, "email") ??
      "there";

    return (
      <main className="min-h-screen bg-slate-950 px-6 py-10 text-slate-100 sm:px-10">
        <section className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-5xl items-center justify-center">
          <div className="w-full max-w-2xl rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-2xl shadow-cyan-950/30 sm:p-12">
            <div className="mb-10 flex items-center justify-between gap-6">
              <div>
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">
                  Your space
                </p>
                <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                  Welcome, {name}.
                </h1>
              </div>
              <div className="hidden h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-cyan-400 font-bold text-slate-950 sm:flex">
                {name.charAt(0).toUpperCase()}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Profile
              </p>
              <dl className="grid gap-4 sm:grid-cols-2">
                {Object.entries(profile).map(([key, value]) => (
                  <div key={key}>
                    <dt className="text-xs capitalize text-slate-500">{key}</dt>
                    <dd className="mt-1 break-words text-sm text-slate-200">
                      {typeof value === "object" ? JSON.stringify(value) : String(value)}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            {error && <p className="mt-5 text-sm text-rose-400">{error}</p>}
            <button
              className="mt-8 w-full rounded-xl bg-white px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
              disabled={isSubmitting}
              onClick={() => void handleLogout()}
              type="button"
            >
              {isSubmitting ? "Logging out..." : "Log out"}
            </button>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-slate-100 sm:px-10">
      <section className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-5xl items-center gap-12 lg:grid-cols-[1fr_0.9fr]">
        <div className="max-w-xl">
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
            Interview Preparation
          </p>
          <h1 className="text-5xl font-semibold leading-[1.05] tracking-tight text-white sm:text-7xl">
            A quieter way to get started.
          </h1>
          <p className="mt-6 max-w-md text-lg leading-8 text-slate-400">
            Sign in to continue to your profile. Your session is secured by an HttpOnly cookie.
          </p>
        </div>

        <form
          className="rounded-3xl border border-slate-800 bg-slate-900/80 p-7 shadow-2xl shadow-cyan-950/30 sm:p-10"
          onSubmit={handleLogin}
        >
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-white">Welcome back</h2>
            <p className="mt-2 text-sm text-slate-400">Use your account credentials to sign in.</p>
          </div>

          <div className="space-y-5">
            <label className="block text-sm font-medium text-slate-300" htmlFor="email">
              Email address
              <input
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                id="email"
                name="email"
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                required
                type="email"
                value={email}
              />
            </label>

            <label className="block text-sm font-medium text-slate-300" htmlFor="password">
              Password
              <input
                className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                id="password"
                name="password"
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter your password"
                required
                type="password"
                value={password}
              />
            </label>
          </div>

          {error && <p className="mt-5 text-sm text-rose-400">{error}</p>}
          <button
            className="mt-8 w-full rounded-xl bg-cyan-400 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
            disabled={isSubmitting}
            type="submit"
          >
            {isSubmitting ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </section>
    </main>
  );
};

export default LoginScreen;
