"use client";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({
      redirect: false,
    });

    // Optional: redirect to login or home page
    router.push("/login");
    // router.refresh();
  };

  return (
    <button
      className="flex items-center justify-center gap-2 w-full px-4 py-2 rounded-lg
             text-green-200 text-sm font-medium
             hover:bg-white/10 hover:text-white
             active:bg-white/20
             transition-colors duration-150"
      onClick={handleLogout}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-4 h-4 shrink-0"
      >
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
        <polyline points="16 17 21 12 16 7" />
        <line x1="21" y1="12" x2="9" y2="12" />
      </svg>
      Log Out
    </button>
  );
}
