import { AnyAction, createSlice, PayloadAction, ThunkDispatch } from "@reduxjs/toolkit";
import { UserLogin } from "../Types";

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
        logout(state, action: PayloadAction<string>)
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
    }
}


export default loginSlice.reducer;