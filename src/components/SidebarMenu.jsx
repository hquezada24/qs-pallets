"use client";
import { useState } from "react";
import Image from "next/image";

const menuItems = [
  {
    label: "Home",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5"
      >
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
        <line x1="12" y1="12" x2="12" y2="17" />
        <line x1="9.5" y1="14.5" x2="14.5" y2="14.5" />
      </svg>
    ),
  },
  {
    label: "Inventory",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5"
      >
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
        <line x1="12" y1="12" x2="12" y2="17" />
        <line x1="9.5" y1="14.5" x2="14.5" y2="14.5" />
      </svg>
    ),
  },
  {
    label: "Orders",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5"
      >
        <path d="M9 11l3 3L22 4" />
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
      </svg>
    ),
  },
  {
    label: "Quotes",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5"
      >
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
  },
  {
    label: "Customers",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5"
      >
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    label: "Analytics",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5"
      >
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
  },
  {
    label: "Settings",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5"
      >
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
  },
];

const SidebarMenu = ({ isOpen, setIsOpen }) => {
  const [activeItem, setActiveItem] = useState("Inventory");

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lexend:wght@100..900&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap');

        .sidebar-root {
          font-family: 'Lexend', sans-serif;
        }

        .sidebar-panel {
          width: 260px;
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
      `}</style>

      <div className="sidebar-root flex">
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
              {menuItems.map((item) => (
                <div
                  key={item.label}
                  className={`nav-item ${activeItem === item.label ? "active" : ""}`}
                  onClick={() => setActiveItem(item.label)}
                >
                  <span className="nav-icon">{item.icon}</span>
                  {item.label}
                </div>
              ))}
            </nav>

            {/* Profile & Logout */}
            <div className="profile-section">
              <div className="profile-card">
                <div className="avatar">J</div>
                <div className="profile-info">
                  <div className="profile-name">John Smith</div>
                  <div className="profile-role">Administrator</div>
                </div>
              </div>
              <button className="logout-btn">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ width: 16, height: 16 }}
                >
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
                Log Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SidebarMenu;
