import React from "react";
import {
  useGetCitizensQuery,
  useGetDemandesQuery,
  useGetAdminProfileQuery,
} from "../redux/apiSlice";

const NavIcon = ({ name }) => {
  const icons = {
    dashboard: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
      </svg>
    ),

    citizens: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),

    demandes: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="9" y1="13" x2="15" y2="13" />
        <line x1="9" y1="17" x2="12" y2="17" />
      </svg>
    ),

    status: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),

    analytics: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),

    settings: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
      </svg>
    ),

    help: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),

    logout: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
        <polyline points="16 17 21 12 16 7" />
        <line x1="21" y1="12" x2="9" y2="12" />
      </svg>
    ),

    logo: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  };

  return icons[name] || null;
};

export default function Sidebar({
  activePage,
  setActivePage,
  isOpen,
  language = "EN",
}) {
  const { data: citizens = [] } = useGetCitizensQuery();
  const { data: demandes = [] } = useGetDemandesQuery();
  const { data: adminProfile } = useGetAdminProfileQuery();

  const text = {
    EN: {
      mainMenu: "Main menu",
      system: "System",
      dashboard: "Dashboard",
      citizens: "Citizens",
      demandes: "Demandes",
      status: "Status",
      analytics: "Analytics",
      settings: "Settings",
      help: "Help & Docs",
      portal: "Management Portal",
    },

    FR: {
      mainMenu: "Menu principal",
      system: "Système",
      dashboard: "Tableau de bord",
      citizens: "Citoyens",
      demandes: "Demandes",
      status: "Statut",
      analytics: "Analytique",
      settings: "Paramètres",
      help: "Aide & Docs",
      portal: "Portail de gestion",
    },

    AR: {
      mainMenu: "القائمة الرئيسية",
      system: "النظام",
      dashboard: "لوحة التحكم",
      citizens: "المواطنون",
      demandes: "الطلبات",
      status: "الحالات",
      analytics: "التحليلات",
      settings: "الإعدادات",
      help: "المساعدة",
      portal: "بوابة الإدارة",
    },
  };

  const t = text[language];

  const adminName = adminProfile?.fullName || "Admin Manager";
  const adminRole = adminProfile?.role || "Super Administrator";

  const initials = adminName
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const mainNav = [
    { id: "dashboard", label: t.dashboard, icon: "dashboard" },
    {
      id: "citizens",
      label: t.citizens,
      icon: "citizens",
      badge: citizens.length,
    },
    {
      id: "demandes",
      label: t.demandes,
      icon: "demandes",
      badge: demandes.length,
    },
    { id: "status", label: t.status, icon: "status" },
  ];

  const secondaryNav = [
    { id: "analytics", label: t.analytics, icon: "analytics" },
    { id: "settings", label: t.settings, icon: "settings" },
    { id: "help", label: t.help, icon: "help" },
  ];

  return (
    <aside className={`sidebar${isOpen ? " open" : ""}`}>
      <div className="sidebar-logo">
        <div className="sidebar-logo-icon">
          <NavIcon name="logo" />
        </div>
        <div className="sidebar-logo-text">
          <strong>Administration Civile</strong>
          <span>{t.portal}</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        <div className="nav-section-label">{t.mainMenu}</div>

        {mainNav.map((item) => (
          <button
            key={item.id}
            className={`nav-link${activePage === item.id ? " active" : ""}`}
            onClick={() => setActivePage(item.id)}
            style={{
              width: "100%",
              textAlign: "left",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            <NavIcon name={item.icon} />
            <span style={{ flex: 1 }}>{item.label}</span>

            {item.badge !== undefined && (
              <span className="nav-link-badge">{item.badge}</span>
            )}
          </button>
        ))}

        <div className="nav-section-label" style={{ marginTop: 20 }}>
          {t.system}
        </div>

        {secondaryNav.map((item) => (
          <button
            key={item.id}
            className={`nav-link${activePage === item.id ? " active" : ""}`}
            onClick={() => setActivePage(item.id)}
            style={{
              width: "100%",
              textAlign: "left",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            <NavIcon name={item.icon} />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-avatar">{initials}</div>

        <div className="sidebar-user-info">
          <div className="sidebar-user-name">{adminName}</div>
          <div className="sidebar-user-role">{adminRole}</div>
        </div>

        <button
          className="sidebar-logout-btn"
          title="Log out"
          onClick={() => {
            const confirmLogout = window.confirm(
              language === "FR"
                ? "Voulez-vous vous déconnecter ?"
                : language === "AR"
                  ? "هل تريد تسجيل الخروج؟"
                  : "Do you want to logout?",
            );

            if (confirmLogout) {
              alert(
                language === "FR"
                  ? "Déconnexion réussie"
                  : language === "AR"
                    ? "تم تسجيل الخروج"
                    : "Logged out successfully",
              );

              window.location.reload();
            }
          }}
        >
          <NavIcon name="logout" />
        </button>
      </div>
    </aside>
  );
}
