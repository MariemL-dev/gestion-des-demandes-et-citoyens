// src/components/CitizenForm.jsx
// ─── Formulaire Citoyen ─────────────────────────────────────────────────────
import { useState } from "react";
import "./CitizenForm.css";

const DEMANDE_TYPES = [
  { id: "cin", label: "Carte Nationale", sub: "1ère demande / renouvellement" },
  { id: "passport", label: "Passeport", sub: "Biométrique 10 ans" },
  { id: "permis", label: "Permis de Conduire", sub: "Catégories A / B / C" },
  { id: "extrait", label: "Extrait de naissance", sub: "Copie intégrale" },
];

const CITIES = [
  "Casablanca",
  "Rabat",
  "Marrakech",
  "Fès",
  "Tanger",
  "Agadir",
  "Meknès",
];

const EMPTY = {
  prenom: "",
  nom: "",
  cin: "",
  dob: "",
  sexe: "",
  situation: "",
  nationalite: "Marocaine",
  email: "",
  tel: "",
  ville: "",
  adresse: "",
  typedemande: "cin",
  notes: "",
  acceptTerms: false,
  certifie: false,
};

export default function CitizenForm() {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  // ── field change ──
  const set = (k, v) => {
    setForm((f) => ({ ...f, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: "" }));
  };

  // ── progress ──
  const required = [
    "prenom",
    "nom",
    "cin",
    "dob",
    "sexe",
    "email",
    "tel",
    "ville",
    "acceptTerms",
  ];
  const filled = required.filter((k) => form[k] && form[k] !== "").length;
  const progress = Math.round((filled / required.length) * 100);

  // ── validate CIN ──
  const cinOk = /^[A-Z]{2}\d{6}$/.test(form.cin.toUpperCase());

  // ── submit ──
  const handleSubmit = () => {
    const e = {};
    if (!form.prenom) e.prenom = "Ce champ est requis";
    if (!form.nom) e.nom = "Ce champ est requis";
    if (!form.cin || !cinOk) e.cin = "Format invalide (ex: BE123456)";
    if (!form.dob) e.dob = "Ce champ est requis";
    if (!form.sexe) e.sexe = "Choisir un sexe";
    if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Email invalide";
    if (!form.tel) e.tel = "Ce champ est requis";
    if (!form.ville) e.ville = "Sélectionner une ville";
    if (!form.acceptTerms) e.acceptTerms = "Veuillez accepter les conditions";
    if (Object.keys(e).length > 0) {
      setErrors(e);
      return;
    }
    setSuccess(true);
    setTimeout(() => setSuccess(false), 4000);
  };

  const handleReset = () => {
    setForm(EMPTY);
    setErrors({});
    setSuccess(false);
  };

  const inputClass = (k) =>
    `fi ${errors[k] ? "error" : form[k] ? "success" : ""}`;

  return (
    <div className="cf-wrap">
      {/* Toast */}
      {success && (
        <div className="cf-toast">
          <div className="toast-ico">✓</div>
          <div>
            <strong>Demande soumise avec succès !</strong>
            <span>Vous recevrez une confirmation sous 24h.</span>
          </div>
        </div>
      )}

      <div className="cf-card">
        {/* Hero header */}
        <div className="cf-hero">
          <div className="hero-badge">
            <span className="hero-dot" />
            Nouveau dossier
          </div>
          <h1>Enregistrement citoyen</h1>
          <p>Remplissez le formulaire pour soumettre votre demande.</p>
          <div className="hero-steps">
            {[
              ["Identité", "done"],
              ["Demande", "active"],
              ["Confirmation", "todo"],
            ].map(([lbl, state], i) => (
              <>
                {i > 0 && <div className="step-line" key={`l${i}`} />}
                <div className={`step ${state}`} key={lbl}>
                  <div className="step-num">
                    {state === "done" ? "✓" : i + 1}
                  </div>
                  <span className="step-lbl">{lbl}</span>
                </div>
              </>
            ))}
          </div>
        </div>

        <div className="cf-body">
          {/* Progress */}
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <p className="progress-label" style={{ marginBottom: 20 }}>
            Complété à {progress}%
          </p>

          {/* Section 1 */}
          <div className="section-title">Informations personnelles</div>

          <div className="row">
            <Field label="Prénom" required error={errors.prenom}>
              <input
                className={inputClass("prenom")}
                placeholder="Mohamed"
                value={form.prenom}
                onChange={(e) => set("prenom", e.target.value)}
              />
            </Field>
            <Field label="Nom" required error={errors.nom}>
              <input
                className={inputClass("nom")}
                placeholder="El Amrani"
                value={form.nom}
                onChange={(e) => set("nom", e.target.value)}
              />
            </Field>
          </div>

          <div className="row">
            <Field
              label="CIN"
              required
              error={errors.cin}
              hint={!form.cin ? "Format : 2 lettres + 6 chiffres" : ""}
            >
              <div className="input-wrap">
                <span className="input-icon">⊞</span>
                <input
                  className={`fi has-icon ${errors.cin ? "error" : cinOk && form.cin ? "success" : ""}`}
                  placeholder="BE123456"
                  maxLength={8}
                  value={form.cin}
                  onChange={(e) => set("cin", e.target.value.toUpperCase())}
                />
              </div>
            </Field>
            <Field label="Date de naissance" required error={errors.dob}>
              <input
                className={inputClass("dob")}
                type="date"
                value={form.dob}
                onChange={(e) => set("dob", e.target.value)}
              />
            </Field>
          </div>

          <div className="row three">
            <Field label="Sexe" required error={errors.sexe}>
              <select
                className="fsel"
                value={form.sexe}
                onChange={(e) => set("sexe", e.target.value)}
              >
                <option value="">Choisir</option>
                <option>Masculin</option>
                <option>Féminin</option>
              </select>
            </Field>
            <Field label="Situation">
              <select
                className="fsel"
                value={form.situation}
                onChange={(e) => set("situation", e.target.value)}
              >
                <option value="">Choisir</option>
                {["Célibataire", "Marié(e)", "Divorcé(e)", "Veuf/Veuve"].map(
                  (s) => (
                    <option key={s}>{s}</option>
                  ),
                )}
              </select>
            </Field>
            <Field label="Nationalité">
              <select
                className="fsel"
                value={form.nationalite}
                onChange={(e) => set("nationalite", e.target.value)}
              >
                <option>Marocaine</option>
                <option>Autre</option>
              </select>
            </Field>
          </div>

          <hr className="divider" />
          <div className="section-title">Coordonnées</div>

          <Field label="Email" required error={errors.email}>
            <div className="input-wrap">
              <span className="input-icon">✉</span>
              <input
                className={`fi has-icon ${errors.email ? "error" : form.email ? "success" : ""}`}
                type="email"
                placeholder="mohamed@email.com"
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
              />
            </div>
          </Field>

          <div className="row">
            <Field label="Téléphone" required error={errors.tel}>
              <div className="input-wrap">
                <span className="input-icon">☎</span>
                <span className="input-suffix">+212</span>
                <input
                  className={`fi has-icon has-suffix ${errors.tel ? "error" : form.tel ? "success" : ""}`}
                  type="tel"
                  placeholder="0612 345 678"
                  value={form.tel}
                  onChange={(e) => set("tel", e.target.value)}
                />
              </div>
            </Field>
            <Field label="Ville" required error={errors.ville}>
              <select
                className="fsel"
                value={form.ville}
                onChange={(e) => set("ville", e.target.value)}
              >
                <option value="">Sélectionner</option>
                {CITIES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </Field>
          </div>

          <Field label="Adresse complète">
            <input
              className="fi"
              placeholder="N° rue, quartier, code postal…"
              value={form.adresse}
              onChange={(e) => set("adresse", e.target.value)}
            />
          </Field>

          <hr className="divider" />
          <div className="section-title">Type de demande</div>

          <div className="radio-cards">
            {DEMANDE_TYPES.map((t) => (
              <div
                key={t.id}
                className={`rcard ${form.typedemande === t.id ? "selected" : ""}`}
                onClick={() => set("typedemande", t.id)}
              >
                <div className="rcard-dot" />
                <div className="rcard-text">
                  <div className="rt">{t.label}</div>
                  <div className="rs">{t.sub}</div>
                </div>
              </div>
            ))}
          </div>

          <Field label="Motif / Notes" style={{ marginTop: 16 }}>
            <textarea
              className="ftxt"
              placeholder="Décrivez votre demande…"
              maxLength={300}
              value={form.notes}
              onChange={(e) => set("notes", e.target.value)}
            />
            <div className="char-count">{form.notes.length} / 300</div>
          </Field>

          <div className="check-group" style={{ marginTop: 16 }}>
            <label className="check-item">
              <input
                type="checkbox"
                checked={form.acceptTerms}
                onChange={(e) => set("acceptTerms", e.target.checked)}
              />
              <span className="check-label">
                J'accepte les <a href="#">conditions d'utilisation</a> et la
                politique de confidentialité.
              </span>
            </label>
            {errors.acceptTerms && (
              <span className="field-err">{errors.acceptTerms}</span>
            )}
            <label className="check-item">
              <input
                type="checkbox"
                checked={form.certifie}
                onChange={(e) => set("certifie", e.target.checked)}
              />
              <span className="check-label">
                Je certifie que les informations fournies sont exactes et
                sincères.
              </span>
            </label>
          </div>
        </div>

        <div className="cf-footer">
          <button className="btn-reset" onClick={handleReset}>
            Réinitialiser
          </button>
          <button className="btn-submit" onClick={handleSubmit}>
            Soumettre la demande →
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Helper component ──
function Field({ label, required, error, hint, children, style }) {
  return (
    <div className="fg" style={style}>
      <label className="fl">
        {label} {required && <span className="req">*</span>}
      </label>
      {children}
      {hint && !error && <span className="field-hint">{hint}</span>}
      {error && <span className="field-err">⚠ {error}</span>}
    </div>
  );
}
