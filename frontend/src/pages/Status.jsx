import React, { useState } from "react";
import {
  useGetStatusesQuery,
  useAddStatusMutation,
  useUpdateStatusMutation,
  useDeleteStatusMutation,
} from "../redux/apiSlice";
import "./Status.css";

export default function Status({ language = "EN" }) {
  const {
    data: statuses = [],
    isLoading,
    error,
    refetch,
  } = useGetStatusesQuery();

  const [addStatus] = useAddStatusMutation();
  const [updateStatus] = useUpdateStatusMutation();
  const [deleteStatus] = useDeleteStatusMutation();

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const statusesPerPage = 5;

  const [formData, setFormData] = useState({
    name: "",
  });

  const text = {
    EN: {
      title: "Status",
      search: "Search...",
      add: "+ Add Status",
      name: "Name",
      demandes: "Demandes Count",
      actions: "Actions",
      edit: "Edit",
      delete: "Delete",
      noData: "No status found",
      prev: "Prev",
      next: "Next",
      page: "Page",
      addTitle: "Add Status",
      editTitle: "Edit Status",
      placeholder: "Status name",
      save: "Save",
      cancel: "Cancel",
      required: "Name is required",
      failed: "Operation failed",
      confirm: "Delete this status?",
      deleteFailed: "Delete failed",
      loading: "Loading...",
      error: "Error loading status",
    },

    FR: {
      title: "Statut",
      search: "Rechercher...",
      add: "+ Ajouter statut",
      name: "Nom",
      demandes: "Nombre demandes",
      actions: "Actions",
      edit: "Modifier",
      delete: "Supprimer",
      noData: "Aucun statut",
      prev: "Précédent",
      next: "Suivant",
      page: "Page",
      addTitle: "Ajouter statut",
      editTitle: "Modifier statut",
      placeholder: "Nom du statut",
      save: "Enregistrer",
      cancel: "Annuler",
      required: "Nom obligatoire",
      failed: "Échec de l'opération",
      confirm: "Supprimer ce statut ?",
      deleteFailed: "Échec suppression",
      loading: "Chargement...",
      error: "Erreur chargement statut",
    },

    AR: {
      title: "الحالات",
      search: "بحث...",
      add: "+ إضافة حالة",
      name: "الاسم",
      demandes: "عدد الطلبات",
      actions: "الإجراءات",
      edit: "تعديل",
      delete: "حذف",
      noData: "لا توجد حالات",
      prev: "السابق",
      next: "التالي",
      page: "الصفحة",
      addTitle: "إضافة حالة",
      editTitle: "تعديل حالة",
      placeholder: "اسم الحالة",
      save: "حفظ",
      cancel: "إلغاء",
      required: "الاسم مطلوب",
      failed: "فشلت العملية",
      confirm: "حذف هذه الحالة؟",
      deleteFailed: "فشل الحذف",
      loading: "جاري التحميل...",
      error: "خطأ في تحميل الحالات",
    },
  };

  const t = text[language];

  const openAddModal = () => {
    setEditingId(null);
    setFormData({ name: "" });
    setShowModal(true);
  };

  const openEditModal = (status) => {
    setEditingId(status.id);
    setFormData({ name: status.name || "" });
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
      if (!formData.name) {
        alert(t.required);
        return;
      }

      if (editingId) {
        await updateStatus({
          id: editingId,
          data: formData,
        }).unwrap();
      } else {
        await addStatus(formData).unwrap();
      }

      setShowModal(false);
      setEditingId(null);
      setFormData({ name: "" });
      refetch();
    } catch {
      alert(t.failed);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm(t.confirm)) return;

    try {
      await deleteStatus(id).unwrap();
      refetch();
    } catch {
      alert(t.deleteFailed);
    }
  };

  const filteredStatuses = statuses.filter((item) =>
    `${item.name}`.toLowerCase().includes(search.toLowerCase()),
  );

  const totalPages = Math.ceil(filteredStatuses.length / statusesPerPage) || 1;
  const startIndex = (currentPage - 1) * statusesPerPage;

  const currentStatuses = filteredStatuses.slice(
    startIndex,
    startIndex + statusesPerPage,
  );

  if (isLoading) return <div className="status-page">{t.loading}</div>;
  if (error) return <div className="status-page">{t.error}</div>;

  return (
    <div className="status-page">
      <div className="status-header">
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

          <button className="primary-btn" onClick={openAddModal}>
            {t.add}
          </button>
        </div>
      </div>

      <div className="table-card">
        <table className="status-table">
          <thead>
            <tr>
              <th>{t.name}</th>
              <th>{t.demandes}</th>
              <th>{t.actions}</th>
            </tr>
          </thead>

          <tbody>
            {currentStatuses.length > 0 ? (
              currentStatuses.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div className="status-name-cell">
                      <div className="status-icon">🏷️</div>
                      <span>{item.name}</span>
                    </div>
                  </td>

                  <td>{item.demandes?.length || 0}</td>

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
                <td colSpan="3" className="empty-row">
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
              name="name"
              placeholder={t.placeholder}
              value={formData.name}
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
