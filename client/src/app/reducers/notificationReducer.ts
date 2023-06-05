import { AnyAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Dispatch } from 'react';

export interface INotification {
  type: string;
  message: string;
}

type Notification = INotification | null;

const initialState = null as Notification;

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    createNotification(_state, action: PayloadAction<Notification>) {
      return action.payload;
    },
    deleteNotification(_state) {
      return null;
    },
  },
});

export const { createNotification, deleteNotification } =
  notificationSlice.actions;

let timer: ReturnType<typeof setTimeout>;

export function createAndDeleteNotification(notification: INotification) {
  return (dispatch: Dispatch<AnyAction>) => {
    dispatch(createNotification(notification));
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      dispatch(deleteNotification());
    }, 3000);
  };
}

export default notificationSlice.reducer;
