import React, { useEffect, useState } from "react";
import {
  useGetAdminProfileQuery,
  useUpdateAdminProfileMutation,
} from "../redux/apiSlice";
import "./Settings.css";

export default function Settings({ language = "EN" }) {
  const { data: profile, isLoading, error } = useGetAdminProfileQuery();
  const [updateAdminProfile] = useUpdateAdminProfileMutation();

  const text = {
    EN: {
      title: "Settings",
      subtitle: "Manage your profile and platform preferences.",
      profile: "Profile Information",
      fullName: "Full Name",
      email: "Email Address",
      role: "Role",
      preferences: "Preferences",
      theme: "Theme",
      light: "Light",
      dark: "Dark",
      system: "System",
      notifications: "Notifications",
      notifDesc: "Receive updates and system alerts",
      summary: "Account Summary",
      admin: "Administrator",
      enabled: "Enabled",
      disabled: "Disabled",
      save: "Save Settings",
      saved: "Settings saved successfully",
      saveError: "Error saving settings",
      loading: "Loading settings...",
      error: "Error loading settings",
    },
    FR: {
      title: "Paramètres",
      subtitle: "Gérez votre profil et les préférences de la plateforme.",
      profile: "Informations du profil",
      fullName: "Nom complet",
      email: "Adresse email",
      role: "Rôle",
      preferences: "Préférences",
      theme: "Thème",
      light: "Clair",
      dark: "Sombre",
      system: "Système",
      notifications: "Notifications",
      notifDesc: "Recevoir les mises à jour et alertes système",
      summary: "Résumé du compte",
      admin: "Administrateur",
      enabled: "Activées",
      disabled: "Désactivées",
      save: "Enregistrer",
      saved: "Paramètres enregistrés",
      saveError: "Erreur lors de l'enregistrement",
      loading: "Chargement...",
      error: "Erreur de chargement",
    },
    AR: {
      title: "الإعدادات",
      subtitle: "إدارة الملف الشخصي وتفضيلات المنصة.",
      profile: "معلومات الملف",
      fullName: "الاسم الكامل",
      email: "البريد الإلكتروني",
      role: "الدور",
      preferences: "التفضيلات",
      theme: "المظهر",
      light: "فاتح",
      dark: "داكن",
      system: "النظام",
      notifications: "الإشعارات",
      notifDesc: "استقبال التحديثات والتنبيهات",
      summary: "ملخص الحساب",
      admin: "المسؤول",
      enabled: "مفعلة",
      disabled: "معطلة",
      save: "حفظ الإعدادات",
      saved: "تم حفظ الإعدادات",
      saveError: "خطأ أثناء الحفظ",
      loading: "جاري التحميل...",
      error: "خطأ في تحميل الإعدادات",
    },
  };

  const t = text[language];

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    role: "",
    theme: "Light",
    notifications: true,
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        fullName: profile.fullName || "",
        email: profile.email || "",
        role: profile.role || "",
        theme: profile.theme || "Light",
        notifications:
          profile.notifications !== undefined ? profile.notifications : true,
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = async () => {
    try {
      await updateAdminProfile(formData).unwrap();
      alert(t.saved);
    } catch {
      alert(t.saveError);
    }
  };

  if (isLoading) return <div className="settings-page">{t.loading}</div>;
  if (error) return <div className="settings-page">{t.error}</div>;

  return (
    <div className="settings-page">
      <div className="settings-header">
        <h1>{t.title}</h1>
        <p>{t.subtitle}</p>
      </div>

      <div className="settings-grid">
        <div className="settings-card">
          <h3>{t.profile}</h3>

          <div className="settings-form">
            <label>{t.fullName}</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
            />

            <label>{t.email}</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />

            <label>{t.role}</label>
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="settings-card">
          <h3>{t.preferences}</h3>

          <div className="settings-form">
            <label>{t.theme}</label>
            <select name="theme" value={formData.theme} onChange={handleChange}>
              <option value="Light">{t.light}</option>
              <option value="Dark">{t.dark}</option>
              <option value="System">{t.system}</option>
            </select>

            <div className="toggle-row">
              <div>
                <strong>{t.notifications}</strong>
                <p>{t.notifDesc}</p>
              </div>

              <label className="switch">
                <input
                  type="checkbox"
                  name="notifications"
                  checked={formData.notifications}
                  onChange={handleChange}
                />
                <span className="slider"></span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="settings-card settings-summary">
        <h3>{t.summary}</h3>

        <div className="summary-list">
          <div className="summary-item">
            <span>{t.admin}</span>
            <strong>{formData.fullName}</strong>
          </div>

          <div className="summary-item">
            <span>{t.email}</span>
            <strong>{formData.email}</strong>
          </div>

          <div className="summary-item">
            <span>{t.theme}</span>
            <strong>{formData.theme}</strong>
          </div>

          <div className="summary-item">
            <span>{t.notifications}</span>
            <strong>{formData.notifications ? t.enabled : t.disabled}</strong>
          </div>
        </div>

        <button className="save-btn" onClick={handleSave}>
          {t.save}
        </button>
      </div>
    </div>
  );
}
