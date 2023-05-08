export interface UserLogin {
    username: string;
    password: string;
}

export interface userCreate {
    name: string
    username: string,
    password: string,
}

export interface User {
    id: string;
    name: string;
    username: string;
    token: string;
}