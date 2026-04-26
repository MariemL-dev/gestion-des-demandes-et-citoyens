import React, { useEffect, useMemo, useState } from "react";
import {
  useGetCitizensQuery,
  useGetDemandesQuery,
  useGetStatusesQuery,
} from "../redux/apiSlice";
import "./SearchPage.css";

export default function SearchPage({ searchText = "", language = "EN" }) {
  const [query, setQuery] = useState(searchText);

  const { data: citizens = [], isLoading: citizensLoading } =
    useGetCitizensQuery();
  const { data: demandes = [], isLoading: demandesLoading } =
    useGetDemandesQuery();
  const { data: statuses = [], isLoading: statusesLoading } =
    useGetStatusesQuery();

  const text = {
    EN: {
      title: "Global Search",
      subtitle: "Search across citizens, demandes and statuses.",
      placeholder: "Type here to search...",
      loading: "Loading search data...",
      results: "result(s) found",
      citizens: "Citizens",
      demandes: "Demandes",
      status: "Status",
      noCitizens: "No citizens found",
      noDemandes: "No demandes found",
      noStatus: "No status found",
      noCitizen: "No citizen",
      noStatusLabel: "No status",
      demande: "demande(s)",
    },
    FR: {
      title: "Recherche globale",
      subtitle: "Rechercher parmi les citoyens, demandes et statuts.",
      placeholder: "Tapez ici pour rechercher...",
      loading: "Chargement des données...",
      results: "résultat(s) trouvé(s)",
      citizens: "Citoyens",
      demandes: "Demandes",
      status: "Statut",
      noCitizens: "Aucun citoyen trouvé",
      noDemandes: "Aucune demande trouvée",
      noStatus: "Aucun statut trouvé",
      noCitizen: "Aucun citoyen",
      noStatusLabel: "Aucun statut",
      demande: "demande(s)",
    },
    AR: {
      title: "البحث الشامل",
      subtitle: "البحث في المواطنين والطلبات والحالات.",
      placeholder: "اكتب هنا للبحث...",
      loading: "جاري تحميل البيانات...",
      results: "نتيجة موجودة",
      citizens: "المواطنون",
      demandes: "الطلبات",
      status: "الحالات",
      noCitizens: "لا يوجد مواطنون",
      noDemandes: "لا توجد طلبات",
      noStatus: "لا توجد حالات",
      noCitizen: "لا يوجد مواطن",
      noStatusLabel: "لا توجد حالة",
      demande: "طلب",
    },
  };

  const t = text[language];

  useEffect(() => {
    setQuery(searchText);
  }, [searchText]);

  const isLoading = citizensLoading || demandesLoading || statusesLoading;

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();

    if (!q) {
      return {
        citizens: [],
        demandes: [],
        statuses: [],
      };
    }

    return {
      citizens: citizens.filter((item) =>
        `${item.nom} ${item.prenom} ${item.email}`.toLowerCase().includes(q),
      ),

      demandes: demandes.filter((item) =>
        `${item.title} ${item.description} ${item.citizen?.nom || ""} ${
          item.citizen?.prenom || ""
        } ${item.status?.name || ""}`
          .toLowerCase()
          .includes(q),
      ),

      statuses: statuses.filter((item) =>
        `${item.name}`.toLowerCase().includes(q),
      ),
    };
  }, [query, citizens, demandes, statuses]);

  const totalResults =
    results.citizens.length + results.demandes.length + results.statuses.length;

  return (
    <div className="search-page">
      <div className="search-header">
        <h1>{t.title}</h1>
        <p>{t.subtitle}</p>
      </div>

      <div className="search-box-card">
        <input
          type="text"
          placeholder={t.placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="global-search-input"
        />
      </div>

      {isLoading ? (
        <div className="search-section">{t.loading}</div>
      ) : (
        <>
          <div className="search-summary">
            <strong>{totalResults}</strong> {t.results}
          </div>

          <div className="search-grid">
            <div className="search-section">
              <h3>{t.citizens}</h3>

              {results.citizens.length > 0 ? (
                results.citizens.map((item) => (
                  <div className="search-item" key={`citizen-${item.id}`}>
                    <strong>
                      {item.prenom} {item.nom}
                    </strong>
                    <p>{item.email}</p>
                  </div>
                ))
              ) : (
                <p className="empty-text">{t.noCitizens}</p>
              )}
            </div>

            <div className="search-section">
              <h3>{t.demandes}</h3>

              {results.demandes.length > 0 ? (
                results.demandes.map((item) => (
                  <div className="search-item" key={`demande-${item.id}`}>
                    <strong>{item.title}</strong>
                    <p>{item.description}</p>
                    <small>
                      {item.citizen
                        ? `${item.citizen.prenom} ${item.citizen.nom}`
                        : t.noCitizen}{" "}
                      — {item.status?.name || t.noStatusLabel}
                    </small>
                  </div>
                ))
              ) : (
                <p className="empty-text">{t.noDemandes}</p>
              )}
            </div>

            <div className="search-section">
              <h3>{t.status}</h3>

              {results.statuses.length > 0 ? (
                results.statuses.map((item) => (
                  <div className="search-item" key={`status-${item.id}`}>
                    <strong>{item.name}</strong>
                    <p>
                      {item.demandes?.length || 0} {t.demande}
                    </p>
                  </div>
                ))
              ) : (
                <p className="empty-text">{t.noStatus}</p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
