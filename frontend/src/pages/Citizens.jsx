import React, { useState } from "react";
import {
  useGetCitizensQuery,
  useAddCitizenMutation,
  useDeleteCitizenMutation,
  useUpdateCitizenMutation,
} from "../redux/apiSlice";
import "./Citizens.css";

export default function Citizens({ language = "EN" }) {
  const {
    data: citizens = [],
    isLoading,
    error,
    refetch,
  } = useGetCitizensQuery();

  const [addCitizen] = useAddCitizenMutation();
  const [deleteCitizen] = useDeleteCitizenMutation();
  const [updateCitizen] = useUpdateCitizenMutation();

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
  });

  const text = {
    EN: {
      title: "Citizens",
      search: "Search...",
      add: "+ Add Citizen",
      export: "Export CSV",
      nom: "Nom",
      prenom: "Prenom",
      email: "Email",
      status: "Status",
      actions: "Actions",
      active: "Active",
      edit: "Edit",
      delete: "Delete",
      prev: "Prev",
      next: "Next",
      page: "Page",
      noData: "No citizens found",
      addTitle: "Add Citizen",
      editTitle: "Edit Citizen",
      save: "Save",
      cancel: "Cancel",
      loading: "Loading...",
      error: "Error loading data",
      confirm: "Delete this citizen?",
      failed: "Operation failed",
      deleteFailed: "Delete failed",
    },

    FR: {
      title: "Citoyens",
      search: "Rechercher...",
      add: "+ Ajouter citoyen",
      export: "Exporter CSV",
      nom: "Nom",
      prenom: "Prénom",
      email: "Email",
      status: "Statut",
      actions: "Actions",
      active: "Actif",
      edit: "Modifier",
      delete: "Supprimer",
      prev: "Précédent",
      next: "Suivant",
      page: "Page",
      noData: "Aucun citoyen",
      addTitle: "Ajouter citoyen",
      editTitle: "Modifier citoyen",
      save: "Enregistrer",
      cancel: "Annuler",
      loading: "Chargement...",
      error: "Erreur de chargement",
      confirm: "Supprimer ce citoyen ?",
      failed: "Échec de l'opération",
      deleteFailed: "Échec suppression",
    },

    AR: {
      title: "المواطنون",
      search: "بحث...",
      add: "+ إضافة مواطن",
      export: "تصدير CSV",
      nom: "الاسم",
      prenom: "النسب",
      email: "البريد",
      status: "الحالة",
      actions: "الإجراءات",
      active: "نشط",
      edit: "تعديل",
      delete: "حذف",
      prev: "السابق",
      next: "التالي",
      page: "الصفحة",
      noData: "لا يوجد مواطنون",
      addTitle: "إضافة مواطن",
      editTitle: "تعديل مواطن",
      save: "حفظ",
      cancel: "إلغاء",
      loading: "جاري التحميل...",
      error: "خطأ في التحميل",
      confirm: "حذف هذا المواطن؟",
      failed: "فشلت العملية",
      deleteFailed: "فشل الحذف",
    },
  };

  const t = text[language];
  const citizensPerPage = 5;

  const exportCitizensCSV = () => {
    const headers = ["Nom", "Prenom", "Email", "Status"];

    const rows = citizens.map((item) => [
      item.nom,
      item.prenom,
      item.email,
      "Active",
    ]);

    const csv = [headers, ...rows]
      .map((row) => row.map((v) => `"${v}"`).join(","))
      .join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "citizens.csv";
    link.click();
  };

  const openAddModal = () => {
    setEditingId(null);
    setFormData({ nom: "", prenom: "", email: "" });
    setShowModal(true);
  };

  const openEditModal = (citizen) => {
    setEditingId(citizen.id);
    setFormData({
      nom: citizen.nom,
      prenom: citizen.prenom,
      email: citizen.email,
    });
    setShowModal(true);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      if (editingId) {
        await updateCitizen({
          id: editingId,
          data: formData,
        }).unwrap();
      } else {
        await addCitizen(formData).unwrap();
      }

      refetch();
      setShowModal(false);
      setEditingId(null);
      setFormData({ nom: "", prenom: "", email: "" });
    } catch {
      alert(t.failed);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm(t.confirm)) return;

    try {
      await deleteCitizen(id).unwrap();
      refetch();
    } catch {
      alert(t.deleteFailed);
    }
  };

  const filteredCitizens = citizens.filter((item) =>
    `${item.nom} ${item.prenom} ${item.email}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  const totalPages = Math.ceil(filteredCitizens.length / citizensPerPage) || 1;
  const startIndex = (currentPage - 1) * citizensPerPage;

  const currentCitizens = filteredCitizens.slice(
    startIndex,
    startIndex + citizensPerPage,
  );

  if (isLoading) return <div className="citizens-page">{t.loading}</div>;
  if (error) return <div className="citizens-page">{t.error}</div>;

  return (
    <div className="citizens-page">
      <div className="citizens-header">
        <h1>{t.title}</h1>

        <div className="header-actions">
          <input
            className="search-input"
            type="text"
            placeholder={t.search}
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />

          <button className="secondary-btn" onClick={exportCitizensCSV}>
            {t.export}
          </button>

          <button className="primary-btn" onClick={openAddModal}>
            {t.add}
          </button>
        </div>
      </div>

      <div className="table-card">
        <table className="citizens-table">
          <thead>
            <tr>
              <th>{t.nom}</th>
              <th>{t.prenom}</th>
              <th>{t.email}</th>
              <th>{t.status}</th>
              <th>{t.actions}</th>
            </tr>
          </thead>

          <tbody>
            {currentCitizens.length > 0 ? (
              currentCitizens.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div className="citizen-name-cell">
                      <div className="avatar-circle">
                        {item.nom.charAt(0).toUpperCase()}
                      </div>
                      <span>{item.nom}</span>
                    </div>
                  </td>

                  <td>{item.prenom}</td>
                  <td>{item.email}</td>

                  <td>
                    <span className="status-badge">{t.active}</span>
                  </td>

                  <td className="actions-cell">
                    <div className="action-buttons">
                      <button
                        className="edit-btn"
                        onClick={() => openEditModal(item)}
                      >
                        {t.edit}
                      </button>

                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(item.id)}
                      >
                        {t.delete}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="empty-row">
                  {t.noData}
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="pagination">
          <button
            className="secondary-btn"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          >
            {t.prev}
          </button>

          <span>
            {t.page} {currentPage} / {totalPages}
          </span>

          <button
            className="secondary-btn"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
          >
            {t.next}
          </button>
        </div>
      </div>

      {showModal && (
        <div className="overlay">
          <div className="modal-box">
            <h2>{editingId ? t.editTitle : t.addTitle}</h2>

            <input
              type="text"
              name="nom"
              placeholder={t.nom}
              value={formData.nom}
              onChange={handleChange}
            />

            <input
              type="text"
              name="prenom"
              placeholder={t.prenom}
              value={formData.prenom}
              onChange={handleChange}
            />

            <input
              type="email"
              name="email"
              placeholder={t.email}
              value={formData.email}
              onChange={handleChange}
            />

            <div className="modal-actions">
              <button className="primary-btn" onClick={handleSubmit}>
                {t.save}
              </button>

              <button
                className="secondary-btn"
                onClick={() => setShowModal(false)}
              >
                {t.cancel}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
