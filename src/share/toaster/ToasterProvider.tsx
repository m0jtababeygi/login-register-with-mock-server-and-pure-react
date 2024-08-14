// shared/Toaster/ToasterProvider.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';
import Notification from './Notification'; 
import ReactDOM from 'react-dom';
import './Toaster.css';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  dismissible?: boolean;
}

interface ToasterContextProps {
  addToast: (message: string, type: Toast['type'], duration?: number, dismissible?: boolean) => void;
}

const ToasterContext = createContext<ToasterContextProps | undefined>(undefined);

export const ToasterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (message: string, type: Toast['type'], duration = 3000, dismissible = false) => {
    const id = new Date().getTime().toString();
    setToasts((prevToasts) => [...prevToasts, { id, message, type, duration, dismissible }]);

    setTimeout(() => {
      removeToast(id);
    }, duration);
  };

  const removeToast = (id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  return (
    <ToasterContext.Provider value={{ addToast }}>
      {children}
      {ReactDOM.createPortal(
        <div className="toast-container">
          {toasts.map((toast) => (
            <Notification 
              key={toast.id}
              message={toast.message}
              type={toast.type}
              duration={toast.duration}
              dismissible={toast.dismissible}
              onClose={() => removeToast(toast.id)}
            />
          ))}
        </div>,
        document.getElementById('notification-root') as HTMLElement
      )}
    </ToasterContext.Provider>
  );
};

export const useToaster = () => {
  const context = useContext(ToasterContext);
  if (!context) {
    throw new Error('useToaster must be used within a ToasterProvider');
  }
  return context;
};
