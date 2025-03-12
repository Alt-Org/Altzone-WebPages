import { useContext } from 'react';
import { LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext } from './ThemeContext';

interface UseThemeResult {
    toggleTheme: () => void;
    theme: Theme;
}

export function useTheme(): UseThemeResult {
    const { theme, setTheme } = useContext(ThemeContext);

    const toggleTheme = () => {
        if (!theme) return;

        const themeCycle: Record<Theme, Theme> = {
            [Theme.DARK]: Theme.LIGHT,
            [Theme.LIGHT]: Theme.MAIN,
            [Theme.MAIN]: Theme.DARK,
        };

        const newTheme = themeCycle[theme];
        if (setTheme) {
            setTheme(newTheme);
        }
        localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
    };

    return <UseThemeResult>{ theme, toggleTheme };
}
