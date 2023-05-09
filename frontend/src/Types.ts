export interface UserLogin {
    username: string;
    password: string;
}

export interface UserCreate {
    name: string;
    username: string;
    password: string;
}

export interface User {
    id: string;
    name: string;
    username: string;
    token: string;
}