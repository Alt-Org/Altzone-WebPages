import { createContext, useState, useContext, ReactNode } from 'react';
import { LS_KEYS } from '@/shared/const/LS_KEYS';

const getInitialCollapsedState = (): boolean => {
    if (typeof window !== 'undefined') {
        const storedValue = localStorage.getItem(LS_KEYS.IsNavBarCollapsed);
        return storedValue === 'true';
    }
    return false;
};

interface CollapsedContextType {
    isCollapsed: boolean;
    toggleCollapsed: () => void;
}

const CollapsedContext = createContext<CollapsedContextType>({
    isCollapsed: getInitialCollapsedState(),
    toggleCollapsed: () => {},
});

export const CollapsedProvider = ({ children }: { children: ReactNode }) => {
    const [isCollapsed, setIsCollapsed] = useState<boolean>(getInitialCollapsedState);

    const toggleCollapsed = () => {
        const newValue = !isCollapsed;
        setIsCollapsed(newValue);
        // todo uncomment when ready
        // localStorage.setItem(LS_KEYS.IsNavBarCollapsed, newValue.toString());
    };

    return (
        <CollapsedContext.Provider value={{ isCollapsed, toggleCollapsed }}>
            {children}
        </CollapsedContext.Provider>
    );
};

export const useCollapsed = () => useContext(CollapsedContext);
