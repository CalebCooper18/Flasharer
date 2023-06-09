import { v4 as uuid } from 'uuid';

import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { CreateCard, Card } from '../../types';

interface InitialState {
  cards: (CreateCard | Card)[];
}

const initialState: InitialState = {
  cards: [],
};

const cardsReducer = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    initializeCards(state, action: PayloadAction<CreateCard[]>) {
      action.payload.forEach((card) => {
        card.tempId = uuid();
      });
      return {
        ...state,
        cards: action.payload,
      };
    },
    addCard(state, action: PayloadAction<CreateCard>) {
      state.cards.push(action.payload);
    },
    deleteCard(state, action: PayloadAction<string>) {
      return {
        ...state,
        cards: state.cards.filter((card) => card.tempId !== action.payload),
      };
    },
    updateCard(state, action: PayloadAction<CreateCard>) {
      return {
        ...state,
        cards: state.cards.map((card) =>
          card.tempId !== action.payload.tempId ? card : action.payload
        ),
      };
    },
    clearCards(state) {
      state.cards = [];
    },
  },
});

export const { initializeCards, addCard, deleteCard, updateCard, clearCards } =
  cardsReducer.actions;

export default cardsReducer.reducer;
