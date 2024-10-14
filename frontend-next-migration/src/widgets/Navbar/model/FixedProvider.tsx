import { createContext, useState, useContext, ReactNode } from 'react';
import { LS_KEYS } from '@/shared/const/LS_KEYS';

const getInitialFixedState = (): boolean => {
    if (typeof window !== 'undefined') {
        const storedValue = localStorage.getItem(LS_KEYS.IsNavBarFixed);
        return storedValue === 'true';
    }
    return false;
};

interface FixedContextType {
    isFixed: boolean;
    toggleFixed: () => void;
}

const FixedContext = createContext<FixedContextType>({
    isFixed: getInitialFixedState(),
    toggleFixed: () => {},
});

export const FixedProvider = ({ children }: { children: ReactNode }) => {
    const [isFixed, setIsFixed] = useState<boolean>(getInitialFixedState);

    const toggleFixed = () => {
        const newValue = !isFixed;
        setIsFixed(newValue);
        localStorage.setItem(LS_KEYS.IsNavBarFixed, newValue.toString());
    };

    return (
        <FixedContext.Provider value={{ isFixed, toggleFixed }}>
            {children}
        </FixedContext.Provider>
    );
};

export const useFixed = () => useContext(FixedContext);
