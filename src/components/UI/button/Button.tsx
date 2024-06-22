import { ButtonProps } from '../../models/ButtonProps';
import './Button.css';

const Button: React.FC<ButtonProps> = ({
  type = 'button',
  onClick,
  disabled = false,
  className = '',
  children,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`button ${className}`}
    >
      {children}
    </button>
  )
}

export default Button
