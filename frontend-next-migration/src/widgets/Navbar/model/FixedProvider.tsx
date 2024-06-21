import { createContext, useState, useContext, ReactNode } from 'react';
import {LS_KEYS} from "@/shared/const/LS_KEYS";


interface FixedContextType {
    isFixed: boolean;
    toggleFixed: () => void;
}

const defaultVal: FixedContextType = {
    isFixed: localStorage.getItem(LS_KEYS.IsNavBarFixed) === 'true',
    toggleFixed: () => {},
};

const FixedContext = createContext<FixedContextType>(defaultVal);

export const FixedProvider = ({ children }: { children: ReactNode }) => {


    const [isFixed, setIsFixed] = useState(defaultVal.isFixed);

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
