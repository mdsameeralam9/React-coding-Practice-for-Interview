import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "./api.js";

function readImageAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
      } else {
        reject(new Error("Unable to read the selected image."));
      }
    };
    reader.onerror = () => reject(new Error("Unable to read the selected image."));
    reader.readAsDataURL(file);
  });
}

export default function RegistrationPage() {
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleImageChange(event) {
    const file = event.target.files?.[0];
    setProfileImage(file ?? null);
    setImagePreview(file ? URL.createObjectURL(file) : "");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    try {
      if (!profileImage) {
        throw new Error("Please select a profile image.");
      }

      if (!["image/jpeg", "image/png", "image/webp"].includes(profileImage.type)) {
        throw new Error("Choose a JPEG, PNG, or WebP image.");
      }

      if (profileImage.size > 2 * 1024 * 1024) {
        throw new Error("Image size must not exceed 2 MB.");
      }

      await registerUser({
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
        profileImageBase64: await readImageAsDataUrl(profileImage),
      });
      navigate("/login", {
        replace: true,
        state: { notice: "Account created. You can now sign in." },
      });
    } catch (submitError) {
      setError(submitError.message || "Unable to create your account.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="mx-auto w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-7 shadow-xl shadow-slate-200/60 sm:p-10">
      <div className="mb-8">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">
          Get started
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Create your account
        </h1>
        <p className="mt-2 text-slate-500">
          Join us by filling in your details below.
        </p>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="name">
            Full name
          </label>
          <input
            autoComplete="name"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            id="name"
            name="name"
            placeholder="Jordan Lee"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="register-email">
            Email address
          </label>
          <input
            autoComplete="email"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            id="register-email"
            name="email"
            placeholder="you@example.com"
            required
            type="email"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="register-password">
            Password
          </label>
          <input
            autoComplete="new-password"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            id="register-password"
            minLength={8}
            name="password"
            placeholder="At least 8 characters"
            required
            type="password"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="profile-image">
            Profile image
          </label>
          <div className="flex items-center gap-4 rounded-xl border border-dashed border-slate-300 p-4">
            {imagePreview ? (
              <img
                alt="Selected profile preview"
                className="h-14 w-14 rounded-full object-cover"
                src={imagePreview}
              />
            ) : (
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-indigo-50 text-xl font-semibold text-indigo-600">
                +
              </div>
            )}
            <input
              accept="image/jpeg,image/png,image/webp"
              className="min-w-0 flex-1 text-sm text-slate-500 file:mr-3 file:rounded-lg file:border-0 file:bg-indigo-50 file:px-3 file:py-2 file:font-medium file:text-indigo-700 hover:file:bg-indigo-100"
              id="profile-image"
              onChange={handleImageChange}
              required
              type="file"
            />
          </div>
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
          {isSubmitting ? "Creating account..." : "Create account"}
        </button>
      </form>

      <p className="mt-7 text-center text-sm text-slate-500">
        Already have an account?{" "}
        <Link className="font-semibold text-indigo-600 hover:text-indigo-700" to="/login">
          Sign in
        </Link>
      </p>
    </section>
  );
}
