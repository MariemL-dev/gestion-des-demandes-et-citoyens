import React from "react";
import {
  useGetCitizensQuery,
  useGetDemandesQuery,
  useGetStatusesQuery,
} from "../redux/apiSlice";
import "./Dashboard.css";

export default function Dashboard({ language = "EN" }) {
  const { data: citizens = [] } = useGetCitizensQuery();
  const { data: demandes = [] } = useGetDemandesQuery();
  const { data: statuses = [] } = useGetStatusesQuery();

  const totalCitizens = citizens.length;
  const totalDemandes = demandes.length;
  const totalStatuses = statuses.length;

  const approved = demandes.filter((d) =>
    d.status?.name?.toLowerCase().includes("appr"),
  ).length;

  const latestCitizen = citizens[citizens.length - 1];
  const latestDemande = demandes[demandes.length - 1];

  const text = {
    EN: {
      greeting: "Good morning, Admin 👋",
      subtitle: "Here's what's happening in your platform today.",
      citizens: "Citizens",
      demandes: "Demandes",
      status: "Status",
      approved: "Approved",
      chart: "Revenue Growth",
      trend: "Monthly trend",
      latest: "Latest Activity",
      live: "Live",
      newCitizen: "New Citizen",
      newDemande: "New Demande",
      summary: "Platform Summary",
      health: "Health",
      stable: "Stable",
      recent: "Recent Demandes",
      items: "items",
      pending: "Pending",
    },

    FR: {
      greeting: "Bonjour, Admin 👋",
      subtitle: "Voici l’activité de votre plateforme aujourd’hui.",
      citizens: "Citoyens",
      demandes: "Demandes",
      status: "Statuts",
      approved: "Approuvées",
      chart: "Croissance",
      trend: "Tendance mensuelle",
      latest: "Dernière activité",
      live: "Direct",
      newCitizen: "Nouveau citoyen",
      newDemande: "Nouvelle demande",
      summary: "Résumé plateforme",
      health: "État",
      stable: "Stable",
      recent: "Demandes récentes",
      items: "éléments",
      pending: "En attente",
    },

    AR: {
      greeting: "صباح الخير، Admin 👋",
      subtitle: "هذا ما يحدث في منصتك اليوم.",
      citizens: "المواطنون",
      demandes: "الطلبات",
      status: "الحالات",
      approved: "المقبولة",
      chart: "نمو النشاط",
      trend: "الاتجاه الشهري",
      latest: "آخر نشاط",
      live: "مباشر",
      newCitizen: "مواطن جديد",
      newDemande: "طلب جديد",
      summary: "ملخص المنصة",
      health: "الحالة",
      stable: "مستقر",
      recent: "آخر الطلبات",
      items: "عناصر",
      pending: "قيد الانتظار",
    },
  };

  const t = text[language] || text.EN;

  return (
    <div className={`dashboard-page ${language === "AR" ? "rtl-page" : ""}`}>
      {/* HERO */}
      <div className="premium-hero">
        <div>
          <h1>{t.greeting}</h1>
          <p>{t.subtitle}</p>
        </div>

        <div className="hero-mini-grid">
          <div className="mini-stat">
            <span>{t.citizens}</span>
            <strong>{totalCitizens}</strong>
          </div>

          <div className="mini-stat">
            <span>{t.demandes}</span>
            <strong>{totalDemandes}</strong>
          </div>

          <div className="mini-stat">
            <span>{t.status}</span>
            <strong>{totalStatuses}</strong>
          </div>

          <div className="mini-stat">
            <span>{t.approved}</span>
            <strong>{approved}</strong>
          </div>
        </div>
      </div>

      {/* MAIN GRID */}
      <div className="premium-grid">
        <div className="dashboard-panel">
          <div className="panel-header">
            <h3>{t.chart}</h3>
            <span>{t.trend}</span>
          </div>

          <div className="fake-chart">
            <div className="line one"></div>
            <div className="line two"></div>
          </div>
        </div>

        <div className="side-stack">
          <div className="dashboard-panel">
            <div className="panel-header">
              <h3>{t.latest}</h3>
              <span>{t.live}</span>
            </div>

            <div className="activity-list">
              {latestCitizen && (
                <div className="activity-item">
                  <div className="activity-icon">👤</div>
                  <div>
                    <strong>{t.newCitizen}</strong>
                    <p>
                      {latestCitizen.prenom} {latestCitizen.nom}
                    </p>
                  </div>
                </div>
              )}

              {latestDemande && (
                <div className="activity-item">
                  <div className="activity-icon">📄</div>
                  <div>
                    <strong>{t.newDemande}</strong>
                    <p>{latestDemande.title}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="dashboard-panel">
            <div className="panel-header">
              <h3>{t.summary}</h3>
            </div>

            <div className="summary-box">
              <div className="summary-item">
                <span>{t.citizens}</span>
                <strong>{totalCitizens}</strong>
              </div>

              <div className="summary-item">
                <span>{t.demandes}</span>
                <strong>{totalDemandes}</strong>
              </div>

              <div className="summary-item">
                <span>{t.status}</span>
                <strong>{totalStatuses}</strong>
              </div>

              <div className="summary-item">
                <span>{t.health}</span>
                <strong className="green-text">{t.stable}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RECENT */}
      <div className="dashboard-panel">
        <div className="panel-header">
          <h3>{t.recent}</h3>
          <span>
            {demandes.length} {t.items}
          </span>
        </div>

        <div className="recent-demandes">
          {demandes
            .slice(-4)
            .reverse()
            .map((item) => (
              <div className="recent-demande" key={item.id}>
                <div>
                  <strong>{item.title}</strong>
                  <p>{item.description}</p>
                </div>

                <span className="recent-status">
                  {item.status?.name || t.pending}
                </span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
