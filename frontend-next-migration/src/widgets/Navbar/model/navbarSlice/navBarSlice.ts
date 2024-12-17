import { createSelector, createSlice } from '@reduxjs/toolkit';
import { LS_KEYS } from '@/shared/const/LS_KEYS';

const getInitialFixedState = (): boolean => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem(LS_KEYS.IsNavBarFixed) === 'true';
    }
    return false;
};

const getInitialCollapsedState = (): boolean => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem(LS_KEYS.IsNavBarCollapsed) === 'true';
    }
    return false;
};

export interface NavBarSchema {
    isFixed: boolean;
    isCollapsed: boolean;
}

interface NavbarState {
    navbar: NavBarSchema;
}

const initialState: NavBarSchema = {
    isFixed: getInitialFixedState(),
    isCollapsed: getInitialCollapsedState(),
};

const navbarSlice = createSlice({
    name: 'navbar',
    initialState,
    reducers: {
        toggleFixed(state) {
            state.isFixed = !state.isFixed;
            if (typeof window !== 'undefined') {
                localStorage.setItem(LS_KEYS.IsNavBarFixed, state.isFixed.toString());
            }
        },
        toggleCollapsed(state) {
            state.isCollapsed = !state.isCollapsed;
            if (typeof window !== 'undefined') {
                localStorage.setItem(LS_KEYS.IsNavBarCollapsed, state.isCollapsed.toString());
            }
        },
    },
});

export const selectIsFixed = createSelector(
    (state: NavbarState) => state.navbar.isFixed,
    (isFixed) => isFixed,
);

export const selectIsCollapsed = createSelector(
    (state: NavbarState) => state.navbar.isCollapsed,
    (isCollapsed) => isCollapsed,
);

export const { actions: navBarActions } = navbarSlice;
export const { reducer: navBarReducer } = navbarSlice;
