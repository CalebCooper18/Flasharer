import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface INotification
{
    type: string;
    message: string;
};

type Notification = INotification | null 

const initialState = null as Notification;

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        createNotification(_state, action: PayloadAction<Notification>)
        {
            return action.payload
        },
        deleteNotification(_state, _action)
        {
            return null;
        }
    }

})

export const {createNotification, deleteNotification} = notificationSlice.actions;

export default notificationSlice.reducer;