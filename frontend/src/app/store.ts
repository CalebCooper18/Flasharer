import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";
import notificationReducer from "./reducers/notificationReducer";
import deckReducer from "./reducers/deckReducer";
import cardsReducer from "./reducers/cardsReducer";

const store = configureStore({
    reducer: {
       users: userReducer, 
       notification: notificationReducer,
       deck: deckReducer,
       cards: cardsReducer
    }
})

export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch