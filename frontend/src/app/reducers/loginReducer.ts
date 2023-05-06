import { AnyAction, createSlice, PayloadAction, ThunkDispatch } from "@reduxjs/toolkit";
import { UserLogin } from "../../types.ts"
import loginService from "../../services/loginService";
import { Dispatch } from "react";

type InitialState = {
    user: null | string
}


const initialState: InitialState = {
    user: null
}


const loginSlice = createSlice({
    name: 'login',
    initialState: initialState,
    reducers:
    {
        login(state, action: PayloadAction<string>)
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
        // userService.setUser(user);
        dispatch(login(user));
    }
}

export const logoutUser = () => {
    return (dispatch: Dispatch<AnyAction>) => {
        //userService.clearUser()
        dispatch(logout(null))
    }
    
}


export default loginSlice.reducer;