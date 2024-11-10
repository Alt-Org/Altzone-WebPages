import { createContext, useState, useContext, ReactNode, useCallback } from 'react';
import { LS_KEYS } from '@/shared/const/LS_KEYS';

const getInitialCollapsedState = (): boolean => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem(LS_KEYS.IsNavBarCollapsed) === 'true';
    }
    return false;
};

interface CollapsedContextType {
    isCollapsed: boolean;
    toggleCollapsed: () => void;
}

const CollapsedContext = createContext<CollapsedContextType>({
    isCollapsed: false,
    toggleCollapsed: () => {},
});

export const CollapsedProvider = ({ children }: { children: ReactNode }) => {
    const [isCollapsed, setIsCollapsed] = useState(getInitialCollapsedState());

    const toggleCollapsed = useCallback(() => {
        setIsCollapsed((prevState) => {
            const newValue = !prevState;
            localStorage.setItem(LS_KEYS.IsNavBarCollapsed, newValue.toString());
            return newValue;
        });
    }, []);

    return (
        <CollapsedContext.Provider value={{ isCollapsed, toggleCollapsed }}>
            {children}
        </CollapsedContext.Provider>
    );
};

export const useCollapsed = () => useContext(CollapsedContext);
