import { useState } from 'react';

type DropdownState = {
    isOpen: boolean;
    isToggled: boolean;
};

type DropdownActions = {
    open: () => void;
    close: () => void;
    toggle: () => void;
    reset: () => void;
};

/**
 * React hook for managing dropdown open/toggle state.
 *
 * @param {boolean} [initialState=false] - Initial open/toggled state.
 * @returns {{
 *   state: { isOpen: boolean; isToggled: boolean },
 *   actions: {
 *     open: () => void,
 *     close: () => void,
 *     toggle: () => void,
 *     reset: () => void
 *   }
 * }}
 *
 * @example
 * const { state, actions } = useDropdownManager();
 * actions.toggle(); // toggles dropdown open/close
 */

export const useDropdownManager = (initialState = false) => {
    const [state, setState] = useState<DropdownState>({
        isOpen: initialState,
        isToggled: initialState,
    });

    const actions: DropdownActions = {
        open: () => setState((prev) => ({ ...prev, isOpen: true })),
        close: () => setState((prev) => ({ ...prev, isOpen: false })),
        toggle: () =>
            setState((prev) => {
                const newToggled = !prev.isToggled;
                return { isToggled: newToggled, isOpen: newToggled };
            }),
        reset: () => setState({ isOpen: false, isToggled: false }),
    };

    return { state, actions };
};
