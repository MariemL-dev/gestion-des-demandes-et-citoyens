import React from "react";
import {
  useGetCitizensQuery,
  useGetDemandesQuery,
  useGetStatusesQuery,
} from "../redux/apiSlice";
import "./Analytics.css";

export default function Analytics({ language = "EN" }) {
  const { data: citizens = [], isLoading: cLoading } = useGetCitizensQuery();
  const { data: demandes = [], isLoading: dLoading } = useGetDemandesQuery();
  const { data: statuses = [], isLoading: sLoading } = useGetStatusesQuery();

  const text = {
    EN: {
      title: "Analytics",
      subtitle: "Visual overview of citizens, demandes and status activity.",
      totalCitizens: "Total Citizens",
      totalDemandes: "Total Demandes",
      totalStatus: "Total Status",
      approved: "Approved",
      demandesByStatus: "Demandes by Status",
      pending: "En attente",
      rejected: "Rejected",
      summary: "Platform Summary",
      citizensRegistered: "Citizens registered",
      demandesCreated: "Demandes created",
      statusesAvailable: "Statuses available",
      systemHealth: "System health",
      stable: "Stable",
      distribution: "Status Distribution",
      loading: "Loading analytics...",
    },
    FR: {
      title: "Analytique",
      subtitle: "Vue visuelle des citoyens, demandes et activités des statuts.",
      totalCitizens: "Total citoyens",
      totalDemandes: "Total demandes",
      totalStatus: "Total statuts",
      approved: "Approuvées",
      demandesByStatus: "Demandes par statut",
      pending: "En attente",
      rejected: "Rejetées",
      summary: "Résumé de la plateforme",
      citizensRegistered: "Citoyens enregistrés",
      demandesCreated: "Demandes créées",
      statusesAvailable: "Statuts disponibles",
      systemHealth: "État du système",
      stable: "Stable",
      distribution: "Distribution des statuts",
      loading: "Chargement des statistiques...",
    },
    AR: {
      title: "التحليلات",
      subtitle: "نظرة إحصائية على المواطنين والطلبات والحالات.",
      totalCitizens: "مجموع المواطنين",
      totalDemandes: "مجموع الطلبات",
      totalStatus: "مجموع الحالات",
      approved: "مقبولة",
      demandesByStatus: "الطلبات حسب الحالة",
      pending: "قيد الانتظار",
      rejected: "مرفوضة",
      summary: "ملخص المنصة",
      citizensRegistered: "مواطنون مسجلون",
      demandesCreated: "طلبات منشأة",
      statusesAvailable: "حالات متاحة",
      systemHealth: "حالة النظام",
      stable: "مستقر",
      distribution: "توزيع الحالات",
      loading: "جاري تحميل التحليلات...",
    },
  };

  const t = text[language];

  const loading = cLoading || dLoading || sLoading;

  if (loading) {
    return <div className="analytics-page">{t.loading}</div>;
  }

  const totalCitizens = citizens.length;
  const totalDemandes = demandes.length;
  const totalStatuses = statuses.length;

  const approved = demandes.filter((d) =>
    d.status?.name?.toLowerCase().includes("appr"),
  ).length;

  const rejected = demandes.filter((d) =>
    d.status?.name?.toLowerCase().includes("rejet"),
  ).length;

  const pending = demandes.filter((d) =>
    d.status?.name?.toLowerCase().includes("attente"),
  ).length;

  const maxValue = Math.max(approved, rejected, pending, 1);

  return (
    <div className="analytics-page">
      <div className="analytics-header">
        <h1>{t.title}</h1>
        <p>{t.subtitle}</p>
      </div>

      <div className="analytics-cards">
        <div className="analytics-card blue">
          <span>{t.totalCitizens}</span>
          <h2>{totalCitizens}</h2>
        </div>

        <div className="analytics-card green">
          <span>{t.totalDemandes}</span>
          <h2>{totalDemandes}</h2>
        </div>

        <div className="analytics-card purple">
          <span>{t.totalStatus}</span>
          <h2>{totalStatuses}</h2>
        </div>

        <div className="analytics-card orange">
          <span>{t.approved}</span>
          <h2>{approved}</h2>
        </div>
      </div>

      <div className="analytics-grid">
        <div className="analytics-panel">
          <h3>{t.demandesByStatus}</h3>

          <div className="bar-chart">
            <div className="bar-row">
              <span>{t.pending}</span>
              <div className="bar-track">
                <div
                  className="bar pending"
                  style={{ width: `${(pending / maxValue) * 100}%` }}
                ></div>
              </div>
              <strong>{pending}</strong>
            </div>

            <div className="bar-row">
              <span>{t.approved}</span>
              <div className="bar-track">
                <div
                  className="bar approved"
                  style={{ width: `${(approved / maxValue) * 100}%` }}
                ></div>
              </div>
              <strong>{approved}</strong>
            </div>

            <div className="bar-row">
              <span>{t.rejected}</span>
              <div className="bar-track">
                <div
                  className="bar rejected"
                  style={{ width: `${(rejected / maxValue) * 100}%` }}
                ></div>
              </div>
              <strong>{rejected}</strong>
            </div>
          </div>
        </div>

        <div className="analytics-panel">
          <h3>{t.summary}</h3>

          <div className="summary-line">
            <span>{t.citizensRegistered}</span>
            <strong>{totalCitizens}</strong>
          </div>

          <div className="summary-line">
            <span>{t.demandesCreated}</span>
            <strong>{totalDemandes}</strong>
          </div>

          <div className="summary-line">
            <span>{t.statusesAvailable}</span>
            <strong>{totalStatuses}</strong>
          </div>

          <div className="summary-line">
            <span>{t.systemHealth}</span>
            <strong className="success">{t.stable}</strong>
          </div>
        </div>
      </div>

      <div className="analytics-panel">
        <h3>{t.distribution}</h3>

        <div className="status-grid">
          {statuses.map((status) => (
            <div className="status-mini-card" key={status.id}>
              <span>{status.name}</span>
              <strong>{status.demandes?.length || 0}</strong>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
