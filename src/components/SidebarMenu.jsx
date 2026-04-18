"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { FaHome, FaUser } from "react-icons/fa";
import { MdRequestQuote } from "react-icons/md";
import { IoAnalytics } from "react-icons/io5";
import { IoMdSettings, IoMdPeople } from "react-icons/io";
import { TbInvoice } from "react-icons/tb";
import { LiaPalletSolid } from "react-icons/lia";
import Logo from "./Logo";
import LogoutButton from "./LogoutButton";
import { useSession } from "next-auth/react";

const SidebarMenu = ({ isOpen, setIsOpen }) => {
  const location = usePathname();
  const { data: session, status } = useSession();

  const isActiveLink = (path) => {
    return location.split(/\/[A-Z]/)[0] === path;
  };

  const navItemClass = (path) =>
    `relative flex items-center gap-3 rounded-[10px] border px-3.5 py-2.5 text-[0.9rem] font-medium whitespace-nowrap transition-all duration-200 ${
      isActiveLink(path)
        ? "border-white/20 bg-white/18 text-white font-semibold shadow-[0_2px_8px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.15)] before:absolute before:left-[-12px] before:top-1/2 before:h-[60%] before:w-[3px] before:-translate-y-1/2 before:rounded-r-[3px] before:bg-white before:content-['']"
        : "border-transparent text-white/70 hover:border-white/8 hover:bg-white/10 hover:text-white"
    }`;

  return (
    <div className="fixed inset-y-0 left-0 z-50 hidden w-64 font-['Lexend',sans-serif] sm:flex text-white">
      {/* Toggle Button */}
      <button
        className={`fixed top-4 z-1000 flex h-9 w-9 items-center justify-center rounded-[10px] bg-green-600 text-white shadow-[0_2px_12px_rgba(22,163,74,0.4)] transition-[left,background-color] duration-300 ease-in-out hover:bg-green-700 ${
          isOpen ? "left-67" : "left-4"
        }`}
        onClick={() => setIsOpen(!isOpen)}
        title={isOpen ? "Collapse sidebar" : "Expand sidebar"}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`h-4 w-4 transition-transform duration-300 ${
            isOpen ? "rotate-0" : "rotate-180"
          }`}
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      {/* Sidebar */}
      <div
        className={`relative flex min-h-screen flex-col overflow-hidden bg-[linear-gradient(175deg,#16a34a_0%,#15803d_60%,#14532d_100%)] shadow-[4px_0_24px_rgba(0,0,0,0.15)] transition-[width,opacity] duration-300 ease-in-out before:absolute before:inset-0 before:z-0 before:bg-[url("data:image/svg+xml,%3Csvg_viewBox='0_0_200_200'_xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter_id='n'%3E%3CfeTurbulence_type='fractalNoise'_baseFrequency='0.9'_numOctaves='4'_stitchTiles='stitch'/%3E%3C/filter%3E%3Crect_width='100%25'_height='100%25'_filter='url(%23n)'_opacity='0.04'/%3E%3C/svg%3E")] before:opacity-40 before:content-[''] ${
          isOpen ? "w-70 opacity-100" : "pointer-events-none w-0 opacity-0"
        }`}
      >
        <div className="flex min-h-screen w-65 shrink-0 flex-col">
          {/* Logo */}
          <Logo border={true} />

          {/* Navigation */}
          <nav className="relative z-1 flex flex-1 flex-col gap-0.5 px-3 py-5">
            <div className="mb-1.5 mt-1 px-3 text-[0.6rem] font-semibold uppercase tracking-[0.15em] text-white/35">
              Main Menu
            </div>

            <ul className="space-y-0.5">
              <li>
                <Link href="/" className={navItemClass("/")}>
                  <span
                    className={`shrink-0 ${isActiveLink("/") ? "opacity-100" : "opacity-85"}`}
                  >
                    <FaHome />
                  </span>
                  Home
                </Link>
              </li>
              <li>
                <Link href="/orders" className={navItemClass("/orders")}>
                  <span
                    className={`shrink-0 ${isActiveLink("/orders") ? "opacity-100" : "opacity-85"}`}
                  >
                    <TbInvoice />
                  </span>
                  Orders
                </Link>
              </li>
              <li>
                <Link
                  href="/our-products"
                  className={navItemClass("/our-products")}
                >
                  <span
                    className={`shrink-0 ${isActiveLink("/our-products") ? "opacity-100" : "opacity-85"}`}
                  >
                    <LiaPalletSolid />
                  </span>
                  Products
                </Link>
              </li>
              <li>
                <Link href="/customers" className={navItemClass("/customers")}>
                  <span
                    className={`shrink-0 ${isActiveLink("/customers") ? "opacity-100" : "opacity-85"}`}
                  >
                    <IoMdPeople />
                  </span>
                  Customers
                </Link>
              </li>
              <li>
                <Link href="/quotes" className={navItemClass("/quotes")}>
                  <span
                    className={`shrink-0 ${isActiveLink("/quotes") ? "opacity-100" : "opacity-85"}`}
                  >
                    <MdRequestQuote />
                  </span>
                  Quotes
                </Link>
              </li>
              <li>
                <Link href="/analytics" className={navItemClass("/analytics")}>
                  <span
                    className={`shrink-0 ${isActiveLink("/analytics") ? "opacity-100" : "opacity-85"}`}
                  >
                    <IoAnalytics />
                  </span>
                  Analytics
                </Link>
              </li>
              <li>
                <Link href="/settings" className={navItemClass("/settings")}>
                  <span
                    className={`shrink-0 ${isActiveLink("/settings") ? "opacity-100" : "opacity-85"}`}
                  >
                    <IoMdSettings />
                  </span>
                  Settings
                </Link>
              </li>
              {status !== "loading" && session?.user.role === "admin" && (
                <li>
                  <Link href="/users" className={navItemClass("/users")}>
                    <span
                      className={`shrink-0 ${isActiveLink("/users") ? "opacity-100" : "opacity-85"}`}
                    >
                      <FaUser />
                    </span>
                    Users
                  </Link>
                </li>
              )}
            </ul>
          </nav>

          {/* Profile & Logout */}
          <div className="relative z-1 border-t border-white/12 px-3 py-4 flex justify-center">
            <LogoutButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarMenu;
