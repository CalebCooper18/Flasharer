import { AnyAction, createSlice, PayloadAction, ThunkDispatch } from "@reduxjs/toolkit";
import { User, UserLogin } from "../../types.ts"
import loginService from "../../services/login.service.ts";
import userService from "../../services/user.service.ts";
import { Dispatch } from "react";
import { createNotification } from "./notificationReducer.ts";

type InitialState = {
    user: null | User;
};


const initialState: InitialState = {
    user: null
};


const loginSlice = createSlice({
    name: 'login',
    initialState: initialState,
    reducers:
    {
        login(state, action: PayloadAction<User>)
        {
            state.user = action.payload;
        },
        logout(state, action: PayloadAction<null>)
        {
            state.user = action.payload;
        }
    }
})


export const {login, logout} = loginSlice.actions;

export const loginUser = (creds: UserLogin) => {
    
    return async (dispatch: ThunkDispatch<unknown, unknown, AnyAction>) => {
        const user = await loginService.login(creds);
        userService.setUser(user);
        dispatch(login(user));
        dispatch(createNotification({type: 'success', message: 'Successfully logged in!'}))
    }
}

export const logoutUser = () => {
    return (dispatch: Dispatch<AnyAction>) => {
        userService.clearUser();
        dispatch(logout(null));
    }
    
}


export default loginSlice.reducer;