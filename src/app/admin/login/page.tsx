import type { Metadata } from "next";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = {
  title: "Admin · Sign in",
  robots: { index: false, follow: false },
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const sp = await searchParams;
  return (
    <main className="grid min-h-[100svh] place-items-center px-6">
      <div className="w-full max-w-sm rounded-3xl glass p-8">
        <span className="label-eyebrow">Private</span>
        <h1 className="display-3 mt-3 text-[var(--color-ink)]">Admin sign in</h1>
        <p className="body-sm mt-2">Enter the admin password to continue.</p>
        <LoginForm next={sp.next ?? "/admin"} />
      </div>
    </main>
  );
}
