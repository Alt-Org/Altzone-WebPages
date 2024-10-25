import { createContext, useState, useContext, ReactNode } from 'react';
import { LS_KEYS } from '@/shared/const/LS_KEYS';

const getInitialFixedState = (): boolean => {
    if (typeof window !== 'undefined') {
        const storedValue = localStorage.getItem(LS_KEYS.IsNavBarFixed);
        return storedValue === 'true';
    }
    return false;
};

interface FixedAndCollapsedContextType {
    isFixed: boolean;
    toggleFixed: () => void;
    isCollapsed: boolean;
    toggleCollapsed: () => void;
}

const FixedAndCollapsedContext = createContext<FixedAndCollapsedContextType>({
    isFixed: getInitialFixedState(),
    toggleFixed: () => {},
    isCollapsed: false,
    toggleCollapsed: () => {},
});
/**
 * `FixedAndCollapsedProvider` is an extended version of the `FixedProvider` component.
 * In addition to managing the fixed state, this component also handles the collapsed state.
 *
 * @returns a wrapper for fixed and collapsed context state
 */
export const FixedAndCollapsedProvider = ({ children }: { children: ReactNode }) => {
    const [isFixed, setIsFixed] = useState<boolean>(getInitialFixedState);
    const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

    const toggleFixed = () => {
        const newValue = !isFixed;
        setIsFixed(newValue);
        localStorage.setItem(LS_KEYS.IsNavBarFixed, newValue.toString());
    };

    const toggleCollapsed = () => {
        const newValue = !isCollapsed;
        setIsCollapsed(newValue);
    };

    return (
        <FixedAndCollapsedContext.Provider
            value={{ isFixed, toggleFixed, isCollapsed, toggleCollapsed }}
        >
            {children}
        </FixedAndCollapsedContext.Provider>
    );
};

export const useFixedAndCollapsed = () => useContext(FixedAndCollapsedContext);
