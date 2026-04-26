import React, { useState } from "react";
import {
  useGetDemandesQuery,
  useAddDemandeMutation,
  useUpdateDemandeMutation,
  useDeleteDemandeMutation,
  useGetCitizensQuery,
  useGetStatusesQuery,
} from "../redux/apiSlice";
import "./Demandes.css";

export default function Demandes({ language = "EN" }) {
  const {
    data: demandes = [],
    isLoading,
    error,
    refetch,
  } = useGetDemandesQuery();

  const { data: citizens = [] } = useGetCitizensQuery();
  const { data: statuses = [] } = useGetStatusesQuery();

  const [addDemande] = useAddDemandeMutation();
  const [updateDemande] = useUpdateDemandeMutation();
  const [deleteDemande] = useDeleteDemandeMutation();

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const demandesPerPage = 5;

  const text = {
    EN: {
      title: "Demandes",
      search: "Search...",
      add: "+ Add Demande",
      export: "Export CSV",
      titleCol: "Title",
      description: "Description",
      citizen: "Citizen",
      status: "Status",
      actions: "Actions",
      edit: "Edit",
      delete: "Delete",
      noData: "No demandes found",
      prev: "Prev",
      next: "Next",
      page: "Page",
      addTitle: "Add Demande",
      editTitle: "Edit Demande",
      selectCitizen: "Select Citizen",
      selectStatus: "Select Status",
      save: "Save",
      cancel: "Cancel",
      required: "All fields are required",
      failed: "Operation failed",
      confirm: "Delete this demande?",
      deleteFailed: "Delete failed",
      noCitizen: "No citizen",
      unknown: "Unknown",
      loading: "Loading...",
      error: "Error loading demandes",
    },
    FR: {
      title: "Demandes",
      search: "Rechercher...",
      add: "+ Ajouter demande",
      export: "Exporter CSV",
      titleCol: "Titre",
      description: "Description",
      citizen: "Citoyen",
      status: "Statut",
      actions: "Actions",
      edit: "Modifier",
      delete: "Supprimer",
      noData: "Aucune demande",
      prev: "Précédent",
      next: "Suivant",
      page: "Page",
      addTitle: "Ajouter demande",
      editTitle: "Modifier demande",
      selectCitizen: "Choisir citoyen",
      selectStatus: "Choisir statut",
      save: "Enregistrer",
      cancel: "Annuler",
      required: "Tous les champs sont obligatoires",
      failed: "Échec de l'opération",
      confirm: "Supprimer cette demande ?",
      deleteFailed: "Échec suppression",
      noCitizen: "Aucun citoyen",
      unknown: "Inconnu",
      loading: "Chargement...",
      error: "Erreur de chargement des demandes",
    },
    AR: {
      title: "الطلبات",
      search: "بحث...",
      add: "+ إضافة طلب",
      export: "تصدير CSV",
      titleCol: "العنوان",
      description: "الوصف",
      citizen: "المواطن",
      status: "الحالة",
      actions: "الإجراءات",
      edit: "تعديل",
      delete: "حذف",
      noData: "لا توجد طلبات",
      prev: "السابق",
      next: "التالي",
      page: "الصفحة",
      addTitle: "إضافة طلب",
      editTitle: "تعديل طلب",
      selectCitizen: "اختر المواطن",
      selectStatus: "اختر الحالة",
      save: "حفظ",
      cancel: "إلغاء",
      required: "كل الحقول مطلوبة",
      failed: "فشلت العملية",
      confirm: "حذف هذا الطلب؟",
      deleteFailed: "فشل الحذف",
      noCitizen: "لا يوجد مواطن",
      unknown: "غير معروف",
      loading: "جاري التحميل...",
      error: "خطأ في تحميل الطلبات",
    },
  };

  const t = text[language];

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    citizenId: "",
    statusId: "",
  });

  const exportDemandesCSV = () => {
    const headers = ["Title", "Description", "Citizen", "Status"];

    const rows = demandes.map((item) => [
      item.title,
      item.description,
      item.citizen ? `${item.citizen.prenom} ${item.citizen.nom}` : t.noCitizen,
      item.status?.name || t.unknown,
    ]);

    const csv = [headers, ...rows]
      .map((row) => row.map((v) => `"${v || ""}"`).join(","))
      .join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "demandes.csv";
    link.click();
  };

  const openAddModal = () => {
    setEditingId(null);
    setFormData({
      title: "",
      description: "",
      citizenId: "",
      statusId: "",
    });
    setShowModal(true);
  };

  const openEditModal = (demande) => {
    setEditingId(demande.id);
    setFormData({
      title: demande.title || "",
      description: demande.description || "",
      citizenId: demande.citizenId ? String(demande.citizenId) : "",
      statusId: demande.statusId ? String(demande.statusId) : "",
    });
    setShowModal(true);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    try {
      if (
        !formData.title ||
        !formData.description ||
        !formData.citizenId ||
        !formData.statusId
      ) {
        alert(t.required);
        return;
      }

      const payload = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        citizenId: parseInt(formData.citizenId, 10),
        statusId: parseInt(formData.statusId, 10),
      };

      console.log("PAYLOAD:", payload);

      if (editingId) {
        await updateDemande({ id: editingId, data: payload }).unwrap();
      } else {
        await addDemande(payload).unwrap();
      }

      setShowModal(false);
      setEditingId(null);
      setFormData({
        title: "",
        description: "",
        citizenId: "",
        statusId: "",
      });

      refetch();
    } catch (err) {
      console.log("DEMANDE SAVE ERROR:", err);
      alert(t.failed);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm(t.confirm)) return;

    try {
      await deleteDemande(id).unwrap();
      refetch();
    } catch {
      alert(t.deleteFailed);
    }
  };

  const filteredDemandes = demandes.filter((item) =>
    `${item.title} ${item.description} ${item.citizen?.nom || ""} ${
      item.citizen?.prenom || ""
    } ${item.status?.name || ""}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  const totalPages = Math.ceil(filteredDemandes.length / demandesPerPage) || 1;
  const startIndex = (currentPage - 1) * demandesPerPage;

  const currentDemandes = filteredDemandes.slice(
    startIndex,
    startIndex + demandesPerPage,
  );

  const getStatusClass = (statusName) => {
    if (!statusName) return "status-pending";
    const value = statusName.toLowerCase();
    if (value.includes("appr")) return "status-approved";
    if (value.includes("rejet")) return "status-rejected";
    return "status-pending";
  };

  if (isLoading) return <div className="demandes-page">{t.loading}</div>;
  if (error) return <div className="demandes-page">{t.error}</div>;

  return (
    <div className="demandes-page">
      <div className="demandes-header">
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

          <button className="secondary-btn" onClick={exportDemandesCSV}>
            {t.export}
          </button>

          <button className="primary-btn" onClick={openAddModal}>
            {t.add}
          </button>
        </div>
      </div>

      <div className="table-card">
        <table className="demandes-table">
          <thead>
            <tr>
              <th>{t.titleCol}</th>
              <th>{t.description}</th>
              <th>{t.citizen}</th>
              <th>{t.status}</th>
              <th>{t.actions}</th>
            </tr>
          </thead>

          <tbody>
            {currentDemandes.length > 0 ? (
              currentDemandes.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div className="demande-title-cell">
                      <div className="demande-icon">📄</div>
                      <span>{item.title}</span>
                    </div>
                  </td>

                  <td>{item.description}</td>

                  <td>
                    {item.citizen
                      ? `${item.citizen.prenom} ${item.citizen.nom}`
                      : t.noCitizen}
                  </td>

                  <td>
                    <span
                      className={`status-badge ${getStatusClass(
                        item.status?.name,
                      )}`}
                    >
                      {item.status?.name || t.unknown}
                    </span>
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
              name="title"
              placeholder={t.titleCol}
              value={formData.title}
              onChange={handleChange}
            />

            <input
              type="text"
              name="description"
              placeholder={t.description}
              value={formData.description}
              onChange={handleChange}
            />

            <select
              name="citizenId"
              value={formData.citizenId}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  citizenId: e.target.value,
                }))
              }
            >
              <option value="">{t.selectCitizen}</option>
              {citizens.map((citizen) => (
                <option key={citizen.id} value={citizen.id}>
                  {citizen.prenom} {citizen.nom}
                </option>
              ))}
            </select>
            <select
              name="statusId"
              value={formData.statusId}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  statusId: e.target.value,
                }))
              }
            >
              <option value="">{t.selectStatus}</option>
              {statuses.map((status) => (
                <option key={status.id} value={status.id}>
                  {status.name}
                </option>
              ))}
            </select>

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
