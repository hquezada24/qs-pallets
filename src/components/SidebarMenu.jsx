"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { FaHome, FaUser } from "react-icons/fa";
import { MdRequestQuote } from "react-icons/md";
import { IoAnalytics } from "react-icons/io5";
import { IoMdSettings, IoMdPeople } from "react-icons/io";
import { TbInvoice } from "react-icons/tb";
import { LiaPalletSolid } from "react-icons/lia";
import Image from "next/image";
import LogoutButton from "./LogoutButton";
import { useSession } from "next-auth/react";

const SidebarMenu = ({ isOpen, setIsOpen }) => {
  const location = usePathname();
  const { data: session, status } = useSession();

  const isActiveLink = (path) => {
    return location === path;
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lexend:wght@100..900&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap');

        .sidebar-root {
          font-family: 'Lexend', sans-serif;
          display: none;
        }

        .sidebar-panel {
          width: 280px;
          min-height: 100vh;
          background: linear-gradient(175deg, #16a34a 0%, #15803d 60%, #14532d 100%);
          display: flex;
          flex-direction: column;
          position: relative;
          box-shadow: 4px 0 24px rgba(0,0,0,0.15);
          transition: width 0.35s cubic-bezier(0.4,0,0.2,1), opacity 0.35s ease;
          overflow: hidden;
        }

        .sidebar-panel.collapsed {
          width: 0;
          opacity: 0;
          pointer-events: none;
        }

        .sidebar-inner {
          width: 260px;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          flex-shrink: 0;
        }

        /* Subtle noise texture */
        .sidebar-panel::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 0;
          opacity: 0.4;
        }

        .logo-area {
          padding: 28px 24px 20px;
          display: flex;
          align-items: center;
          border-bottom: 1px solid rgba(255,255,255,0.12);
          position: relative;
          z-index: 1;
        }
        
        .sidebar-logo{
          margin: 0;
        }

        .logo-text {
          font-family: 'Lexend', sans-serif;
          font-weight: 800;
          font-size: 1.2rem;
          color: white;
          letter-spacing: -0.02em;
          line-height: 1;
          margin: 0;
        }

        .nav-section {
          flex: 1;
          padding: 20px 12px;
          display: flex;
          flex-direction: column;
          gap: 2px;
          position: relative;
          z-index: 1;
        }

        .nav-label {
          font-size: 0.6rem;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.35);
          padding: 0 12px;
          margin-bottom: 6px;
          margin-top: 4px;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 14px;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.18s ease;
          color: rgba(255,255,255,0.7);
          font-weight: 500;
          font-size: 0.9rem;
          position: relative;
          border: 1px solid transparent;
          white-space: nowrap;
        }

        .nav-item:hover {
          background: rgba(255,255,255,0.1);
          color: white;
          border-color: rgba(255,255,255,0.08);
        }

        .nav-item.active {
          background: rgba(255,255,255,0.18);
          color: white;
          border-color: rgba(255,255,255,0.2);
          font-weight: 600;
          box-shadow: 0 2px 8px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.15);
        }

        .nav-item.active::before {
          content: '';
          position: absolute;
          left: -12px;
          top: 50%;
          transform: translateY(-50%);
          width: 3px;
          height: 60%;
          background: white;
          border-radius: 0 3px 3px 0;
        }

        .nav-icon {
          flex-shrink: 0;
          opacity: 0.85;
        }

        .active .nav-icon {
          opacity: 1;
        }

        .profile-section {
          padding: 16px 12px;
          border-top: 1px solid rgba(255,255,255,0.12);
          position: relative;
          z-index: 1;
        }

        .profile-card {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 12px;
          border-radius: 10px;
          background: rgba(0,0,0,0.15);
          border: 1px solid rgba(255,255,255,0.08);
          margin-bottom: 10px;
        }

        .avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: linear-gradient(135deg, #86efac, #4ade80);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Lexend', sans-serif;
          font-weight: 800;
          font-size: 0.9rem;
          color: #14532d;
          flex-shrink: 0;
          border: 2px solid rgba(255,255,255,0.3);
        }

        .profile-info {
          flex: 1;
          min-width: 0;
        }

        .profile-name {
          font-weight: 600;
          font-size: 0.875rem;
          color: white;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .profile-role {
          font-size: 0.7rem;
          color: rgba(255,255,255,0.5);
          font-weight: 500;
          letter-spacing: 0.05em;
        }

        .logout-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 9px 14px;
          border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.15);
          background: transparent;
          color: rgba(255,255,255,0.65);
          font-family: 'Lexend', sans-serif;
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.18s ease;
          white-space: nowrap;
        }

        .logout-btn:hover {
          background: rgba(255,255,255,0.1);
          color: white;
          border-color: rgba(255,255,255,0.25);
        }

        /* Toggle button */
        .toggle-btn {
          position: fixed;
          top: 16px;
          left: ${isOpen ? "268px" : "16px"};
          z-index: 1000;
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: #16a34a;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          box-shadow: 0 2px 12px rgba(22, 163, 74, 0.4);
          transition: left 0.35s cubic-bezier(0.4,0,0.2,1), background 0.18s;
        }

        .toggle-btn:hover {
          background: #15803d;
        }

        @media(width > 640px){
          .sidebar-root{
            display: block;
          }
        }
      `}</style>

      <div className="sidebar-root flex fixed inset-y-0 left-0 w-64 z-50">
        {/* Toggle Button */}
        <button
          className="toggle-btn"
          onClick={() => setIsOpen(!isOpen)}
          title={isOpen ? "Collapse sidebar" : "Expand sidebar"}
          style={{ left: isOpen ? "268px" : "16px" }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              width: 16,
              height: 16,
              transition: "transform 0.35s",
              transform: isOpen ? "rotate(0deg)" : "rotate(180deg)",
            }}
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        {/* Sidebar */}
        <div className={`sidebar-panel ${isOpen ? "" : "collapsed"}`}>
          <div className="sidebar-inner">
            {/* Logo */}
            <div className="logo-area">
              <Image
                src="/qspallets.png"
                alt=""
                width={100}
                height={100}
                sizes="100vw"
                className="sidebar-logo"
              />
              <div>
                <div className="logo-text">QS Pallets</div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="nav-section">
              <div className="nav-label">Main Menu</div>

              <ul>
                <Link href="/">
                  <li
                    className={`nav-item ${isActiveLink("/") ? "active" : ""}`}
                  >
                    <span className="nav-icon">
                      <FaHome />
                    </span>
                    Home
                  </li>
                </Link>
                <Link href="/orders">
                  <li
                    className={`nav-item ${isActiveLink("/orders") ? "active" : ""}`}
                  >
                    <span className="nav-icon">
                      <TbInvoice />
                    </span>
                    Orders
                  </li>
                </Link>
                <Link href="/our-products">
                  <li
                    className={`nav-item ${isActiveLink("/our-products") ? "active" : ""}`}
                  >
                    <span className="nav-icon">
                      <LiaPalletSolid />
                    </span>
                    Products
                  </li>
                </Link>
                <Link href="/customers">
                  <li
                    className={`nav-item ${isActiveLink("/customers") ? "active" : ""}`}
                  >
                    <span className="nav-icon">
                      <IoMdPeople />
                    </span>
                    Customers
                  </li>
                </Link>
                <Link href="/quotes">
                  <li
                    className={`nav-item ${isActiveLink("/quotes") ? "active" : ""}`}
                  >
                    <span className="nav-icon">
                      <MdRequestQuote />
                    </span>
                    Quotes
                  </li>
                </Link>
                <Link href="/analytics">
                  <li
                    className={`nav-item ${isActiveLink("/analytics") ? "active" : ""}`}
                  >
                    <span className="nav-icon">
                      <IoAnalytics />
                    </span>
                    Analytics
                  </li>
                </Link>
                <Link href="/settings">
                  <li
                    className={`nav-item ${isActiveLink("/settings") ? "active" : ""}`}
                  >
                    <span className="nav-icon">
                      <IoMdSettings />
                    </span>
                    Settings
                  </li>
                </Link>
                {status !== "loading" && session?.user.role === "admin" && (
                  <Link href="/users">
                    <li
                      className={`nav-item ${isActiveLink("/users") ? "active" : ""}`}
                    >
                      <span className="nav-icon">
                        <FaUser />
                      </span>
                      Users
                    </li>
                  </Link>
                )}
              </ul>
            </nav>

            {/* Profile & Logout */}
            <div className="profile-section">
              <LogoutButton />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SidebarMenu;
