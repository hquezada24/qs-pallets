"use client";
import { useState } from "react";

const DashboardHeader = ({ isOpen }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, text: "New order #1042 received", time: "2m ago", unread: true },
    { id: 2, text: "Quote #87 was approved", time: "1h ago", unread: true },
    {
      id: 3,
      text: "Low stock alert: Euro Pallets",
      time: "3h ago",
      unread: false,
    },
  ]);

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const unreadCount = notifications.filter((n) => n.unread).length;
  const markAllRead = () =>
    setNotifications((current) =>
      current.map((n) => ({ ...n, unread: false })),
    );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');
        .header-font { font-family: 'DM Sans', sans-serif; }
        .logo-font { font-family: 'Syne', sans-serif; }
        .notif-dropdown {
          animation: dropIn 0.18s cubic-bezier(0.4,0,0.2,1);
        }
        @keyframes dropIn {
          from { opacity: 0; transform: translateY(-8px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>

      <header
        className={`header-font sticky top-0 z-40 border-b border-emerald-800/30 bg-gradient-to-r from-[#1e5631] via-[#1f7a35] to-[#228b22] shadow-lg ${isOpen ? "w-[calc(100vw-260px)]" : "w-screen"}`}
      >
        <div className="absolute inset-0 opacity-20 pointer-events-none [background-image:radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.35),transparent_45%),radial-gradient(circle_at_80%_50%,rgba(255,255,255,0.2),transparent_35%)]" />
        <div className="relative flex flex-col gap-4 sm:px-8 sm:py-6 sm:items-center lg:px-10 xl:px-12 lg:flex-row lg:items-center lg:justify-evenly lg:gap-5">
          {/* Left — greeting */}
          <div className="flex flex-col min-w-0">
            <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald-100/85">
              {today}
            </p>
            <h1 className="logo-font truncate text-xl font-extrabold leading-tight tracking-tight text-white sm:text-2xl">
              Welcome back, <span className="text-emerald-200">John</span> 👋
            </h1>
            <p className="mt-1 text-sm font-medium text-emerald-100/80">
              Here&apos;s what&apos;s happening with your operations today.
            </p>
          </div>

          {/* Right — actions */}
          <div className="flex items-center gap-2.5 sm:gap-3 lg:flex-shrink-0">
            {/* Search */}

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-white/30 bg-white/12 text-emerald-50 hover:border-white/55 hover:bg-white/20 transition-all duration-200"
                aria-label="Toggle notifications"
              >
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
                {unreadCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-emerald-300 px-1 text-[10px] font-bold leading-none text-emerald-900">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Dropdown */}
              {showNotifications && (
                <div className="notif-dropdown absolute right-0 z-50 mt-2 w-72 overflow-hidden rounded-2xl border border-emerald-200 bg-white shadow-2xl">
                  <div className="flex items-center justify-between border-b border-emerald-100 bg-emerald-50/80 px-4 py-3">
                    <span className="logo-font text-sm font-bold text-emerald-900">
                      Notifications
                    </span>
                    <button
                      onClick={markAllRead}
                      className="text-xs font-semibold text-emerald-700 hover:underline"
                      type="button"
                    >
                      Mark all read
                    </button>
                  </div>
                  <ul>
                    {notifications.map((n) => (
                      <li
                        key={n.id}
                        className={`cursor-pointer border-b border-gray-100 px-4 py-3 last:border-0 transition-colors duration-150 hover:bg-gray-50 ${n.unread ? "bg-emerald-50/60" : ""}`}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`mt-1 h-2 w-2 flex-shrink-0 rounded-full ${n.unread ? "bg-emerald-500" : "bg-gray-300"}`}
                          />
                          <div>
                            <p className="text-sm font-medium leading-snug text-gray-700">
                              {n.text}
                            </p>
                            <p className="mt-0.5 text-xs text-gray-500">
                              {n.time}
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Avatar */}
            <div className="flex items-center gap-2.5 border-l border-white/25 pl-3">
              <div className="logo-font flex h-10 w-10 items-center justify-center rounded-xl bg-white text-sm font-extrabold text-emerald-800 shadow-md">
                J
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-semibold leading-tight text-white">
                  John Smith
                </p>
                <p className="text-xs font-medium text-emerald-100/80">
                  Administrator
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default DashboardHeader;
