
export interface Users {
    id?: string;
    username: string;
    password: string;
    gender: 'male' | 'female';
    email: string;
    passwordDetails: string[];
}