import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isDark: false,
}
const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        toggle : (state) => {
            state.isDark = !state.isDark
        }
    }
})

export const {toggle} = themeSlice.actions;

export const getThemeStatus = (state) => state.theme.isDark

export default themeSlice.reducer