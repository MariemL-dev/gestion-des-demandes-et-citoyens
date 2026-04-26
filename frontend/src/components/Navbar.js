import React, { useState } from "react";
import {
  useGetAdminProfileQuery,
  useGetCitizensQuery,
  useGetDemandesQuery,
} from "../redux/apiSlice";

export default function Navbar({
  searchText = "",
  onSearchChange,
  onSearchFocus,
  darkMode = false,
  setDarkMode,
  language = "EN",
  setLanguage,
}) {
  const [open, setOpen] = useState(false);

  const { data: adminProfile } = useGetAdminProfileQuery();
  const { data: citizens = [] } = useGetCitizensQuery();
  const { data: demandes = [] } = useGetDemandesQuery();

  const adminName = adminProfile?.fullName || "Admin Manager";

  const initials = adminName
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const latestCitizen = citizens[citizens.length - 1];
  const latestDemande = demandes[demandes.length - 1];

  const notificationCount = (latestCitizen ? 1 : 0) + (latestDemande ? 1 : 0);

  const text = {
    EN: {
      search: "Search anything...",
      notifications: "Notifications",
      newCitizen: "New citizen",
      newDemande: "New demande",
      empty: "No notifications",
    },
    FR: {
      search: "Rechercher...",
      notifications: "Notifications",
      newCitizen: "Nouveau citoyen",
      newDemande: "Nouvelle demande",
      empty: "Aucune notification",
    },
    AR: {
      search: "بحث...",
      notifications: "الإشعارات",
      newCitizen: "مواطن جديد",
      newDemande: "طلب جديد",
      empty: "لا توجد إشعارات",
    },
  };

  const t = text[language] || text.EN;

  return (
    <div className="navbar">
      <div className="navbar-search">
        <span className="search-icon">⌕</span>

        <input
          type="text"
          placeholder={t.search}
          value={searchText}
          onFocus={() => onSearchFocus && onSearchFocus()}
          onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
        />
      </div>

      <div className="navbar-right">
        <div className="notification-wrapper">
          <button className="nav-icon-btn" onClick={() => setOpen(!open)}>
            🔔
            {notificationCount > 0 && (
              <span className="notif-badge">{notificationCount}</span>
            )}
          </button>

          {open && (
            <div className="notification-dropdown">
              <h4>{t.notifications}</h4>

              {latestCitizen && (
                <p>
                  {t.newCitizen}: {latestCitizen.prenom} {latestCitizen.nom}
                </p>
              )}

              {latestDemande && (
                <p>
                  {t.newDemande}: {latestDemande.title}
                </p>
              )}

              {notificationCount === 0 && <p>{t.empty}</p>}
            </div>
          )}
        </div>

        <div className="language-switcher">
          {["FR", "EN", "AR"].map((lang) => (
            <button
              key={lang}
              type="button"
              className={language === lang ? "lang-active" : ""}
              onClick={() => setLanguage && setLanguage(lang)}
            >
              {lang}
            </button>
          ))}
        </div>

        <button
          type="button"
          className="nav-icon-btn"
          onClick={() => setDarkMode && setDarkMode(!darkMode)}
        >
          {darkMode ? "☀️" : "🌙"}
        </button>

        <div
          className="nav-icon-btn"
          style={{ cursor: "pointer" }}
          onClick={() => {
            window.dispatchEvent(new CustomEvent("openHelpPage"));
          }}
        >
          ❔
        </div>

        <div className="navbar-date">25 Apr 2026</div>

        <div className="navbar-avatar">{initials}</div>
      </div>
    </div>
  );
}
