import React from "react";
import { createPortal } from "react-dom";
import styles from "./ConfirmDialog.module.scss";

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  description: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  title,
  description,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return createPortal(
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
        <div className={styles.actions}>
          <button
            className={`${styles.btn} ${styles.btnCancel}`}
            onClick={onCancel}
          >
            Отмена
          </button>
          <button
            className={`${styles.btn} ${styles.btnConfirm}`}
            onClick={onConfirm}
          >
            Подтвердить
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
};
