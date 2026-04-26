import React from "react";
import "./Help.css";

export default function Help({ language = "EN" }) {
  const text = {
    EN: {
      title: "Help & Documentation",
      subtitle: "Everything you need to use the platform efficiently.",
      dashboard: "Dashboard",
      dashboardDesc:
        "View platform statistics, totals, recent activity and performance indicators.",
      citizens: "Citizens",
      citizensDesc:
        "Add, update, search and manage registered citizens information.",
      demandes: "Demandes",
      demandesDesc:
        "Manage citizen requests, assign statuses and follow progress.",
      status: "Status",
      statusDesc:
        "Create and manage custom statuses like Approved or Rejected.",
      analytics: "Analytics",
      analyticsDesc:
        "Explore detailed numbers, approvals rate and status distribution.",
      settings: "Settings",
      settingsDesc:
        "Update administrator profile, email, theme and notifications.",
      quickStart: "Quick Start Guide",
      step1: "Create citizens profiles first.",
      step2: "Create demandes linked to citizens.",
      step3: "Track demandes status progression.",
      step4: "Use analytics to monitor activity.",
      faqTitle: "Frequently Asked Questions",
      support: "Support",
      email: "Email",
      phone: "Phone",
      availability: "Availability",
      availabilityValue: "Monday - Friday / 09:00 - 18:00",
      faqs: [
        {
          q: "How do I add a new citizen?",
          a: "Go to Citizens page, click Add Citizen, fill the form and save.",
        },
        {
          q: "How do I create a demande?",
          a: "Open Demandes page, click Add Demande, choose citizen and status.",
        },
        {
          q: "Can I edit saved data?",
          a: "Yes, every module contains Edit and Delete actions.",
        },
        {
          q: "Are settings saved permanently?",
          a: "Yes, admin profile settings are stored in the database.",
        },
      ],
    },

    FR: {
      title: "Aide & Documentation",
      subtitle: "Tout ce qu’il faut pour utiliser la plateforme efficacement.",
      dashboard: "Tableau de bord",
      dashboardDesc:
        "Consulter les statistiques, les totaux, les activités récentes et les indicateurs.",
      citizens: "Citoyens",
      citizensDesc:
        "Ajouter, modifier, rechercher et gérer les informations des citoyens.",
      demandes: "Demandes",
      demandesDesc:
        "Gérer les demandes des citoyens, attribuer des statuts et suivre l’avancement.",
      status: "Statut",
      statusDesc:
        "Créer et gérer des statuts personnalisés comme Approuvée ou Rejetée.",
      analytics: "Analytique",
      analyticsDesc:
        "Consulter les statistiques détaillées, les taux d’approbation et la distribution.",
      settings: "Paramètres",
      settingsDesc:
        "Modifier le profil administrateur, l’email, le thème et les notifications.",
      quickStart: "Guide de démarrage",
      step1: "Créer d’abord les profils des citoyens.",
      step2: "Créer des demandes liées aux citoyens.",
      step3: "Suivre l’évolution des statuts des demandes.",
      step4: "Utiliser Analytics pour surveiller l’activité.",
      faqTitle: "Questions fréquentes",
      support: "Support",
      email: "Email",
      phone: "Téléphone",
      availability: "Disponibilité",
      availabilityValue: "Lundi - Vendredi / 09:00 - 18:00",
      faqs: [
        {
          q: "Comment ajouter un nouveau citoyen ?",
          a: "Allez à la page Citoyens, cliquez sur Ajouter citoyen, remplissez le formulaire puis enregistrez.",
        },
        {
          q: "Comment créer une demande ?",
          a: "Ouvrez la page Demandes, cliquez sur Ajouter demande, choisissez le citoyen et le statut.",
        },
        {
          q: "Puis-je modifier les données enregistrées ?",
          a: "Oui, chaque module contient les actions Modifier et Supprimer.",
        },
        {
          q: "Les paramètres sont-ils enregistrés définitivement ?",
          a: "Oui, les paramètres du profil administrateur sont stockés dans la base de données.",
        },
      ],
    },

    AR: {
      title: "المساعدة والتوثيق",
      subtitle: "كل ما تحتاجه لاستعمال المنصة بكفاءة.",
      dashboard: "لوحة التحكم",
      dashboardDesc: "عرض الإحصائيات والمجاميع وآخر الأنشطة ومؤشرات الأداء.",
      citizens: "المواطنون",
      citizensDesc: "إضافة وتعديل والبحث وإدارة معلومات المواطنين المسجلين.",
      demandes: "الطلبات",
      demandesDesc: "إدارة طلبات المواطنين وتحديد الحالات وتتبع التقدم.",
      status: "الحالات",
      statusDesc: "إنشاء وإدارة حالات مخصصة مثل مقبولة أو مرفوضة.",
      analytics: "التحليلات",
      analyticsDesc: "عرض الأرقام التفصيلية ونسبة القبول وتوزيع الحالات.",
      settings: "الإعدادات",
      settingsDesc: "تعديل ملف المسؤول والبريد والمظهر والإشعارات.",
      quickStart: "دليل البدء السريع",
      step1: "أنشئ ملفات المواطنين أولاً.",
      step2: "أنشئ طلبات مرتبطة بالمواطنين.",
      step3: "تتبع تطور حالات الطلبات.",
      step4: "استعمل التحليلات لمراقبة النشاط.",
      faqTitle: "الأسئلة الشائعة",
      support: "الدعم",
      email: "البريد",
      phone: "الهاتف",
      availability: "التوفر",
      availabilityValue: "الإثنين - الجمعة / 09:00 - 18:00",
      faqs: [
        {
          q: "كيف أضيف مواطناً جديداً؟",
          a: "اذهب إلى صفحة المواطنين، اضغط إضافة مواطن، املأ النموذج ثم احفظ.",
        },
        {
          q: "كيف أنشئ طلباً؟",
          a: "افتح صفحة الطلبات، اضغط إضافة طلب، اختر المواطن والحالة.",
        },
        {
          q: "هل يمكنني تعديل البيانات المحفوظة؟",
          a: "نعم، كل وحدة تحتوي على أزرار التعديل والحذف.",
        },
        {
          q: "هل يتم حفظ الإعدادات بشكل دائم؟",
          a: "نعم، إعدادات ملف المسؤول محفوظة في قاعدة البيانات.",
        },
      ],
    },
  };

  const t = text[language];

  return (
    <div className="help-page">
      <div className="help-header">
        <h1>{t.title}</h1>
        <p>{t.subtitle}</p>
      </div>

      <div className="help-grid">
        <div className="help-card">
          <h3>{t.dashboard}</h3>
          <p>{t.dashboardDesc}</p>
        </div>

        <div className="help-card">
          <h3>{t.citizens}</h3>
          <p>{t.citizensDesc}</p>
        </div>

        <div className="help-card">
          <h3>{t.demandes}</h3>
          <p>{t.demandesDesc}</p>
        </div>

        <div className="help-card">
          <h3>{t.status}</h3>
          <p>{t.statusDesc}</p>
        </div>

        <div className="help-card">
          <h3>{t.analytics}</h3>
          <p>{t.analyticsDesc}</p>
        </div>

        <div className="help-card">
          <h3>{t.settings}</h3>
          <p>{t.settingsDesc}</p>
        </div>
      </div>

      <div className="help-section">
        <h2>{t.quickStart}</h2>

        <div className="steps-list">
          {[t.step1, t.step2, t.step3, t.step4].map((step, index) => (
            <div className="step-item" key={index}>
              <span>{index + 1}</span>
              <p>{step}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="help-section">
        <h2>{t.faqTitle}</h2>

        <div className="faq-list">
          {t.faqs.map((item, index) => (
            <div className="faq-item" key={index}>
              <h4>{item.q}</h4>
              <p>{item.a}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="help-section support-box">
        <h2>{t.support}</h2>
        <p>{t.email}: support@civicadmin.com</p>
        <p>{t.phone}: +212 600 000 000</p>
        <p>
          {t.availability}: {t.availabilityValue}
        </p>
      </div>
    </div>
  );
}
