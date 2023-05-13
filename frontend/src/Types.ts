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

export interface CreateCard {
    id?: string;
    subject: string;
    answer: string;
}

export interface Card extends CreateCard {
    id: string;
}

export interface Deck
{
     id: string
     topic: string;
     likedBy: string[]
     likes: number;
     cards: Card[];
     tags: string[];
     createdBy: string[];
     shared: boolean;
}


