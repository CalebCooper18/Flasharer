import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./reducers/loginReducer";
import notificationReducer from "./reducers/notificationReducer";

const store = configureStore({
    reducer: {
       login: loginReducer, 
       notification: notificationReducer
    }
})

export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch