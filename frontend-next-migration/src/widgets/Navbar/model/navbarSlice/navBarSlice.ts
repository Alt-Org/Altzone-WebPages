import { createSelector, createSlice } from '@reduxjs/toolkit';
import { LS_KEYS } from '@/shared/const/LS_KEYS';

// Helper function to update localStorage
const updateLocalStorage = (key: string, value: boolean) => {
    if (typeof window !== 'undefined') {
        try {
            localStorage.setItem(key, value.toString());
        } catch (error) {
            console.error(`Failed to update localStorage for key: ${key}`, error);
        }
    }
};

// Retrieve the initial state for "isFixed" from localStorage
const getInitialFixedState = (): boolean => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem(LS_KEYS.IsNavBarFixed) === 'true';
    }
    return false;
};

// Retrieve the initial state for "isCollapsed" from localStorage
const getInitialCollapsedState = (): boolean => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem(LS_KEYS.IsNavBarCollapsed) === 'true';
    }
    return false;
};

// Define the state schema
export interface NavBarSchema {
    isFixed: boolean;
    isCollapsed: boolean;
}

interface NavbarState {
    navbar: NavBarSchema;
}

// Initial state
const initialState: NavBarSchema = {
    isFixed: getInitialFixedState(),
    isCollapsed: getInitialCollapsedState(),
};

// Redux slice for the navigation bar
const navbarSlice = createSlice({
    name: 'navbar',
    initialState,
    reducers: {
        toggleFixed(state) {
            state.isFixed = !state.isFixed;
            updateLocalStorage(LS_KEYS.IsNavBarFixed, state.isFixed);
        },
        toggleCollapsed(state) {
            state.isCollapsed = !state.isCollapsed;
            updateLocalStorage(LS_KEYS.IsNavBarCollapsed, state.isCollapsed);
        },
    },
});

// Selectors to retrieve state
export const selectIsFixed = createSelector(
    (state: NavbarState) => state.navbar.isFixed,
    (isFixed) => isFixed,
);

export const selectIsCollapsed = createSelector(
    (state: NavbarState) => state.navbar.isCollapsed,
    (isCollapsed) => isCollapsed,
);

// Exports
export const { actions: navBarActions } = navbarSlice;
export const { reducer: navBarReducer } = navbarSlice;
