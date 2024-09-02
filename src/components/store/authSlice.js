import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: null,
    isLoggedIn: false,

};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.token = action.payload;
            localStorage.setItem('token', state.token);
            state.isLoggedIn = true;
        },
        logout: (state) => {
            state.token = null;
            localStorage.removeItem('token')
            state.isLoggedIn = false;
        },
        getAuthStatus : (state) => {
            const token = localStorage.getItem('token');
            state.token = token;
            state.isLoggedIn = !!token;
        }
    },
    
})

export const {login, logout, getAuthStatus} = authSlice.actions;

export const getAuthToken = (state) => state.auth.token;
export const getLogInStatus = (state) => state.auth.isLoggedIn;

export default authSlice.reducer