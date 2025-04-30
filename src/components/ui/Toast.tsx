import { useEffect } from "react";

export interface ToastProps {
  message: string;
  type?: "success" | "error" | "info";
  duration?: number;
  onClose: () => void;
}

export const Toast = ({ message, type = "info", duration = 3000, onClose }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const baseStyles = "fixed top-4 right-4 z-50 px-4 py-2 rounded-lg shadow-md border transition-all";
  const typeStyles = {
    success: "bg-green-100 text-green-800 border-green-400",
    error: "bg-red-100 text-red-800 border-red-400",
    info: "bg-blue-100 text-blue-800 border-blue-400",
  };

  return (
    <div className={`${baseStyles} ${typeStyles[type]}`}>
      {message}
    </div>
  );
};
