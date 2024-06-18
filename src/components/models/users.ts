
export interface Users {
    id?: string;
    username: string;
    password: string;
    gender: 'male' | 'female' | string;
    email: string;
    passwordDetails: string[];
}