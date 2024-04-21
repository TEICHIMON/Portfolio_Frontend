import React, {
  useEffect,
  useState,
} from "react";

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
      className={`fixed top-4 left-4 sm:top-8 sm:left-8 bg-red-500 text-white rounded-lg p-4 shadow-lg transition-all duration-300 ease-in-out z-50 ${
        isVisible
          ? "opacity-100 scale-100"
          : "hidden"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="mr-4 text-lg font-bold">
          {message}
        </div>
        <button
          className="bg-transparent border-none cursor-pointer text-2xl text-white transition-colors duration-200 ease-in-out hover:text-red-200 focus:outline-none"
          onClick={handleClose}
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default Notification;
