import React, {
  useEffect,
  useState,
} from "react";
import styles from "./Notification.module.css";

interface NotificationProps {
  message: string;
  onClose: () => void;
}

const Notification: React.FC<
  NotificationProps
> = ({ message, onClose }) => {
  const [isVisible, setIsVisible] =
    useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, 6000);

    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);

  const handleClose = () => {
    setIsVisible(false);
    onClose();
  };

  return (
    <div
      className={`${styles.notification} ${isVisible ? styles.visible : ""}`}
    >
      <div className={styles.message}>
        {message}
      </div>
      <button
        className={styles.closeButton}
        onClick={handleClose}
      >
        &times;
      </button>
    </div>
  );
};

export default Notification;
