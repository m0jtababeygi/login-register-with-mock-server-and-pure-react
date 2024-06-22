
export interface InputProps {
    id: string;
    label: string;
    type?: string;
    value?: string;
    onChange?: (value: string) => void;
    error?: string;
    passwordDetails?: string[] 
  }