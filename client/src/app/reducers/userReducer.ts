import { AnyAction, createSlice, PayloadAction, ThunkDispatch } from "@reduxjs/toolkit";
import { createAndDeleteNotification } from "./notificationReducer.ts";

import loginService from "../../services/login.service.ts";
import userService from "../../services/user.service.ts";
import createAccountService from "../../services/createAccount.service.ts";

import { User, UserCreate, UserLogin } from "../../types.ts"
interface InitialState {
    user: null | User;
};

const initialState: InitialState = {
    user: userService.checkIfUserLoggedIn()
};


const userSlice = createSlice({
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


export const {login, logout} = userSlice.actions;


export function createUser(creds: UserCreate)
{
    
    return async (dispatch: ThunkDispatch<unknown, unknown, AnyAction>) => {
       try 
       {
        const user = await createAccountService.createAccount(creds);
        userService.setUser(user);
        dispatch(login(user));
        dispatch(createAndDeleteNotification({type: 'success', message: 'Successfully Created Account'}));
       } catch (error) {
            if(error instanceof Error)
            {
               dispatch(createAndDeleteNotification({type: 'error', message: error.message}));
               return 
            }

            console.error('Something went really wrong');
       }
    }
}

export function loginUser(creds: UserLogin){
    
    return async function (dispatch: ThunkDispatch<unknown, unknown, AnyAction>) {
       try 
       {
        const user = await loginService.login(creds);
        userService.setUser(user);
        dispatch(login(user));
        dispatch(createAndDeleteNotification({type: 'success', message: 'Successfully logged in!'}));
       } catch (error) {
            if(error instanceof Error)
            {
               dispatch(createAndDeleteNotification({type: 'error', message: error.message}));
               return 
            }

            console.error('Something went really wrong');
       }
    }
}


export function logoutUser() {
    return function (dispatch: ThunkDispatch<unknown, unknown, AnyAction>) {
        userService.clearUser();
        dispatch(logout(null));
        dispatch(createAndDeleteNotification({type: 'success', message: 'Successfully logged out'}));
    }
    
}


export default userSlice.reducer;