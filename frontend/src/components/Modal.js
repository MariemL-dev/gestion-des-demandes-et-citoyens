import React, { useEffect } from "react";
import ReactDOM from "react-dom";

export default function Modal({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  footer,
  size = "md",
  danger = false,
}) {
  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const maxWidths = { sm: 420, md: 520, lg: 680, xl: 820 };
  const maxWidth = maxWidths[size] || 520;

  const modalContent = (
    <div
      className="modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="modal" style={{ maxWidth }}>
        {/* Header */}
        <div className="modal-header">
          <div>
            {danger && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 10,
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    background: "var(--red-50)",
                    borderRadius: "var(--radius-md)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--red-600)",
                  }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <triangle points="10.29 3.86 1.82 18 22.18 18 10.29 3.86" />
                    <path d="M12 9v4M12 17h.01" />
                    <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                  </svg>
                </div>
              </div>
            )}
            <h2 className="modal-title" id="modal-title">
              {title}
            </h2>
            {subtitle && <p className="modal-subtitle">{subtitle}</p>}
          </div>

          <button
            className="modal-close"
            onClick={onClose}
            aria-label="Close modal"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="modal-body">{children}</div>

        {/* Footer */}
        {footer && (
          <>
            <div className="modal-divider" />
            <div className="modal-footer">{footer}</div>
          </>
        )}
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
}

/* ── Convenience sub-components ── */

export function ModalFormGroup({ label, required, hint, children }) {
  return (
    <div className="form-group">
      {label && (
        <label className="form-label">
          {label}
          {required && <span>*</span>}
        </label>
      )}
      {children}
      {hint && <p className="form-hint">{hint}</p>}
    </div>
  );
}

export function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = "Confirm",
  danger = false,
}) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      danger={danger}
      size="sm"
      footer={
        <>
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button
            className={`btn ${danger ? "btn-danger" : "btn-primary"}`}
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            {confirmLabel}
          </button>
        </>
      }
    >
      <p style={{ fontSize: 14, color: "var(--gray-600)", lineHeight: 1.6 }}>
        {message}
      </p>
    </Modal>
  );
}
