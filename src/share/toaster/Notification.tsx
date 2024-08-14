import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheckCircle,
  faExclamationCircle,
  faExclamationTriangle,
  faInfoCircle,
  faRectangleXmark,
} from '@fortawesome/free-solid-svg-icons';
import './Notification.css';

interface NotificationProps {
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  onClose: () => void;
  duration?: number;
  dismissible?: boolean;
}

const iconMap = {
  success: faCheckCircle,
  error: faExclamationCircle,
  warning: faExclamationTriangle,
  info: faInfoCircle,
};

const Notification: React.FC<NotificationProps> = ({
  message,
  type,
  onClose,
  duration = 3000,
  dismissible = false,
}) => {
  useEffect(() => {
    if (!dismissible) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [onClose, duration, dismissible]);

  return (
    <div className={`notification notification--${type}`}>
      <div className="notification__header">
        <div>
          <FontAwesomeIcon
            icon={iconMap[type]}
            style={{ fontSize: '2.5rem' }}
          />
        </div>
        <div className="notification__close">
          <button onClick={onClose}>
            <FontAwesomeIcon
              icon={faRectangleXmark}
              style={{ fontSize: '2.5rem' }}
            />
          </button>
        </div>
      </div>
      <div className="notification__message">{message}</div>
    </div>
  );
};

export default Notification
