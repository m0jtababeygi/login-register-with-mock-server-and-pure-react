
export interface ButtonProps {
    type?: 'button' | 'submit' | 'reset';
    onClick?: () => void;
    disabled?: boolean;
    className?: string;
    children: React.ReactNode;
}