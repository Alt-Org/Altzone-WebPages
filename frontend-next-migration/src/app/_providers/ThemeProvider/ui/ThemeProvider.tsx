import { FC, ReactNode, useMemo, useState } from "react";
import { Theme, ThemeContext } from "../lib/ThemeContext";

// const defaultTheme = (localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme) || Theme.LIGHT;
const defaultTheme = Theme.LIGHT

interface ThemeProviderProps {
    initialTheme?: Theme;
    children: ReactNode;
}

const ThemeProvider: FC<ThemeProviderProps> = (props) => {
    const { children, initialTheme } = props;

    const [theme, setTheme] = useState<Theme>(initialTheme || defaultTheme);

    document.body.className = theme;

    const defaultProps = useMemo(
        () => ({
            theme,
            setTheme,
        }),
        [theme]
    );

    return <ThemeContext.Provider value={defaultProps}>{children}</ThemeContext.Provider>;
};

export default ThemeProvider;
