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
  tempId?: string;
  id?: string;
  subject: string;
  answer: string;
}

export interface Card extends CreateCard {
  id: string;
}

export interface CreateDeck {
  topic: string;
  cards: CreateCard[];
  tags: string[];
  shared: boolean;
}

export interface Deck extends CreateDeck {
  id: string;
  likedBy: string[];
  likes: number;
  cards: Card[];
  createdBy: string[];
}
