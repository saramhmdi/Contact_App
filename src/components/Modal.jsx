import React from "react";
import styles from "../styles/Modal.module.css";
function DeletionModal({ message, onConfirm, onCancel }) {
  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <p>{message}</p>
        <div className={styles.modalButtons}>
          <button className={styles.confirmButton} onClick={onConfirm}>
            Yes
          </button>
          <button className={styles.cancelButton} onClick={onCancel}>
            No
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeletionModal;
