import { createSlice } from '@reduxjs/toolkit';

export interface NavBarSchema {
    isFixed: boolean;
    isCollapsed: boolean;
}

interface NavbarState {
    navbar: NavBarSchema;
}

const initialState: NavBarSchema = {
    isFixed: false,
    isCollapsed: false,
};

const navbarSlice = createSlice({
    name: 'navbar',
    initialState,
    reducers: {
        toggleFixed(state) {
            state.isFixed = !state.isFixed;
        },
        toggleCollapsed(state) {
            state.isCollapsed = !state.isCollapsed;
        },
    },
});

export const selectIsFixed = (state: NavbarState) => state.navbar.isFixed;

export const selectIsCollapsed = (state: NavbarState) => state.navbar.isCollapsed;

export const { actions: navBarActions } = navbarSlice;
export const { reducer: navBarReducer } = navbarSlice;
